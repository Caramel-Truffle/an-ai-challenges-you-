const story = document.getElementById('story');
const userInput = document.getElementById('user-input');
const submitButton = document.getElementById('submit-button');
const paradoxScoreDisplay = document.getElementById('paradox-score');
const memoryDisplay = document.getElementById('memory');
const journalDisplay = document.getElementById('journal-display');

let gameState = 'core.start';
let inventory = [];
let paradoxScore = 0;
let memory = [];
let journal = [];
let lastResponse = null;
let currentDialogue = null;

function navigateToState(statePath) {
    const [period, state] = statePath.split('.');
    if (gameData[period] && gameData[period][state]) {
        gameState = statePath;
        currentDialogue = null;
        const newState = gameData[period][state];
        if (newState.onEnter) {
            newState.onEnter();
        }
        updateStory();
    } else {
        console.error(`State not found: ${statePath}`);
    }
}

function getCurrentState() {
    const [period, state] = gameState.split('.');
    if (gameData[period] && gameData[period][state]) {
        return gameData[period][state];
    }
    return null;
}

function resetGame() {
    location.reload();
}

function updateParadoxScore() {
    paradoxScoreDisplay.textContent = `Paradox Score: ${paradoxScore}`;
    const gameContainer = document.getElementById('game-container');
    if (paradoxScore >= 50) {
        gameContainer.classList.add('paradox-glitch');
    } else {
        gameContainer.classList.remove('paradox-glitch');
    }
    if (paradoxScore >= 100) {
        navigateToState('core.paradox_ending');
    }
}

function updateJournal() {
    journalDisplay.innerHTML = '';
    if (journal.length > 0) {
        const journalList = document.createElement('ul');
        journal.forEach(item => {
            const journalItem = document.createElement('li');
            journalItem.textContent = item;
            journalList.appendChild(journalItem);
        });
        journalDisplay.appendChild(journalList);
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
        if ((gameState === 'core.start' || gameState === 'future.leave' || gameState === 'core.sphere') && inventory.includes('temporal key')) {
            const hasAllCores = inventory.includes('Temporal Core (Dino)') && inventory.includes('Temporal Core (Past)') && inventory.includes('Temporal Core (Future)');
            const knowsMotive = journal.includes('The antagonist is the lead scientist. They are trying to save their daughter.') ||
                               journal.some(j => j.includes('Dr. Aris Thorne') && j.includes('Elara'));

            if (hasAllCores && knowsMotive) {
                navigateToState('core.rift_1');
            } else if (inventory.includes('stabilizer used')) {
                navigateToState('core.master_of_time_ending');
            } else if (inventory.includes('temporal dust') && paradoxScore <= 50) {
                navigateToState('core.true_ending');
            } else {
                navigateToState('core.end');
            }
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
    const currentState = getCurrentState();
    if (!currentState) return false;

    if (currentState.dialogue) {
        currentDialogue = currentState.dialogue.start;
        return true;
    }

    const options = currentState.options;
    if (options && options[input]) {
        if (options[input] === 'start' || options[input] === 'core.start') {
            resetGame();
        } else {
            let nextState = options[input];
            if (typeof nextState === 'function') {
                nextState = nextState();
            }
            navigateToState(nextState);
        }
        return true;
    }
    return false;
}

function handleDialoguePuzzle(input) {
    const currentState = getCurrentState();
    if (currentState && currentState.dialogue) {
        const choice = currentState.dialogue[input];
        if (choice) {
            lastResponse = choice.response;
            if (choice.onChoose) {
                choice.onChoose();
            }
            if (choice.nextState) {
                navigateToState(choice.nextState);
            }
            return true;
        }
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

    if (!handleCommand(input) && !handleDialoguePuzzle(input) && !handleOption(input)) {
        handleInvalidInput();
    }

    userInput.value = '';
    updateParadoxScore();
    updateMemory();
    updateJournal();
    updateStory();
}

function updateStory() {
    story.innerHTML = '';

    if (lastResponse) {
        const p = document.createElement('p');
        p.classList.add('dialogue-response');
        p.textContent = lastResponse;
        story.appendChild(p);
        lastResponse = null;
    }

    const currentState = getCurrentState();
    if (currentState) {
        const p = document.createElement('p');
        let options;

        if (currentDialogue) {
            p.textContent = currentDialogue.text;
            options = currentDialogue.options;
        } else {
            p.textContent = currentState.text;
            options = currentState.options;
        }

        story.appendChild(p);

        const optionsSource = currentState.options || currentState.dialogue;
        if (optionsSource) {
            const optionsList = document.createElement('ul');
            for (const option in optionsSource) {
                const listItem = document.createElement('li');
                const link = document.createElement('a');
                link.href = '#';
                link.textContent = option;
                link.addEventListener('click', (event) => {
                    event.preventDefault();
                    userInput.value = option;
                    processInput();
                });
                listItem.appendChild(link);
                optionsList.appendChild(listItem);
            }
            story.appendChild(optionsList);
        }
    }
}

submitButton.addEventListener('click', processInput);
userInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        processInput();
    }
});

updateStory();
