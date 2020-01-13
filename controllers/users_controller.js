require("dotenv").config();
const axios = require("axios");

module.exports.dashboard = async (req, res) => {
	let stats = await Stats.findOne({ user: req.user.id });
	if (!stats) {
		//create prelim stats for new users
		let newStats = {
			user: req.user.id,
			lastActivity: new Date(Date.now()).toISOString()
		};
		stats = await Stats.create(newStats);
	} else {
		//updating stats
		// if(stats.submissions)
		// let docs = [];
		// for (let i = 0; i < 1000; i++) {
		// 	let newStats = {
		// 		user: req.user.id,
		// 		lastActivity: new Date(Date.now()).toISOString()
		// 	};
		// 	docs.push(newStats);
		// }
		// stats = await Stats.insertMany(docs);
	}

	res.json({ stats });
};

module.exports.getLadder = async (req, res) => {
	const { div } = req.query;
	let allSubs = await Submissions.find({ user: req.user.id }).populate({
		path: "problem",
		match: { div }
	});
	divSubs = allSubs.filter(sub => sub.problem !== null);
	let solvedDivSubs = divSubs.filter(sub => sub.verdict === "OK");

	//get all problems to check further
	let problems = await Problem.find({ div }).sort({ id: "asc" });

	//get all CFs submissions of this user
	const response = await axios.get(
		"https://codeforces.com/api/user.status?handle=rhnmht30&from=1"
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
		prevUdpation = false;
	//collecting all subs from CFs to own dB
	for (let i = probIndex; i < problems.length; i++) {
		let allSubs = [];
		for (let j = 0; j < codeforcesSubs.length; j++) {
			//find subs for this problem found in CF db
			if (codeforcesSubs[j].problem.name === problems[i].name) {
				//checking if we have that problem sub in our db
				if (
					divSubs.length !== 0 &&
					latestSubmission.problem.name ===
						codeforcesSubs[j].problem.name
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
						allSubs.push(codeforcesSubs[j]);
						prevUdpation = true;
					} else {
						//not modified, no updation required
						break;
					}
				} else {
					//we don't have that CF sub in our db
					//get new submisssions ready
					allSubs.push(codeforcesSubs[j]);
					// possible optimisation:
					// 1. we are iterating over every sub just to get the problem attempts count
					// 2. if that increases server time cost, we can remove it
					// 3. that would stop further iterations and we can break on getting first sub
				}
			}
		}
		if (allSubs.length !== 0) {
			if (prevUdpation) {
				let updatedSub = {
					user: req.user.id,
					problem: problems[i]._id,
					status:
						allSubs[0].verdict === "OK" ? "solved" : "attempted",
					lastAttemptTime: new Date(
						allSubs[0].creationTimeSeconds * 1000
					).toISOString(),
					attempts: latestSubmission.attempts + allSubs.length,
					language: allSubs[0].programmingLanguage,
					verdict: allSubs[0].verdict
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
						allSubs[0].verdict === "OK" ? "solved" : "attempted",
					lastAttemptTime: new Date(
						allSubs[0].creationTimeSeconds * 1000
					).toISOString(),
					attempts: allSubs.length,
					language: allSubs[0].programmingLanguage,
					verdict: allSubs[0].verdict
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
	// let unlockedProblem;
	// if (subs.length > 0) {
	// 	if (subs[subs.length - 1].status === "solved") {
	// 		unlockedProblem = problems[subs.length];
	// 	} else {
	// 		unlockedProblem = problems[subs.length - 1];
	// 	}
	// }

	res.json({ message: "ok" });
};
