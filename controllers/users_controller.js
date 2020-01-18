require("dotenv").config();
const axios = require("axios");

const mostFrequent = arr => {
	// Sort the array
	arr.sort();

	// find the max frequency using linear traversal
	let max_count = 1,
		res = arr[0],
		curr_count = 1;
	for (let i = 1; i < arr.length; i++) {
		if (arr[i] == arr[i - 1]) curr_count++;
		else {
			if (curr_count > max_count) {
				max_count = curr_count;
				res = arr[i - 1];
			}
			curr_count = 1;
		}
	}

	// If last element is most frequent
	if (curr_count > max_count) {
		max_count = curr_count;
		res = arr[arr.length - 1];
	}
	console.log(res);
	return res;
};

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
		let submissions = await Submissions.find({ user: req.user.id })
			.populate("problem")
			.sort({ lastAttemptTime: "desc" });

		//mostProductiveDay,mostProdTime, mostUsedLang,
		let divs = [
			"2, A",
			"2, B",
			"2, C",
			"2, D",
			"2, E",
			"1, D",
			"1, E",
			"Rating less than 1300"
		];

		let allDays = [],
			allTimes = [],
			allLanguages = [];
		divs.map(div => {
			let divSubs = submissions.filter(sub => sub.problem.div === div);
			if (divSubs.length !== 0) {
				stats.lastActivity = stats.ladderDetails[div].lastActivity =
					divSubs[0].lastAttemptTime;
				stats.ladderDetails[div].unlocked = true;
				stats.ladderDetails[div].problemsSolved = divSubs.filter(
					sub => sub.verdict === "OK"
				).length;
				divSubs.map(sub => {
					if (sub.verdict === "OK") {
						allDays.push(sub.lastAttemptTime.getDay());
						allLanguages.push(sub.language);
						if (
							sub.lastAttemptTime.getHours() >= 0 &&
							sub.lastAttemptTime.getHours() <= 3
						) {
							//late nights
							allTimes.push(0);
						} else if (sub.lastAttemptTime.getHours() <= 7) {
							//early mornings
							allTimes.push(1);
						} else if (sub.lastAttemptTime.getHours() <= 11) {
							//mornings
							allTimes.push(2);
						} else if (sub.lastAttemptTime.getHours() <= 15) {
							//noons0
							allTimes.push(3);
						} else if (sub.lastAttemptTime.getHours() <= 20) {
							//evenings
							allTimes.push(4);
						} else if (sub.lastAttemptTime.getHours() <= 23) {
							//nights
							allTimes.push(5);
						}
					}
				});
			}
		});

		let days = [
			"Sunday",
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday"
		];
		let times = [
			"Late nights",
			"Early Mornings",
			"Mornings",
			"Noons",
			"Evenings",
			"Nights"
		];
		if (
			allLanguages.length !== 0 &&
			allDays.length !== 0 &&
			allTimes.length !== 0
		) {
			stats.most.productiveDay = days[mostFrequent(allDays)];

			stats.most.productiveTimeOfDay = times[mostFrequent(allTimes)];
			stats.most.usedLanguage = mostFrequent(allLanguages);
		}
		await stats.save();
	}
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
