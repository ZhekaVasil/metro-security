const fs = require('fs');
const apiResponse = require("../helpers/apiResponse");

const ANSWERS_PATH = 'db/answers.json';

exports.saveAnswer = [
	function (req, res) {
		try {
			if (!fs.existsSync(ANSWERS_PATH)) {
				fs.appendFileSync(ANSWERS_PATH, '[]');
			}
			const answersRaw = fs.readFileSync(ANSWERS_PATH).toString();
			const answers = JSON.parse(answersRaw);
			const date = new Date();
			const answer = {
				...req.body,
				date: date.toISOString(),
			};
			answers.push(answer);
			fs.writeFileSync(ANSWERS_PATH, JSON.stringify(answers, null, 2));
			return apiResponse.successResponseWithData(res, 'Operation success', answer)
		} catch (err) {
			console.log(err);
			//throw error in json response with status 500.
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

exports.getUserAnswers = [
	function (req, res) {
		try {
			let answers = [];
			if (fs.existsSync(ANSWERS_PATH)) {
				const userId = req.params.userId;
				const answersRaw = fs.readFileSync(ANSWERS_PATH).toString();
				const answersParsed = JSON.parse(answersRaw);
				answers = answersParsed.filter(answer => answer.userId === userId);
			}
			return apiResponse.successResponseWithData(res, 'Operation success', answers)
		} catch (err) {
			console.log(err);
			//throw error in json response with status 500.
			return apiResponse.ErrorResponse(res, err);
		}
	}
]
