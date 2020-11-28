const readline = require('readline');
const path = require('path');
const xlsx = require('xlsx');

const filePath = path.join(__dirname, '/excel2.ods');
const excel = xlsx.readFile(filePath);
const toJson = xlsx.utils.sheet_to_json(excel.Sheets[excel.SheetNames[0]]);

function getInput() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    let how;

    console.log('How many do you want to generate?');
    rl.on('line', (line) => {
        how = line;
        rl.close();
    }).on('close', () => {
        exection(how);
    });
}

function prizeNumbersToArray(jsonArr) {
    let prizeNumbers = [];
    let combination = [];
    jsonArr.map((el, idx) => {
        for (key in el) {
            combination.push(el[key]);
        }
        combination.sort((a, b) => a - b);
        prizeNumbers[idx] = combination;
        combination = [];
    });
    return prizeNumbers;
}

function getRand() {
    return parseInt(((new Date().getMilliseconds() * Math.random()) % 45) + 1, 10);
}

function lotteryPicker() {
    let picked = [];
    for (let i = 0; i < 6; i++) {
        let newRand = getRand();
        picked.push(newRand);
        for (let j = 0; j < i; j++) {
            if (picked[i] === picked[j]) {
                picked[i] = getRand();
                j--;
            }
        }
    }
    picked.sort((a, b) => a - b);
    return picked;
}

function isEqual(prized, picked) {
    let counter = [];
    prized.map((el, idx) => {
        let cnt = 0;
        for (let i = 0; i < el.length; i++) {
            el[i] === picked[i] ? cnt++ : cnt;
        }
        return counter.push(cnt);
    })
    return counter.filter(el => el >= 6).length > 0;
}


function exection(howmany) {
    const prizedArray = prizeNumbersToArray(toJson);
    for (let i = 0; i < howmany; i++) {
        const pickedArray = lotteryPicker()
        if (!isEqual(prizedArray, pickedArray)) {
            console.log(pickedArray)
        }
    }
}

getInput();