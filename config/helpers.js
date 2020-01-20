//variables
const divs = [
	"2, A",
	"2, B",
	"2, C",
	"2, D",
	"2, E",
	"1, D",
	"1, E",
	"Rating less than 1300"
];

const days = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday"
];

const times = [
	"Late nights",
	"Early Mornings",
	"Mornings",
	"Noons",
	"Evenings",
	"Nights"
];

//methods
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

const computeStats = async (user, stats) => {
	let submissions = await Submissions.find({ user })
		.populate("problem")
		.sort({ lastAttemptTime: "desc" });

	let allSubDays = [],
		allSubTimes = [],
		allSubLanguages = [];
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
					allSubDays.push(sub.lastAttemptTime.getDay());
					allSubLanguages.push(sub.language);
					if (
						sub.lastAttemptTime.getHours() >= 0 &&
						sub.lastAttemptTime.getHours() <= 3
					) {
						//late nights
						allSubTimes.push(0);
					} else if (sub.lastAttemptTime.getHours() <= 7) {
						//early mornings
						allSubTimes.push(1);
					} else if (sub.lastAttemptTime.getHours() <= 11) {
						//mornings
						allSubTimes.push(2);
					} else if (sub.lastAttemptTime.getHours() <= 15) {
						//noons0
						allSubTimes.push(3);
					} else if (sub.lastAttemptTime.getHours() <= 20) {
						//evenings
						allSubTimes.push(4);
					} else if (sub.lastAttemptTime.getHours() <= 23) {
						//nights
						allSubTimes.push(5);
					}
				}
			});
		}
	});

	if (
		allSubLanguages.length !== 0 &&
		allSubDays.length !== 0 &&
		allSubTimes.length !== 0
	) {
		stats.most.productiveDay = days[mostFrequent(allSubDays)];

		stats.most.productiveTimeOfDay = times[mostFrequent(allSubTimes)];
		stats.most.usedLanguage = mostFrequent(allSubLanguages);
	}
	await stats.save();

	return stats;
};

module.exports = { divs, mostFrequent, days, times, computeStats };
