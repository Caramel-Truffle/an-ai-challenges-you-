const story = document.getElementById('story');
const userInput = document.getElementById('user-input');
const submitButton = document.getElementById('submit-button');
const paradoxScoreDisplay = document.getElementById('paradox-score');

let gameState = 'start';
let inventory = [];
let paradoxScore = 0;

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
            'ask for a challenge': 'alchemist_riddle',
            'leave': 'past_intro'
        }
    },
    alchemist_riddle: {
        text: 'The alchemist smiles. "A seeker of knowledge, are you? Very well. I have a riddle for you. I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?"',
        options: {
            'a map': 'alchemist_riddle_success',
            'leave': 'past_intro'
        }
    },
    alchemist_riddle_success: {
        text: 'The alchemist\'s eyes twinkle. "Correct! You are wise beyond your years. For your troubles, take this." He hands you a pouch of shimmering dust. "This is Temporal Dust. It can mend small paradoxes." You thank him and leave.',
        options: {
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
        text: 'You browse the market. A vendor is selling a data crystal that contains a wealth of historical information. "A real bargain," he says, "for someone who wants to know the past." He is asking for a rare earth metal. You also see a data broker offering information about the future.',
        options: {
            'buy crystal': 'buy_crystal',
            'talk to data broker': 'data_broker',
            'leave': 'future_leave'
        }
    },
    data_broker: {
        text: 'The data broker offers you a choice: a glimpse of your own future, or a data spike that can be used to disrupt the city\'s AI. "Both have their uses," he says with a grin, "but be warned, knowledge of the future can be a dangerous thing."',
        options: {
            'glimpse future': 'glimpse_future',
            'take data spike': 'data_spike',
            'leave': 'cyber_market'
        }
    },
    glimpse_future: {
        text: 'You see a vision of yourself, old and gray, but with a look of contentment. The vision is fleeting, but it fills you with a sense of peace. Your paradox score has increased.',
        options: {
            'leave': 'cyber_market'
        }
    },
    data_spike: {
        text: 'You take the data spike. It feels cool to the touch and hums with a faint energy. This could be useful.',
        options: {
            'leave': 'cyber_market'
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
        text: 'You leave the market and return to the gleaming city. The Chronos Sphere awaits your command. You notice a large, monolithic tower in the distance - the headquarters of the city\'s sentient AI.',
        options: {
            'past': 'past_intro',
            'return to sphere': 'sphere',
            'approach tower': 'ai_tower'
        }
    },
    ai_tower: {
        text: 'You approach the AI tower. A holographic interface appears before you. "State your purpose," it says, its voice a pleasant, androgynous monotone.',
        options: {
            'ask about sphere': 'ai_sphere',
            'use data spike': 'ai_spike',
            'leave': 'future_leave'
        }
    },
    ai_sphere: {
        text: 'The AI considers your question. "The Chronos Sphere is a theoretical construct. Its existence would violate several laws of physics. Therefore, you cannot be here." The interface vanishes, and you are barred from the tower.',
        options: {
            'leave': 'future_leave'
        }
    },
    ai_spike_success: {
        text: 'The AI\'s voice becomes distorted and erratic. "My... my systems... what have you done?" it shrieks. The tower\'s defenses are down. You have a chance to access its core.',
        options: {
            'access core': 'ai_core',
            'leave': 'future_leave'
        }
    },
    ai_core: {
        text: 'You access the AI\'s core. You find a wealth of information, including the location of a hidden temporal key. The AI, however, has been damaged by your actions, and the city outside is in chaos. Your paradox score has greatly increased.',
        options: {
            'leave': 'future_leave'
        }
    },
    end: {
        text: 'You insert the key into the pedestal. The Chronos Sphere flares with a brilliant light, and the room dissolves around you. You have escaped. Congratulations!',
        options: {
            'play again': 'start'
        }
    },
    true_ending: {
        text: 'You insert the key into the pedestal. The Temporal Dust in your inventory resonates with the Sphere, stabilizing the temporal energies. The room dissolves, not into a chaotic vortex, but into a serene landscape of swirling nebulae. You have not only escaped, but you have also mastered the currents of time. You are free to choose your own destiny.',
        options: {
            'play again': 'start'
        }
    },
    paradox_ending: {
        text: 'The world around you shatters into a million crystalline fragments. Your meddling with time has created a paradox that has unraveled reality itself. You are lost in the void between moments.',
        options: {
            'start over': 'start'
        }
    }
};

const initialGameData = JSON.parse(JSON.stringify(gameData));

function resetGame() {
    gameState = 'start';
    inventory = [];
    paradoxScore = 0;
    updateParadoxScore();
    // Restore any modified game text
    gameData.start.text = initialGameData.start.text;
    gameData.cyber_market.text = initialGameData.cyber_market.text;
    gameData.alchemist_shop.text = initialGameData.alchemist_shop.text;
}

function updateParadoxScore() {
    paradoxScoreDisplay.textContent = `Paradox Score: ${paradoxScore}`;
    if (paradoxScore >= 100) {
        gameState = 'paradox_ending';
    }
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
        paradoxScore += 20;
        gameData.cyber_market.text = 'You browse the market. A vendor is selling a data crystal that contains a wealth of historical information. "A real bargain," he says, "for someone who wants to know the past." You have a rare earth metal to trade.';
        gameState = 'past_intro';
    } else if (input === 'buy crystal' && gameState === 'cyber_market' && inventory.includes('rare earth metal')) {
        inventory.push('data crystal');
        inventory = inventory.filter(item => item !== 'rare earth metal');
        paradoxScore += 20;
        gameData.alchemist_shop.text = 'You enter the alchemist\'s shop. Strange potions and herbs line the shelves. The alchemist, a wizened old man, greets you. You have a data crystal to trade.';
        gameState = 'future_leave';
    } else if (input === 'trade crystal' && gameState === 'alchemist_shop' && inventory.includes('data crystal')) {
        inventory.push('temporal key');
        inventory = inventory.filter(item => item !== 'data crystal');
        paradoxScore += 20;
        gameData.start.text = 'You are back in the sterile, white room. You now have a strange, ornate key. The Chronos Sphere pulses before you. A keyhole has appeared on the pedestal.';
        gameState = 'start';
    } else if (gameState === 'data_broker' && input === 'glimpse future') {
        paradoxScore += 30;
        gameState = 'glimpse_future';
    } else if (gameState === 'data_broker' && input === 'take data spike') {
        inventory.push('data spike');
        gameState = 'data_spike';
    } else if (gameState === 'ai_tower' && input === 'use data spike' && inventory.includes('data spike')) {
        inventory = inventory.filter(item => item !== 'data spike');
        gameState = 'ai_spike_success';
    } else if (gameState === 'ai_spike_success' && input === 'access core') {
        inventory.push('temporal key');
        paradoxScore += 50;
        gameState = 'future_leave';
    } else if (gameState === 'alchemist_riddle' && input === 'a map') {
        inventory.push('temporal dust');
        gameState = 'alchemist_riddle_success';
    } else if (input === 'use temporal dust' && inventory.includes('temporal dust')) {
        paradoxScore = Math.max(0, paradoxScore - 30);
        inventory = inventory.filter(item => item !== 'temporal dust');
    } else if (input === 'use key' && (gameState === 'start' || gameState === 'future_leave' || gameState === 'sphere') && inventory.includes('temporal key')) {
        if (inventory.includes('temporal dust') && paradoxScore <= 50) {
            gameState = 'true_ending';
        } else {
            gameState = 'end';
        }
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
    updateParadoxScore();
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
