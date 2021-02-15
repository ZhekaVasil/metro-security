const XLSX = require('xlsx');
const fs = require('fs');
const apiResponse = require("../helpers/apiResponse");
const { parseXLSX } = require('../helpers/utility');

exports.questions = [
	function (req, res) {
		try {
			const buf = fs.readFileSync("вопросы.xlsx");
			const wb = XLSX.read(buf, {type:'buffer'});
			return apiResponse.successResponseWithData(res, 'Operation success', parseXLSX(wb))
		} catch (err) {
			//throw error in json response with status 500.
			return apiResponse.ErrorResponse(res, err);
		}
	}
]