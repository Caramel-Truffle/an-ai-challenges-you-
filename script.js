const story = document.getElementById('story');
const userInput = document.getElementById('user-input');
const submitButton = document.getElementById('submit-button');
const paradoxScoreDisplay = document.getElementById('paradox-score');
const memoryDisplay = document.getElementById('memory');

let gameState = 'start';
let inventory = [];
let paradoxScore = 0;
let memory = [];

function resetGame() {
    location.reload();
}

function updateParadoxScore() {
    paradoxScoreDisplay.textContent = `Paradox Score: ${paradoxScore}`;
    if (paradoxScore >= 100) {
        gameState = 'paradox_ending';
    }
}

function updateMemory() {
    memoryDisplay.innerHTML = '';
    if (memory.length > 0) {
        const memoryList = document.createElement('ul');
        memory.forEach(item => {
            const memoryItem = document.createElement('li');
            memoryItem.textContent = item;
            memoryList.appendChild(memoryItem);
        });
        memoryDisplay.appendChild(memoryList);
    }
}

const commands = {
    'buy cpu': () => {
        if (gameState === 'blacksmith_metal') {
            inventory.push('ancient cpu');
            paradoxScore += 20;
            gameData.cyber_market.text = 'You browse the market. A vendor is selling a data crystal that contains a wealth of historical information. "A real bargain," he says, "for someone who wants to know the past." You have a strange, ancient CPU to trade.';
            gameState = 'past_intro';
        }
    },
    'buy crystal': () => {
        if (gameState === 'cyber_market' && inventory.includes('ancient cpu')) {
            inventory.push('data crystal');
            inventory = inventory.filter(item => item !== 'ancient cpu');
            paradoxScore += 20;
            gameData.alchemist_shop.text = 'You enter the alchemist\'s shop. Strange potions and herbs line the shelves. The alchemist, a wizened old man, greets you. You have a data crystal to trade.';
            gameState = 'future_leave';
        }
    },
    'trade crystal': () => {
        if (gameState === 'alchemist_shop' && inventory.includes('data crystal')) {
            inventory.push('temporal key');
            inventory = inventory.filter(item => item !== 'data crystal');
            paradoxScore += 20;
            if (inventory.includes('temporal stabilizer')) {
                gameData.start.text = 'You are back in the sterile, white room. You now have a strange, ornate key and the Temporal Stabilizer. The Chronos Sphere pulses before you. A keyhole has appeared on the pedestal. The Stabilizer hums, as if waiting to be used.';
            } else {
                gameData.start.text = 'You are back in the sterile, white room. You now have a strange, ornate key. The Chronos Sphere pulses before you. A keyhole has appeared on the pedestal.';
            }
            gameState = 'start';
        }
    },
    'glimpse future': () => {
        if (gameState === 'data_broker') {
            paradoxScore += 30;
            gameState = 'glimpse_future';
        }
    },
    'take data spike': () => {
        if (gameState === 'data_broker') {
            inventory.push('data spike');
            gameState = 'data_spike';
        }
    },
    'use data spike': () => {
        if (gameState === 'ai_tower' && inventory.includes('data spike')) {
            inventory = inventory.filter(item => item !== 'data spike');
            gameState = 'ai_spike_success';
        }
    },
    'synthesize agent': () => {
        if (gameState === 'alchemist_synthesis' && inventory.includes('pulsating crystal') && inventory.includes('temporal dust')) {
            inventory = inventory.filter(item => item !== 'pulsating crystal');
            inventory = inventory.filter(item => item !== 'temporal dust');
            inventory.push('stabilizing agent');
            gameData.alchemist_synthesis.text = 'You give the alchemist the Pulsating Crystal and the Temporal Dust. He combines them in a flash of light, creating a swirling, iridescent liquid. "Here you are," he says, handing you the Stabilizing Agent. "Use it wisely."';
            gameData.alchemist_shop.text = 'You enter the alchemist\'s shop. Strange potions and herbs line the shelves. The alchemist nods at you, busy with his work.';
        } else if (gameState === 'alchemist_synthesis') {
            gameData.alchemist_synthesis.text = 'You don\'t have the necessary components. The alchemist requires a powerful energy source and a catalyst.';
        }
    },
    'craft stabilizer': () => {
        if (gameState === 'tech_lab' && inventory.includes('ancient cpu') && inventory.includes('stabilizing agent')) {
            inventory = inventory.filter(item => item !== 'ancient cpu');
            inventory = inventory.filter(item => item !== 'stabilizing agent');
            inventory.push('temporal stabilizer');
            gameData.tech_lab.text = 'You use the terminal to fabricate the Temporal Stabilizer. The machine hums to life, and in a flash of light, the device is created. It feels cool to the touch and emanates a sense of calm and order.';
        } else if (gameState === 'tech_lab') {
            gameData.tech_lab.text = 'You don\'t have the necessary components to craft the Temporal Stabilizer.';
        }
    },
    'use terminal': () => {
        if (gameState === 'tech_lab' && inventory.includes('ancient cpu')) {
            gameState = 'use_terminal';
        } else if (gameState === 'tech_lab') {
            gameData.tech_lab.text = 'You approach the terminal, but it requires an object for analysis. It seems to be waiting for a specific component.';
        }
    },
    'access core': () => {
        if (gameState === 'ai_spike_success') {
            inventory.push('temporal key');
            paradoxScore += 50;
            gameState = 'future_leave';
        }
    },
    'a map': () => {
        if (gameState === 'alchemist_riddle') {
            inventory.push('temporal dust');
            gameState = 'alchemist_riddle_success';
        }
    },
    'use temporal dust': () => {
        if (inventory.includes('temporal dust')) {
            paradoxScore = Math.max(0, paradoxScore - 30);
            inventory = inventory.filter(item => item !== 'temporal dust');
        }
    },
    'use stabilizer': () => {
        if (inventory.includes('temporal stabilizer')) {
            paradoxScore = 0;
            inventory = inventory.filter(item => item !== 'temporal stabilizer');
            inventory.push('stabilizer used');
        }
    },
    'use key': () => {
        if ((gameState === 'start' || gameState === 'future_leave' || gameState === 'sphere') && inventory.includes('temporal key')) {

            if (inventory.includes('stabilizer used')) {
                gameState = 'master_of_time_ending';
            } else if (inventory.includes('temporal dust') && paradoxScore <= 50) {
                gameState = 'true_ending';
            } else {
                gameState = 'end';
            }
        }
    },
    'take plant': () => {
        if (gameState === 'dino_puzzle_raptor') {
            inventory.push('dino-lure');
            gameState = 'dino_puzzle_success';
        }
    },
    'take crystal': () => {
        if (gameState === 'swing_to_skeleton') {
            inventory.push('pulsating crystal');
            gameState = 'crystal_acquired';
        }
    },
    'use dino-lure': () => {
        if (gameState === 'cliff_face' && inventory.includes('dino-lure')) {
            inventory = inventory.filter(item => item !== 'dino-lure');
            gameState = 'trex_distracted';
        }
    },
    'enter cave': () => {
        if (gameState === 'trex_distracted') {
            inventory.push('sphere piece');
            paradoxScore += 40;
            gameState = 'cave';
        }
    },
    'press zorp gleep floop': () => {
        if (gameState === 'ship_console') {
            inventory.push('Ancient CPU');
            gameState = 'ship_puzzle_success';
        }
    },
    'a needle': () => {
        if (gameState === 'monastery_artifacts') {
            inventory.push('Pulsating Crystal');
            gameState = 'monastery_puzzle_success';
        }
    },
    'complete mission': () => {
        if (gameState === 'accept_mission') {
            inventory.push('Stabilizing Agent');
            gameState = 'clinic_puzzle_success';
        }
    }
};

function handleCommand(input) {
    if (commands[input]) {
        commands[input]();
        return true;
    }
    return false;
}

function handleOption(input) {
    const options = gameData[gameState].options;
    if (options[input]) {
        if (options[input] === 'start') {
            resetGame();
        } else {
            let nextState = options[input];
            if (typeof nextState === 'function') {
                nextState = nextState();
            }
            gameState = nextState;
            if (gameData[gameState].onEnter) {
                gameData[gameState].onEnter();
            }
        }
        return true;
    }
    return false;
}

function handleInvalidInput() {
    const p = document.createElement('p');
    p.className = 'error-message';
    p.style.color = '#ff4d4d';
    p.textContent = 'Invalid command. Try again.';
    story.appendChild(p);
}

function processInput() {
    const input = userInput.value.toLowerCase();
    const existingError = story.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    if (!handleCommand(input) && !handleOption(input)) {
        handleInvalidInput();
    }

    userInput.value = '';
    updateParadoxScore();
    updateMemory();
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
