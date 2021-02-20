const generateHash = string => {
	let hash = 0,
		i,
		chr;
	if (string.length === 0) return hash;
	for (i = 0; i < string.length; i++) {
		chr = string.charCodeAt(i);
		hash = (hash << 5) - hash + chr;
		hash |= 0; // Convert to 32bit integer
	}
	return Math.abs(hash).toString(16);
}


const randomNumber = function (length) {
	var text = "";
	var possible = "123456789";
	for (var i = 0; i < length; i++) {
		var sup = Math.floor(Math.random() * possible.length);
		text += i > 0 && sup == i ? "0" : possible.charAt(sup);
	}
	return Number(text);
};

const shuffle = array => {
	let currentIndex = array.length, temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {

		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}


const parseXLSX = xlsx => {
	return Object.entries(xlsx.Sheets).map(([sheetName, sheetData]) => {
		const correctColumns = Object.entries(sheetData).reduce((prev, [cellName, cellData]) => {
			if (cellData && cellData.v && cellData.v.toString().includes('TRUE_')) {
				return [...prev, cellName.replace(/\d+/, '')]
			} else {
				return prev;
			}
		}, []);

		return {
			sheetName,
			id: generateHash(sheetName),
			questions: Object.values(Object.entries(sheetData).reduce((prev, [cellName, cellData]) => {
				if (cellName.includes('!')) {
					return prev;
				} else {
          const questionRow = Number(cellName.replace(/\D+/, ''));
          const questionColumn = cellName.replace(/\d+/, '');
          const isQuestion = questionColumn === 'A';
          if (questionRow === 1) {
						return prev
					} else {
						prev[questionRow] = prev[questionRow] || {};

						if (isQuestion) {
							prev[questionRow].question = cellData.v;
							prev[questionRow].id = generateHash(cellData.v.toString());
						} else {
							prev[questionRow].answers = shuffle([...prev[questionRow].answers || [], {
								id: generateHash(cellData.v.toString()),
								answer: cellData.v,
								isCorrect: correctColumns.includes(questionColumn),
							}])
						}

						return prev;
					}
				}
			}, {}))
		};
	});
}

const parseXLSXUsers = xlsx => {
	return Object.entries(xlsx.Sheets).map(([sheetName, sheetData]) => {
		return Object.values(Object.entries(sheetData).reduce((prev, [cellName, cellData]) => {
			if (cellName.includes('!')) {
				return prev;
			} else {
				const userRow = Number(cellName.replace(/\D+/, ''));
				const userColumn = cellName.replace(/\d+/, '');
				const isName = userColumn === 'A';
				if (userRow === 1) {
					return prev
				} else {
					prev[userRow] = prev[userRow] || {};

					if (isName) {
						prev[userRow].fullName = cellData.v;
						prev[userRow].id = generateHash(cellData.v.toString());
					} else {
						prev[userRow].position = cellData.v;
					}

					return prev;
				}
			}
		}, {}))
	}).flat();
}


exports.generateHash = generateHash;
exports.randomNumber = randomNumber;
exports.shuffle = shuffle;
exports.parseXLSX = parseXLSX;
exports.parseXLSXUsers = parseXLSXUsers;
