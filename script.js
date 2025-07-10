const ROTORS = {
    'I':    { wiring: 'EKMFLGDQVZNTOWYHXUSPAIBRCJ', notch: 'Q' },
    'II':   { wiring: 'AJDKSIRUXBLHWTMCQGZNPYFVOE', notch: 'E' },
    'III':  { wiring: 'BDFHJLCPRTXVZNYEIWGAKMUSQO', notch: 'V' }
};

const REFLECTOR = 'YRUHQSLDPXNGOKMIEBFZCWVJAT';

document.getElementById('encrypt').addEventListener('click', () => {
    const text = document.getElementById('text').value;
    const rotor1 = document.getElementById('rotor1').value;
    const rotor2 = document.getElementById('rotor2').value;
    const rotor3 = document.getElementById('rotor3').value;
    
    let result = '';
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (char === ' ') {
            result += ' ';
        } else if (/[A-Za-z]/.test(char)) {
            result += processLetter(char.toUpperCase(), rotor1, rotor2, rotor3, i);
        }
    }
    
    document.getElementById('result').value = result;
});

function processLetter(letter, rotor1, rotor2, rotor3, position) {
    let c = letter;
    c = passThroughRotor(c, ROTORS[rotor3].wiring);
    c = passThroughRotor(c, ROTORS[rotor2].wiring);
    c = passThroughRotor(c, ROTORS[rotor1].wiring);
    
    c = REFLECTOR.charAt(c.charCodeAt(0) - 65);
    
    c = passThroughRotorInverse(c, ROTORS[rotor1].wiring);
    c = passThroughRotorInverse(c, ROTORS[rotor2].wiring);
    c = passThroughRotorInverse(c, ROTORS[rotor3].wiring);
    
    return c;
}

function passThroughRotor(c, wiring) {
    return wiring.charAt(c.charCodeAt(0) - 65);
}

function passThroughRotorInverse(c, wiring) {
    return String.fromCharCode(wiring.indexOf(c) + 65);
}