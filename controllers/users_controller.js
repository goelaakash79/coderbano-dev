require("dotenv").config();
const axios = require("axios");
const { computeStats } = require("../config/helpers");

module.exports.dashboard = async (req, res) => {
	let stats = await Stats.findOne({ user: req.user.id });

	if (!stats) {
		//create prelim stats for new users
		let newStats = {
			user: req.user.id,
			lastActivity: new Date(Date.now()).toISOString()
		};
		stats = await Stats.create(newStats);
	}

	stats = await computeStats(req.user.id, stats);

	return res.status(200).json({
		message: "success",
		error: false,
		data: stats
	});
};

module.exports.getLadder = async (req, res) => {
	const { div } = req.query;
	let allSubs = await Submissions.find({ user: req.user.id }).populate({
		path: "problem",
		match: { div }
	});
	divSubs = allSubs.filter(sub => sub.problem !== null);

	//get all problems to check further
	let problems = await Problem.find({ div }).sort({ id: "asc" });

	//get all CFs submissions of this user
	req.user.handle = "sgshubham98"; //indirectly checking for unregistered users
	const response = await axios.get(
		`https://codeforces.com/api/user.status?handle=${req.user.handle}&from=1`
	);
	let codeforcesSubs = response.data.result;

	let probIndex,
		latestSubmission = divSubs[divSubs.length - 1];
	if (divSubs.length === 0 || latestSubmission.verdict === "OK") {
		probIndex = divSubs.length;
	} else if (latestSubmission.verdict !== "OK") {
		probIndex = divSubs.length - 1;
	}

	let newSubs = [],
		prevUdpation = false,
		subs = [];
	//collecting all subs from CFs to own dB
	for (let i = probIndex; i < problems.length; i++) {
		let collectSubs = [];
		for (let j = 0; j < codeforcesSubs.length; j++) {
			//find subs for this problem found in CF db
			if (
				String(codeforcesSubs[j].problem.name).trim() ===
				String(problems[i].name).trim()
			) {
				//checking if we have that problem sub in our db
				if (
					divSubs.length !== 0 &&
					String(latestSubmission.problem.name).trim() ===
						String(codeforcesSubs[j].problem.name).trim()
				) {
					//we already have the submission in our own db
					//lets check if it has been modified
					if (
						latestSubmission.lastAttemptTime.toISOString() !==
						new Date(
							codeforcesSubs[j].creationTimeSeconds * 1000
						).toISOString()
					) {
						//collect CF subs for batch updation
						collectSubs.push(codeforcesSubs[j]);
						prevUdpation = true;
					} else {
						//not modified, no updation required
						break;
					}
				} else {
					//we don't have that CF sub in our db
					//get new submisssions ready
					collectSubs.push(codeforcesSubs[j]);
					prevUdpation = false;
					// possible optimisation:
					// 1. we are iterating over every sub just to get the problem attempts count
					// 2. if that increases server time cost, we can remove it
					// 3. that would stop further iterations and we can break on getting first sub
				}
			}
		}
		if (collectSubs.length !== 0) {
			if (prevUdpation) {
				let updatedSub = {
					user: req.user.id,
					problem: problems[i]._id,
					status:
						collectSubs[0].verdict === "OK"
							? "solved"
							: "attempted",
					lastAttemptTime: new Date(
						collectSubs[0].creationTimeSeconds * 1000
					).toISOString(),
					attempts: latestSubmission.attempts + collectSubs.length,
					language: collectSubs[0].programmingLanguage,
					verdict: collectSubs[0].verdict
				};
				let newLatestSub = await Submissions.findByIdAndUpdate(
					latestSubmission._id,
					updatedSub,
					{ new: true }
				);
			} else {
				let newSub = {
					user: req.user.id,
					problem: problems[i]._id,
					status:
						collectSubs[0].verdict === "OK"
							? "solved"
							: "attempted",
					lastAttemptTime: new Date(
						collectSubs[0].creationTimeSeconds * 1000
					).toISOString(),
					attempts: collectSubs.length,
					language: collectSubs[0].programmingLanguage,
					verdict: collectSubs[0].verdict
				};
				newSubs.push(newSub);
			}
		} else {
			if (newSubs.length !== 0) {
				subs = await Submissions.insertMany(newSubs);
			}
			break;
		}
	}
	if (subs.length !== 0 || latestSubmission) {
		//finally collecting all submissions (re-requesting updated data)
		allSubs = await Submissions.find({ user: req.user.id }).populate({
			path: "problem",
			match: { div }
		});
		divSubs = allSubs.filter(sub => sub.problem !== null);
	}

	let unlockedProblem, unlockProbNum;
	if (divSubs.length !== 0) {
		if (divSubs[divSubs.length - 1].verdict === "OK") {
			unlockProbNum = divSubs[divSubs.length - 1].problem.id + 1;
		} else {
			unlockProbNum = divSubs[divSubs.length - 1].problem.id;
		}
		unlockedProblem = problems.find(
			problem => problem.id === unlockProbNum
		);
	} else {
		unlockedProblem = problems.find(problem => problem.id === 1);
	}

	return res.status(200).json({
		message: "success",
		error: false,
		data: { divSubs, unlockedProblem }
	});
};

module.exports.stalkFriend = async (req, res) => {
	let user = await User.findOne({ handle: req.query.handle });

	if (!user)
		return res.status(400).json({
			message: "No user found for this handle",
			error: true,
			data: null
		});

	let stats = await Stats.findOne({ user: user._id }).populate(
		"user",
		"handle email createdAt"
	);

	if (stats) {
		stats = await computeStats(user._id, stats);
	}

	return res.status(200).json({
		message: "success",
		error: false,
		data: stats
	});
};
