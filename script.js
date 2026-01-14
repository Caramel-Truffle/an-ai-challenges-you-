const story = document.getElementById('story');
const userInput = document.getElementById('user-input');
const submitButton = document.getElementById('submit-button');

let gameState = 'start';

const gameData = {
    start: {
        text: 'You awaken in a silent, moonlit forest. Your head throbs, and you have no memory of how you got here. A cold breeze whispers through the trees, carrying a sense of unease. Before you lies a dimly lit path. What do you do?',
        options: {
            'go forward': 'path',
            'look around': 'forest'
        }
    },
    path: {
        text: 'You walk down the path, the silence of the forest pressing in on you. The path splits in two. A signpost is barely visible in the dim light. Do you go left or right?',
        options: {
            'go left': 'leftPath',
            'go right': 'rightPath'
        }
    },
    forest: {
        text: 'You look around and see nothing but endless trees. The moonlight casts long, dancing shadows that play tricks on your eyes. You feel a sense of being watched. Do you go back to the path or venture deeper into the forest?',
        options: {
            'go back': 'start',
            'go deeper': 'deepForest'
        }
    },
    leftPath: {
        text: 'You take the left path and find a small, abandoned cabin. The door is slightly ajar. Do you enter the cabin or continue on the path?',
        options: {
            'enter cabin': 'cabin',
            'continue': 'end'
        }
    },
    rightPath: {
        text: 'You take the right path, and the forest grows darker. You hear a faint sound, like a twig snapping. Do you investigate the sound or run?',
        options: {
            'investigate': 'end',
            'run': 'start'
        }
    },
    deepForest: {
        text: 'You venture deeper into the forest, and the trees seem to close in around you. You are lost. You have reached a dead end.',
        options: {
            'start over': 'start'
        }
    },
    cabin: {
        text: 'You enter the cabin and find a dusty room with a single flickering candle. On a table, you see a note. It reads: "You should not have come here." You have reached a dead end.',
        options: {
            'start over': 'start'
        }
    },
    end: {
        text: 'You have reached the end of your journey. Thanks for playing!',
        options: {
            'play again': 'start'
        }
    }
};

function processInput() {
    const input = userInput.value.toLowerCase();
    const options = gameData[gameState].options;

    const existingError = story.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    if (options[input]) {
        gameState = options[input];
        updateStory();
    } else {
        const p = document.createElement('p');
        p.className = 'error-message';
        p.style.color = '#ff4d4d';
        p.textContent = 'Invalid command. Try again.';
        story.appendChild(p);
    }

    userInput.value = '';
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
