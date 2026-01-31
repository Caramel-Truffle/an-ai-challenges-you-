const story = document.getElementById('story');
const userInput = document.getElementById('user-input');
const submitButton = document.getElementById('submit-button');
const paradoxScoreDisplay = document.getElementById('paradox-score');
const suspicionDisplay = document.getElementById('suspicion-level');
const inventoryDisplay = document.getElementById('inventory-display');
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
let antagonistLocation = 'dino.strange_clearing';

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
    if (paradoxScore >= 100) {
        gameState = 'core.paradox_ending';
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

function updateInventory() {
    inventoryDisplay.textContent = inventory.join(', ') || 'Empty';
}

function updateSuspicion() {
    if (gameState.startsWith('future')) {
        suspicionDisplay.style.display = 'block';
        suspicionDisplay.textContent = `Suspicion: ${suspicion}`;
    } else {
        suspicionDisplay.style.display = 'none';
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
            const knowsMotive = journal.includes('The antagonist is the lead scientist. They are trying to save their daughter.');

            if (hasAllCores && knowsMotive) {
                gameState = 'core.final_choice';
            } else if (inventory.includes('stabilizer used')) {
                gameState = 'core.master_of_time_ending';
            } else if (inventory.includes('temporal dust') && paradoxScore <= 50) {
                gameState = 'core.true_ending';
            } else {
                gameState = 'core.end';
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

    const options = currentState.options;
    if (options && options[input]) {
        if (options[input] === 'start' || options[input] === 'core.start') {
            resetGame();
        } else {
            let nextState = options[input];
            if (typeof nextState === 'function') {
                nextState = nextState();
            }
            gameState = nextState;
            currentDialogue = null;
            const newCurrentState = getCurrentState();
            if (newCurrentState) {
                if (newCurrentState.dialogue) {
                    currentDialogue = newCurrentState.dialogue.start;
                }
                if (newCurrentState.onEnter) {
                    newCurrentState.onEnter();
                }
            }
        }
        return true;
    }
    return false;
}

function handleDialoguePuzzle(input) {
    const currentState = getCurrentState();
    if (currentState && currentState.dialogue) {
        if (currentDialogue) {
            const choice = currentDialogue.options[input];
            if (choice) {
                if (typeof choice === 'string') {
                    currentDialogue = currentState.dialogue[choice];
                } else if (typeof choice === 'object') {
                    if (choice.onChoose) choice.onChoose();
                    if (choice.nextState) {
                        gameState = choice.nextState;
                        currentDialogue = null;
                        const newCurrentState = getCurrentState();
                        if (newCurrentState && newCurrentState.onEnter) {
                            newCurrentState.onEnter();
                        }
                    } else if (choice.response) {
                        lastResponse = choice.response;
                    }
                }
                return true;
            }
        } else {
            const choice = currentState.dialogue[input];
            if (choice) {
                lastResponse = choice.response;
                if (choice.onChoose) {
                    choice.onChoose();
                }
                if (choice.nextState) {
                    gameState = choice.nextState;
                    const newCurrentState = getCurrentState();
                    if (newCurrentState && newCurrentState.onEnter) {
                        newCurrentState.onEnter();
                    }
                }
                return true;
            }
        }
    }
    return false;
}

function handleCrafting(input) {
    if (input.startsWith('craft ')) {
        const itemToCraft = input.replace('craft ', '');
        const recipe = gameData.craftingRecipes[itemToCraft];
        if (recipe) {
            const hasIngredients = recipe.ingredients.every(ingredient => inventory.includes(ingredient));
            if (hasIngredients) {
                recipe.ingredients.forEach(ingredient => {
                    const index = inventory.indexOf(ingredient);
                    if (index > -1) {
                        inventory.splice(index, 1);
                    }
                });
                inventory.push(itemToCraft);
                lastResponse = `You successfully crafted ${itemToCraft}!`;
                return true;
            } else {
                lastResponse = `You don't have the ingredients to craft ${itemToCraft}. Need: ${recipe.ingredients.join(', ')}`;
                return true;
            }
        }
        lastResponse = `Unknown recipe: ${itemToCraft}`;
        return true;
    }
    return false;
}

function handlePuzzleInput(input) {
    const currentState = getCurrentState();
    if (currentState && currentState.puzzle) {
        if (input === currentState.puzzle.solution) {
            gameState = currentState.puzzle.successState;
            const newCurrentState = getCurrentState();
            if (newCurrentState && newCurrentState.onEnter) {
                newCurrentState.onEnter();
            }
            return true;
        } else {
            gameState = currentState.puzzle.failState || gameState;
            lastResponse = currentState.puzzle.failMessage || "Incorrect solution.";
            return true;
        }
    }
    return false;
}

function moveAntagonist() {
    const locations = [
        'dino.strange_clearing',
        'past.tavern',
        'future.tech_lab'
    ];
    antagonistLocation = locations[Math.floor(Math.random() * locations.length)];
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

    const wasHandled = handleCommand(input) ||
                       handlePuzzleInput(input) ||
                       handleDialoguePuzzle(input) ||
                       handleOption(input) ||
                       handleCrafting(input);

    if (!wasHandled) {
        handleInvalidInput();
    } else {
        if (gameState.startsWith('future')) {
            suspicion += 2;
            if (suspicion >= 50) {
                gameState = 'future.arrested';
            }
        }

        moveAntagonist();
        if (antagonistLocation === gameState) {
            lastResponse = "The hooded figure is here! You feel a chill as they watch you.";
            paradoxScore += 5;
        }
    }

    userInput.value = '';
    updateParadoxScore();
    updateSuspicion();
    updateInventory();
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
        let currentOptions;

        if (currentDialogue) {
            p.textContent = currentDialogue.text;
            currentOptions = currentDialogue.options;
        } else {
            p.textContent = currentState.text;
            currentOptions = currentState.options;
        }

        story.appendChild(p);

        if (currentOptions) {
            const optionsList = document.createElement('ul');
            for (const option in currentOptions) {
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

updateInventory();
updateSuspicion();
updateStory();
