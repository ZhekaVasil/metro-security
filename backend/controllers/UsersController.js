const apiResponse = require("../helpers/apiResponse");
const fs = require('fs');

exports.usersList = [
	function (req, res) {
		try {
			const users = fs.readFileSync('db/users.json');
			return apiResponse.successResponseWithData(res, 'Operation success', JSON.parse(users))
		} catch (err) {
			//throw error in json response with status 500.
			return apiResponse.ErrorResponse(res, err);
		}
	}
]
