const storyDisplay = document.getElementById('story');
const chronicleDisplay = document.getElementById('chronicle');
const userInput = document.getElementById('user-input');
const submitButton = document.getElementById('submit-button');
const paradoxScoreDisplay = document.getElementById('paradox-score');
const suspicionDisplay = document.getElementById('suspicion-level');
const reputationDisplay = document.getElementById('reputation-level');
const journalEntriesDisplay = document.getElementById('journal-entries');

let gameState = 'core.start';
let inventory = [];
let paradoxScore = 0;
let suspicion = 0;
let reputation = 0; // -100 to 100
let memory = [];
let journal = [];
let lastResponse = null;
let currentDialogue = null;
let chronicle = [];

function updateChronicle(text, type = 'story') {
    if (!text) return;
    const entry = document.createElement('div');
    entry.className = `chronicle-entry ${type}`;
    entry.textContent = text;
    chronicleDisplay.appendChild(entry);
    chronicleDisplay.scrollTop = chronicleDisplay.scrollHeight;
}

function triggerParadoxEvent() {
    if (paradoxScore > 20 && Math.random() < (paradoxScore / 200)) {
        const events = [
            "The air around you ripples like water. You see a version of yourself walking past, but they don't notice you.",
            "A sudden flash of light blinds you. When your vision clears, the colors of the world seem shifted for a moment.",
            "You hear a whisper in your own voice, but you haven't spoken. 'We've been here before,' it says.",
            "Your hands momentarily become translucent. You can see the structures of the room right through them.",
            "Time seems to stutter. A bird in the distance repeats the same second of flight three times before moving on."
        ];
        const event = events[Math.floor(Math.random() * events.length)];
        updateChronicle(`[PARADOX EVENT] ${event}`, 'response');
        paradoxScore += 2;
    }
}

function navigateToState(statePath) {
    const [period, state] = statePath.split('.');
    if (gameData[period] && gameData[period][state]) {
        gameState = statePath;
        currentDialogue = null;

        triggerParadoxEvent();

        // Apply theme based on period
        const gameContainer = document.getElementById('game-container');
        gameContainer.classList.remove('dino-theme', 'past-theme', 'future-theme');
        if (period === 'dino') gameContainer.classList.add('dino-theme');
        else if (period === 'past') gameContainer.classList.add('past-theme');
        else if (period === 'future') gameContainer.classList.add('future-theme');

        const newState = gameData[period][state];

        // Narrative update
        updateChronicle(newState.text);

        if (newState.onEnter) {
            newState.onEnter();
        }

        if (newState.dialogue && !newState.options) {
            currentDialogue = newState.dialogue.start;
            updateChronicle(currentDialogue.text, 'dialogue');
        }

        // Future era specific logic: moving adds suspicion
        if (period === 'future' && state !== 'intro' && !state.includes('fail')) {
            let increment = 2;
            if (inventory.includes('Bio-ID Chip')) increment = 1;
            if (inventory.includes('Stealth Decoy')) increment = Math.max(0, increment - 1);
            suspicion = Math.min(100, suspicion + increment);
        }

        updateStats();
        updateStory();
    } else {
        console.error(`State not found: ${statePath}`);
    }
}

function getCurrentState() {
    const [period, state] = gameState.split('.');
    return gameData[period] ? gameData[period][state] : null;
}

function resetGame() {
    location.reload();
}

function updateStats() {
    paradoxScoreDisplay.textContent = `Paradox Score: ${paradoxScore}`;
    suspicionDisplay.textContent = `Suspicion: ${suspicion}%`;

    let repText = 'Neutral';
    if (reputation > 50) repText = 'Heroic';
    else if (reputation > 10) repText = 'Trusted';
    else if (reputation < -50) repText = 'Villainous';
    else if (reputation < -10) repText = 'Suspicious';
    reputationDisplay.textContent = `Reputation: ${repText}`;

    const gameContainer = document.getElementById('game-container');
    if (paradoxScore >= 50) {
        gameContainer.classList.add('paradox-glitch');
    } else {
        gameContainer.classList.remove('paradox-glitch');
    }

    // Journal update
    journalEntriesDisplay.innerHTML = '';
    journal.forEach(item => {
        const div = document.createElement('div');
        div.className = 'journal-entry';
        div.textContent = `• ${item}`;
        journalEntriesDisplay.appendChild(div);
    });

    checkGameOver();
}

function checkGameOver() {
    if (paradoxScore >= 100) {
        if (!gameState.includes('ending')) {
            navigateToState('core.paradox_ending');
        }
    } else if (suspicion >= 100) {
        if (!gameState.includes('antagonist_encounter') && !gameState.includes('ending')) {
            navigateToState('future.antagonist_encounter');
        }
    }
}

