const fs = require('fs');

function stringXOR(a, b) {
    return a.split('').map((c, i) => c === b[i] ? '0' : '1').join('');
}

function charToBinary(character) {
    return character.charCodeAt(0).toString(2).padStart(8, '0');
}

function binaryToChar(binary) {
    return String.fromCharCode(Number.parseInt(binary, 2));
}

const letters = /[a-zA-Z]/;

const cryptograms = fs.readFileSync('encoded.txt', {
        encoding: 'utf-8'
    })
    .split('\n')
    .map(line => line.split(' '))
    .sort((a, b) => b.length - a.length); // [['1010', '1111'], ['0101', ...], ...]

let spacesIntersections = [];
for (let i = 0; i < cryptograms.length; i++) {
    let cryptogramA = cryptograms[i];
    let possibleSpaces = [];

    for (let j = 0; j < cryptograms.length; j++) {
        if (i === j) continue;

        let cryptogramB = cryptograms[j];
        let xoredCryptogram = [];

        let possibleSpacesWithB = [];
        for (let k = 0; k < (cryptogramB.length > cryptogramA.length ? cryptogramA.length : cryptogramB.length); k++) {
            let xor = stringXOR(cryptogramA[k], cryptogramB[k]);
            xoredCryptogram[k] = xor;
            if ((xor.startsWith('01') && letters.test(binaryToChar(stringXOR(xor, charToBinary(' '))))) || xor === '00000000') {
                possibleSpacesWithB.push(k);
            }
        }
        possibleSpaces.push(possibleSpacesWithB);
    }

    let localIntersectionLevels = [];
    let startingSpaces = possibleSpaces[0];
    for (let j = 1; j < possibleSpaces.length; j++) {
        localIntersectionLevels.push([...startingSpaces]);
        startingSpaces = startingSpaces.filter(e => possibleSpaces[j].indexOf(e) !== -1);
    }
    spacesIntersections.push(localIntersectionLevels.reverse());
}

let secretKey = [];
let level = 0;
let levelFlag = true;
while(levelFlag) {
    levelFlag = false;
    for (let i = 0; i < spacesIntersections.length; i++) {
        let spaceIntersectionLevels = spacesIntersections[i];
        if (level > spaceIntersectionLevels.length - 1) {
            continue;
        } else {
            levelFlag = true;
        }

        let currentLevel = spaceIntersectionLevels[level];

        for (let j = 0; j < currentLevel.length; j++) {
            if (!secretKey[currentLevel[j]]) {
                secretKey[currentLevel[j]] = stringXOR(charToBinary(' '), cryptograms[i][currentLevel[j]]);
            }
        }
    }
    level++;
}

console.log(`DECODED SECRET KEY: ${[...secretKey].map(e => e ? e : '________').join('|')}`);
for (let i = 0; i < cryptograms.length; i++) {
    let decipheredCryptogram = [];
    for (let j = 0; j < cryptograms[i].length; j++) {
        if (secretKey[j]) {
            let xored = stringXOR(secretKey[j], cryptograms[i][j])
            if (letters.test(binaryToChar(xored)) || binaryToChar(xored) === ' ') {
                decipheredCryptogram[j] = stringXOR(secretKey[j], cryptograms[i][j]);
            } else {
                decipheredCryptogram[j] = charToBinary('_');
            }
        } else {
            decipheredCryptogram[j] = charToBinary('_');
        }
    }

    console.log(decipheredCryptogram.map(char => binaryToChar(char)).join('') + '\n');
}
