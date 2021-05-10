const XLSX = require('xlsx');
const apiResponse = require("../helpers/apiResponse");
const { parseXLSXUsers } = require('../helpers/utility');
const fs = require('fs');
const path = require('path');

exports.usersList = [
	function (req, res) {
		try {
			// const buf = fs.readFileSync(path.normalize(__dirname + '/../../../Работники.xls'));
			const buf = fs.readFileSync(path.normalize('./Работники.xls'));
			const wb = XLSX.read(buf, {type:'buffer'});
			return apiResponse.successResponseWithData(res, 'Operation success', parseXLSXUsers(wb))
		} catch (err) {
			//throw error in json response with status 500.
			return apiResponse.ErrorResponse(res, err);
		}
	}
]