const commands = {
    'use temporal dust': () => {
        if (inventory.includes('temporal dust')) {
            paradoxScore = Math.max(0, paradoxScore - 30);
            inventory = inventory.filter(item => item !== 'temporal dust');
            lastResponse = "You sprinkle the temporal dust. The air around you shimmers, and the feeling of wrongness fades slightly.";
        }
    },
    'use stabilizer': () => {
        if (inventory.includes('temporal stabilizer')) {
            paradoxScore = 0;
            inventory = inventory.filter(item => item !== 'temporal stabilizer');
            inventory.push('stabilizer used');
            lastResponse = "The Temporal Stabilizer hums to life, anchoring you in time and erasing the paradoxes you've caused.";
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
        const state = gameState;
        if (state.startsWith('dino.tall_grass') || state === 'dino.predator_nearby' || state.includes('grass')) {
            if (state.includes('rustle')) {
                lastResponse = "The rustling is rhythmic and getting closer. Something is hunting by sound.";
            } else if (state.includes('breathing')) {
                lastResponse = "The breathing is heavy and hot. It's right on top of you. DON'T MOVE.";
            } else if (state === 'dino.predator_nearby') {
                lastResponse = "You hear heavy breathing and clicking sounds directly ahead. DON'T GO FORWARD.";
            } else if (state === 'dino.tall_grass') {
                lastResponse = "You hear rustling to the left. It sounds like something big.";
            } else {
                lastResponse = "You hear the wind whistling through the grass and a faint metallic clinking to the right.";
            }
        } else {
            lastResponse = "You hear the natural sounds of the era.";
        }
    },
    'crouch': () => {
        if (gameState.includes('rustle')) {
            lastResponse = "You drop low into the thick grass. A massive shadow passes overhead, but it doesn't see you.";
            navigateToState('dino.tall_grass_safe');
        } else {
            lastResponse = "You crouch down, but there's no immediate threat to hide from.";
        }
    },
    'freeze': () => {
        if (gameState.includes('breathing')) {
            lastResponse = "You hold your breath, becoming as still as a statue. A snout sniffs the air inches from your face, then retreats.";
            navigateToState('dino.tall_grass_safe');
        } else {
            lastResponse = "You freeze in place, observing your surroundings.";
        }
    },
    'use key': () => {
        if ((gameState === 'core.start' || gameState === 'future.leave' || gameState === 'core.sphere') && inventory.includes('temporal key')) {
            const hasAllCores = inventory.includes('Temporal Core (Dino)') && inventory.includes('Temporal Core (Past)') && inventory.includes('Temporal Core (Future)');
            const knowsMotive = journal.some(j => (j.includes('Dr. Aris Thorne') && j.includes('Elara')) || j.includes('save her'));

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
        if (lastResponse) updateChronicle(lastResponse, 'response');
        return true;
    }
    return false;
}

function handleOption(input) {
    const currentState = getCurrentState();
    if (!currentState) return false;

    if (currentState.dialogue && !currentDialogue) {
        currentDialogue = currentState.dialogue.start;
        updateChronicle(currentDialogue.text, 'dialogue');
        return true;
    }

    const options = currentState.options;
    if (options) {
        const optionKey = Object.keys(options).find(key => key.toLowerCase() === input);
        if (optionKey) {
            updateChronicle(`> ${optionKey}`, 'input');
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
    const currentState = getCurrentState();
    const activeDialogue = currentDialogue || (currentState && currentState.dialogue);
    if (activeDialogue) {
        const dialogueSource = currentDialogue ? currentDialogue : activeDialogue;
        let choice = null;

        const optionsSource = dialogueSource.options || dialogueSource;
        const optionKey = Object.keys(optionsSource).find(key => key.toLowerCase() === input);
        if (optionKey) choice = optionsSource[optionKey];

        if (!choice && input === 'continue' && dialogueSource.nextState) {
            choice = dialogueSource.nextState;
        }

        if (choice) {
            updateChronicle(`> ${input}`, 'input');
            if (typeof choice === 'string') {
                if (choice.includes('.')) {
                    navigateToState(choice);
                } else if (currentState.dialogue[choice]) {
                    currentDialogue = currentState.dialogue[choice];
                    updateChronicle(currentDialogue.text, 'dialogue');
                }
                return true;
            }

            lastResponse = choice.response || choice.text;
            if (lastResponse) updateChronicle(lastResponse, 'dialogue');

            if (choice.onChoose) choice.onChoose();
            if (choice.onEnter) choice.onEnter();

            if (choice.nextState) {
                if (choice.nextState.includes('.')) {
                    navigateToState(choice.nextState);
                } else if (currentState.dialogue[choice.nextState]) {
                    currentDialogue = currentState.dialogue[choice.nextState];
                    updateChronicle(currentDialogue.text, 'dialogue');
                }
            } else if (choice.options) {
                currentDialogue = choice;
            } else {
                currentDialogue = null;
            }
            return true;
        }
    }
    return false;
}

function handleInvalidInput() {
    const p = document.createElement('p');
    p.className = 'error-message';
    p.textContent = 'Invalid command. Try again.';
    storyDisplay.appendChild(p);
}

function processInput() {
    const input = userInput.value.toLowerCase().trim();
    if (!input) return;

    const existingError = storyDisplay.querySelector('.error-message');
    if (existingError) existingError.remove();

    let handled = handleCommand(input);
    if (!handled) handled = handleDialoguePuzzle(input);
    if (!handled) handled = handleOption(input);

    if (!handled) {
        handleInvalidInput();
    } else {
        userInput.value = '';
        updateStats();
        updateStory();
    }
}

function updateStory() {
    storyDisplay.innerHTML = '';

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

        storyDisplay.appendChild(p);

        const optionsSource = options || (currentDialogue ? null : currentState.dialogue);
        if (optionsSource) {
            const optionsList = document.createElement('ul');
            for (const option in optionsSource) {
                const listItem = document.createElement('li');
                const link = document.createElement('a');
                link.href = '#';
                link.textContent = option;
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    userInput.value = option;
                    processInput();
                });
                listItem.appendChild(link);
                optionsList.appendChild(listItem);
            }
            storyDisplay.appendChild(optionsList);
        }
    }
}

submitButton.addEventListener('click', processInput);
userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') processInput();
});

// Initial load
navigateToState('core.start');
