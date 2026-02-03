const story = document.getElementById('story');
const userInput = document.getElementById('user-input');
const submitButton = document.getElementById('submit-button');
const paradoxScoreDisplay = document.getElementById('paradox-score');
const suspicionDisplay = document.getElementById('suspicion-level');
const memoryDisplay = document.getElementById('memory');
const journalDisplay = document.getElementById('journal-display');

let gameState = 'core.start';
let inventory = [];
let paradoxScore = 0;
let suspicion = 0;
let memory = [];
let journal = [];
let lastResponse = null;
let currentDialogue = null;

function navigateToState(statePath) {
    const [period, state] = statePath.split('.');
    if (gameData[period] && gameData[period][state]) {
        gameState = statePath;
        currentDialogue = null;

        // Apply theme based on period
        const gameContainer = document.getElementById('game-container');
        gameContainer.classList.remove('dino-theme', 'past-theme', 'future-theme');
        if (period === 'dino') gameContainer.classList.add('dino-theme');
        else if (period === 'past') gameContainer.classList.add('past-theme');
        else if (period === 'future') gameContainer.classList.add('future-theme');

        const newState = gameData[period][state];
        if (newState.onEnter) {
            newState.onEnter();
        }

        if (newState.dialogue && !newState.options) {
            currentDialogue = newState.dialogue.start;
        }

        // Future era specific logic: moving adds a bit of suspicion
        if (period === 'future' && state !== 'intro' && !state.includes('fail')) {
            suspicion = Math.min(100, suspicion + 2);
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
    checkGameOver();
}

function updateSuspicion() {
    suspicionDisplay.textContent = `Suspicion: ${suspicion}%`;
    checkGameOver();
}

function checkGameOver() {
    if (paradoxScore >= 100) {
        navigateToState('core.paradox_ending');
    } else if (suspicion >= 100) {
        // Find if we are already in an encounter or ending to avoid loop
        if (!gameState.includes('antagonist_encounter') && !gameState.includes('ending')) {
            navigateToState('future.antagonist_encounter');
        }
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
    'use decoy': () => {
        if (inventory.includes('Stealth Decoy')) {
            suspicion = Math.max(0, suspicion - 40);
            inventory = inventory.filter(item => item !== 'Stealth Decoy');
            lastResponse = "You deploy the decoy. The security drones are momentarily distracted, and your suspicion level drops.";
        }
    },
    'listen': () => {
        if (gameState.startsWith('dino.tall_grass') || gameState === 'dino.predator_nearby') {
            if (gameState === 'dino.predator_nearby') {
                lastResponse = "You hear heavy breathing and clicking sounds directly ahead. DON'T GO FORWARD.";
            } else if (gameState === 'dino.tall_grass') {
                lastResponse = "You hear rustling to the left. It sounds like something big.";
            } else {
                lastResponse = "You hear the wind whistling through the grass and a faint metallic clinking to the right.";
            }
        } else {
            lastResponse = "You hear the natural sounds of the era.";
        }
    },
    'use key': () => {
        if ((gameState === 'core.start' || gameState === 'future.leave' || gameState === 'core.sphere') && inventory.includes('temporal key')) {
            const hasAllCores = inventory.includes('Temporal Core (Dino)') && inventory.includes('Temporal Core (Past)') && inventory.includes('Temporal Core (Future)');
            const knowsMotive = journal.includes('The antagonist is the lead scientist. They are trying to save their daughter.') ||
                               journal.some(j => j.includes('Dr. Aris Thorne') && j.includes('Elara'));

            if (hasAllCores && knowsMotive) {
                navigateToState('core.rift_1');
            } else if (inventory.includes('stabilizer used') && inventory.includes("Elara's Locket")) {
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

    if (currentState.dialogue && !currentDialogue) {
        currentDialogue = currentState.dialogue.start;
        return true;
    }

    const options = currentState.options;
    if (options) {
        // Case-insensitive lookup
        const optionKey = Object.keys(options).find(key => key.toLowerCase() === input);
        if (optionKey) {
            const choice = options[optionKey];
            if (choice === 'start' || choice === 'core.start') {
                resetGame();
            } else {
                let nextState = choice;
                if (typeof nextState === 'function') {
                    nextState = nextState();
                }
                navigateToState(nextState);
            }
            return true;
        }
    }
    return false;
}

function handleDialoguePuzzle(input) {
    const activeDialogue = currentDialogue || (getCurrentState() && getCurrentState().dialogue);
    if (activeDialogue) {
        // If we are looking at the start of a dialogue defined in the state
        const dialogueSource = currentDialogue ? currentDialogue : activeDialogue;

        // Handle options in the current dialogue node
        let choice = null;
        if (dialogueSource.options) {
            const optionKey = Object.keys(dialogueSource.options).find(key => key.toLowerCase() === input);
            if (optionKey) choice = dialogueSource.options[optionKey];
        } else {
            const optionKey = Object.keys(dialogueSource).find(key => key.toLowerCase() === input);
            if (optionKey) choice = dialogueSource[optionKey];
        }

        // Auto-continue logic
        if (!choice && input === 'continue' && dialogueSource.nextState) {
            choice = dialogueSource.nextState;
        }

        if (choice) {
            if (typeof choice === 'string') {
                // It's a redirect to another dialogue node or state
                if (choice.includes('.')) {
                    navigateToState(choice);
                } else if (getCurrentState().dialogue[choice]) {
                    currentDialogue = getCurrentState().dialogue[choice];
                }
                return true;
            }

            // It's a complex choice object
            lastResponse = choice.response || choice.text;
            if (choice.onChoose) {
                choice.onChoose();
            }
            if (choice.onEnter) {
                choice.onEnter();
            }

            if (choice.nextState) {
                if (choice.nextState.includes('.')) {
                    navigateToState(choice.nextState);
                } else if (getCurrentState().dialogue[choice.nextState]) {
                    currentDialogue = getCurrentState().dialogue[choice.nextState];
                }
            } else if (choice.options) {
                currentDialogue = choice;
            } else {
                currentDialogue = null; // End of dialogue
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
    const input = userInput.value.toLowerCase().trim();
    if (!input) return;

    const existingError = story.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    let handled = handleCommand(input);
    if (!handled) handled = handleDialoguePuzzle(input);
    if (!handled) handled = handleOption(input);

    if (!handled) {
        handleInvalidInput();
    } else {
        userInput.value = '';
        updateParadoxScore();
        updateSuspicion();
        updateMemory();
        updateJournal();
        updateStory();
    }
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
            if (!options && currentDialogue.nextState) {
                options = { 'continue': currentDialogue.nextState };
            }
        } else {
            p.textContent = currentState.text;
            options = currentState.options;
        }

        story.appendChild(p);

        const optionsSource = options || (currentDialogue ? null : currentState.dialogue);
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

navigateToState('core.start');
