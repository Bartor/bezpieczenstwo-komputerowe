const fs = require('fs');

const lettersFreq = {
    a: 891,
    b: 147,
    c: 396,
    d: 325,
    e: 766,
    f: 30,
    g: 142,
    h: 108,
    i: 821,
    j: 228,
    k: 351,
    l: 210,
    m: 280,
    n: 552,
    o: 775,
    p: 313,
    r: 469,
    s: 432,
    t: 398,
    u: 250,
    w: 465,
    y: 376,
    z: 564
};

function stringXOR(a, b) {
    return a.split('').map((c, i) => c === b[i] ? '0' : '1').join('');
}

function charToBinary(character) {
    return character.charCodeAt(0).toString(2).padStart(8, '0');
}

function binaryToChar(binary) {
    return String.fromCharCode(Number.parseInt(binary, 2));
}


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

    for (let j = i + 1; j < cryptograms.length; j++) {
        let cryptogramB = cryptograms[j];
        let xoredCryptogram = [];

        let possibleSpacesWithB = [];
        for (let k = 0; k < cryptogramB.length; k++) {
            let xor = stringXOR(cryptogramA[k], cryptogramB[k]);
            xoredCryptogram[k] = xor;
            if (xor.startsWith('01')) {
                possibleSpacesWithB.push(k);
            }
        }
        possibleSpaces.push(possibleSpacesWithB);
    }


    let intersection = possibleSpaces.reduce((acc, withB) => acc.filter(e => withB.indexOf(e) !== -1), possibleSpaces[0]);
    spacesIntersections.push(intersection ? intersection : []);
}

console.log(spacesIntersections);

let secretKey = [];
for (let i = 0; i < spacesIntersections.length; i++) {
    for (let j = 0; j < spacesIntersections[i].length; j++) {
        secretKey[spacesIntersections[i][j]] = stringXOR(charToBinary(' '), cryptograms[i][spacesIntersections[i][j]]);
    }
}
console.log(secretKey.join(' '));

for (let i = 0; i < cryptograms.length; i++) {
    let decipheredCryptogram = [];
    for (let j = 0; j < secretKey.length; j++) {
        if (secretKey[j]) {
            decipheredCryptogram[j] = stringXOR(secretKey[j], cryptograms[i][j]);
        } else {
            decipheredCryptogram[j] = '00111111';
        }
    }

    console.log(decipheredCryptogram.map(char => binaryToChar(char)).join(''));
    console.log();
}
