const story = document.getElementById('story');
const userInput = document.getElementById('user-input');
const submitButton = document.getElementById('submit-button');

let gameState = 'start';
let inventory = [];

const gameData = {
    start: {
        text: 'You find yourself in a sterile, white room. A single pedestal stands in the center, upon which rests a pulsating, crystalline sphere. A voice echoes in your mind: "The Chronos Sphere is your key and your prison. To escape, you must navigate the currents of time."',
        options: {
            'touch sphere': 'sphere',
            'look around': 'room'
        }
    },
    room: {
        text: 'The room is bare, with no discernible doors or windows. The walls hum with a faint energy. The only object of interest is the Chronos Sphere.',
        options: {
            'touch sphere': 'sphere'
        }
    },
    sphere: {
        text: 'As you touch the sphere, your vision blurs. You feel a disorienting pull, and the world around you dissolves into a vortex of light and color. You have activated the Chronos Sphere. Where will you go? (past/future)',
        options: {
            'past': 'past_intro',
            'future': 'future_intro'
        }
    },
    past_intro: {
        text: 'You find yourself in a bustling medieval marketplace. The air is thick with the smell of spices and livestock. Your sudden appearance has not gone unnoticed. A guard approaches you, but you manage to slip into the crowd. You see a blacksmith\'s forge, an alchemist\'s shop, and a tavern. You can also feel the pull of the Chronos Sphere.',
        options: {
            'blacksmith': 'blacksmith',
            'alchemist': 'alchemist_shop',
            'tavern': 'tavern',
            'return to sphere': 'sphere'
        }
    },
    alchemist_shop: {
        text: 'You enter the alchemist\'s shop. Strange potions and herbs line the shelves. The alchemist, a wizened old man, greets you. "Welcome, traveler. What can I do for you?"',
        options: {
            'ask about sphere': 'alchemist_sphere',
            'trade crystal': 'alchemist_trade',
            'leave': 'past_intro'
        }
    },
    alchemist_sphere: {
        text: 'You ask the alchemist about the Chronos Sphere. His eyes widen. "A dangerous artifact," he whispers. "It is said to be a key to time itself. But it requires a key of its own to be controlled." He will say no more.',
        options: {
            'leave': 'past_intro'
        }
    },
    blacksmith: {
        text: 'You enter the blacksmith\'s forge. The air is hot and filled with the sound of hammering. The blacksmith is a large, muscular man. "What do you want?" he grunts.',
        options: {
            'ask about metal': 'blacksmith_metal',
            'leave': 'past_intro'
        }
    },
    blacksmith_metal: {
        text: 'You ask the blacksmith about rare metals. He shows you a strange, glowing ore. "Found this in a crater," he says. "Don\'t know what it is, but it\'s harder than any steel. You can have it for a price."',
        options: {
            'buy metal': 'buy_metal',
            'leave': 'past_intro'
        }
    },
    future_intro: {
        text: 'You are in a sleek, chrome city. Flying vehicles zip past, and robots attend to the needs of the populace. A hovering drone scans you, but you manage to evade it by ducking into a crowded cyber-market. You see stalls selling everything from bio-enhancements to data crystals.',
        options: {
            'market': 'cyber_market',
            'leave': 'future_leave'
        }
    },
    cyber_market: {
        text: 'You browse the market. A vendor is selling a data crystal that contains a wealth of historical information. "A real bargain," he says, "for someone who wants to know the past." He is asking for a rare earth metal.',
        options: {
            'buy crystal': 'buy_crystal',
            'leave': 'future_leave'
        }
    },
    past_lie: {
        text: 'You tell the guard you are a traveling merchant. He seems suspicious. "A merchant, eh? Let\'s see your wares, then." You have nothing to show. The guard arrests you. You have reached a dead end.',
        options: {
            'start over': 'start'
        }
    },
    past_truth: {
        text: 'You tell the guard the truth about the Chronos Sphere. He thinks you are a madman or a sorcerer. He arrests you. You have reached a dead end.',
        options: {
            'start over': 'start'
        }
    },
    future_cooperate: {
        text: 'You explain your situation to the drone. It analyzes your temporal signature. "Your story is... improbable. You will be taken for further analysis." You are escorted to a high-tech facility. You have reached a dead end.',
        options: {
            'start over': 'start'
        }
    },
    future_run: {
        text: 'You try to run, but the drone is faster. It emits a high-frequency sound that incapacitates you. You have reached a dead end.',
        options: {
            'start over': 'start'
        }
    },
    tavern: {
        text: 'You enter the tavern. It is a noisy, crowded place. You hear rumors of a strange metal found in a nearby crater.',
        options: {
            'leave': 'past_intro'
        }
    },
    future_leave: {
        text: 'You leave the market and return to the gleaming city. The Chronos Sphere awaits your command.',
        options: {
            'past': 'past_intro',
            'return to sphere': 'sphere'
        }
    },
    end: {
        text: 'You insert the key into the pedestal. The Chronos Sphere flares with a brilliant light, and the room dissolves around you. You have escaped. Congratulations!',
        options: {
            'play again': 'start'
        }
    }
};

const initialGameData = JSON.parse(JSON.stringify(gameData));

function resetGame() {
    gameState = 'start';
    inventory = [];
    // Restore any modified game text
    gameData.start.text = initialGameData.start.text;
    gameData.cyber_market.text = initialGameData.cyber_market.text;
    gameData.alchemist_shop.text = initialGameData.alchemist_shop.text;
}

function processInput() {
    const input = userInput.value.toLowerCase();
    const options = gameData[gameState].options;

    const existingError = story.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    if (input === 'buy metal' && gameState === 'blacksmith_metal') {
        inventory.push('rare earth metal');
        gameData.cyber_market.text = 'You browse the market. A vendor is selling a data crystal that contains a wealth of historical information. "A real bargain," he says, "for someone who wants to know the past." You have a rare earth metal to trade.';
        gameState = 'past_intro';
    } else if (input === 'buy crystal' && gameState === 'cyber_market' && inventory.includes('rare earth metal')) {
        inventory.push('data crystal');
        inventory = inventory.filter(item => item !== 'rare earth metal');
        gameData.alchemist_shop.text = 'You enter the alchemist\'s shop. Strange potions and herbs line the shelves. The alchemist, a wizened old man, greets you. You have a data crystal to trade.';
        gameState = 'future_leave';
    } else if (input === 'trade crystal' && gameState === 'alchemist_shop' && inventory.includes('data crystal')) {
        inventory.push('temporal key');
        inventory = inventory.filter(item => item !== 'data crystal');
        gameData.start.text = 'You are back in the sterile, white room. You now have a strange, ornate key. The Chronos Sphere pulses before you. A keyhole has appeared on the pedestal.';
        gameState = 'start';
    } else if (input === 'use key' && gameState === 'start' && inventory.includes('temporal key')) {
        gameState = 'end';
    } else if (options[input]) {
        if (options[input] === 'start') {
            resetGame();
        } else {
            gameState = options[input];
        }
    } else {
        const p = document.createElement('p');
        p.className = 'error-message';
        p.style.color = '#ff4d4d';
        p.textContent = 'Invalid command. Try again.';
        story.appendChild(p);
    }

    userInput.value = '';
    updateStory();
}

function updateStory() {
    story.innerHTML = '';
    const p = document.createElement('p');
    p.textContent = gameData[gameState].text;
    story.appendChild(p);
}

submitButton.addEventListener('click', processInput);
userInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        processInput();
    }
});
