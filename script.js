const story = document.getElementById('story');
const userInput = document.getElementById('user-input');
const submitButton = document.getElementById('submit-button');
const paradoxScoreDisplay = document.getElementById('paradox-score');

let gameState = 'start';
let inventory = [];
let paradoxScore = 0;

const gameData = {
    start: {
        text: 'You find yourself in a sterile, white room. A single pedestal stands in the center, upon which rests a pulsating, crystalline sphere. A voice echoes in your mind: "The Chronos Sphere is your key and your prison. To truly escape and master time, you must assemble the Temporal Stabilizer. Its components are scattered across time. Only then can you control the Sphere."',
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
        text: 'As you touch the sphere, your vision blurs. You feel a disorienting pull, and the world around you dissolves into a vortex of light and color. You have activated the Chronos Sphere. Where will you go? (dino/past/future)',
        options: {
            'dino': 'dino_era_intro',
            'past': 'past_intro',
            'future': 'future_intro'
        }
    },
    dino_era_intro: {
        text: 'The air is thick with humidity and the smell of ozone. You stand in a lush, prehistoric jungle. Towering ferns and strange, colossal flowers surround you. In the distance, a volcano spews a plume of smoke into the sky. A deep, guttural roar echoes through the trees, a chilling reminder that you are not alone. You see a narrow path winding through the jungle, a steep cliff face, a murky swamp, and a strange metallic glint in the distance.',
        options: {
            'jungle path': 'jungle_path',
            'cliff face': 'cliff_face',
            'swamp': 'swamp',
            'investigate glint': 'crashed_ship',
            'return to sphere': 'sphere'
        }
    },
    crashed_ship: {
        text: 'You follow the glint and find a small, heavily damaged alien scout ship half-buried in the mud. The entry hatch is open. Inside, a console is flickering with a faint light.',
        options: {
            'enter ship': 'ship_console',
            'leave': 'dino_era_intro'
        }
    },
    ship_console: {
        text: 'You enter the ship. The console displays a sequence of three alien symbols. A keypad below the screen shows the same symbols. It seems to be a simple pattern-matching puzzle. The symbols are: Zorp, Gleep, Floop.',
        options: {
            'press zorp gleep floop': 'ship_puzzle_success',
            'leave': 'dino_era_intro'
        }
    },
    ship_puzzle_success: {
        text: 'You press the symbols in the correct order. The console beeps and a small compartment opens, revealing a small, intricate device. You have acquired the Ancient CPU.',
        options: {
            'leave': 'dino_era_intro'
        }
    },
    jungle_path: {
        text: 'You follow the jungle path. The path is overgrown and treacherous. You hear the rustling of unseen creatures in the undergrowth. After a short walk, you come to a clearing. In the clearing, you see a group of dinosaurs: a Stegosaurus, a Triceratops, and a Velociraptor. They seem to be communicating with each other. There is a strange, pulsating plant in the center of the clearing.',
        options: {
            'approach stegosaurus': 'dino_puzzle_stegosaurus',
            'approach triceratops': 'dino_puzzle_fail',
            'approach raptor': 'dino_puzzle_fail',
            'leave': 'dino_era_intro'
        }
    },
    dino_puzzle_stegosaurus: {
        text: 'You approach the Stegosaurus. It watches you with its small, intelligent eyes. It seems calm. The Triceratops now seems to be watching you expectantly.',
        options: {
            'approach triceratops': 'dino_puzzle_triceratops',
            'approach raptor': 'dino_puzzle_fail',
            'leave': 'dino_era_intro'
        }
    },
    dino_puzzle_triceratops: {
        text: 'You approach the Triceratops. It lowers its massive, horned head in a gesture of respect. The Velociraptor now seems to be observing you with a calculating gaze.',
        options: {
            'approach raptor': 'dino_puzzle_raptor',
            'leave': 'dino_era_intro'
        }
    },
    dino_puzzle_raptor: {
        text: 'You approach the Velociraptor. It lets out a series of clicks and whistles. The other dinosaurs seem to relax. The Velociraptor gestures with its head towards the strange plant. You have gained the dinosaurs\' trust.',
        options: {
            'take plant': 'dino_puzzle_success',
            'leave': 'dino_era_intro'
        }
    },
    dino_puzzle_success: {
        text: 'You take the strange plant. It feels warm to the touch and emits a low, humming sound. You have acquired a Dino-Lure.',
        options: {
            'leave': 'dino_era_intro'
        }
    },
    dino_puzzle_fail: {
        text: 'You approach the dinosaur, but it becomes agitated. The other dinosaurs also become hostile. You are forced to retreat. The dinosaurs have reset their positions.',
        options: {
            'leave': 'jungle_path'
        }
    },
    cliff_face: {
        text: 'You approach the cliff face. A massive Tyrannosaurus Rex blocks your path. It seems to be guarding something in a cave behind it. It hasn\'t seen you yet.',
        options: {
            'use dino-lure': 'trex_distracted',
            'sneak past': 'trex_fail',
            'leave': 'dino_era_intro'
        }
    },
    trex_distracted: {
        text: 'You use the Dino-Lure. The T-Rex is drawn to the strange plant\'s scent and sound. It lumbers away from the cave to investigate. The path is clear.',
        options: {
            'enter cave': 'cave',
            'leave': 'dino_era_intro'
        }
    },
    trex_fail: {
        text: 'You try to sneak past the T-Rex, but it spots you. You are not fast enough. You have reached a dead end.',
        options: {
            'start over': 'start'
        }
    },
    cave: {
        text: 'You enter the cave. Inside, you find a strange, alien artifact. It seems to be a piece of the Chronos Sphere. You take it.',
        options: {
            'leave': 'dino_era_intro'
        }
    },
    swamp: {
        text: 'You enter the swamp. The air is thick with the smell of decay. Strange, glowing fungi illuminate the murky water. You see a half-submerged skeleton of a massive creature.',
        options: {
            'leave': 'dino_era_intro'
        }
    },
    past_intro: {
        text: 'The scent of hay and woodsmoke fills the air. You stand in a bustling medieval marketplace, the cobblestones beneath your feet worn smooth by centuries of foot traffic. Merchants hawk their wares from colorful stalls, and the air buzzes with a dozen different languages. Your sudden appearance in a flash of light has not gone unnoticed. A guard in polished steel armor eyes you suspiciously, but you manage to slip into the throng of people. You see a blacksmith\'s forge, its chimney belching black smoke, an alchemist\'s shop with a sign depicting a bubbling potion, and a raucous tavern with music spilling out of its open door. The Chronos Sphere hums gently, a familiar anchor in this unfamiliar time.',
        options: {
            'blacksmith': 'blacksmith',
            'alchemist': 'alchemist_shop',
            'tavern': 'tavern',
            'visit monastery': 'monastery',
            'return to sphere': 'sphere'
        }
    },
    monastery: {
        text: 'You leave the bustling marketplace and follow a winding path up a hill to a secluded monastery. The monks are known for their wisdom and their collection of rare artifacts. An elderly monk greets you at the gate.',
        options: {
            'ask about artifacts': 'monastery_artifacts',
            'leave': 'past_intro'
        }
    },
    monastery_artifacts: {
        text: 'The monk leads you to a room filled with ancient relics. He points to a faintly glowing crystal on a pedestal. "This is the Pulsating Crystal," he says. "It is said to resonate with the echoes of time. To prove your worthiness to possess it, you must answer a riddle: What has an eye, but cannot see?"',
        options: {
            'a needle': 'monastery_puzzle_success',
            'leave': 'past_intro'
        }
    },
    monastery_puzzle_success: {
        text: 'The monk smiles. "You are wise. The crystal is yours." He hands you the Pulsating Crystal.',
        options: {
            'leave': 'past_intro'
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
        text: 'The city is a symphony of chrome and neon. Towering skyscrapers pierce the clouds, their surfaces reflecting the perpetual twilight of the city\'s artificial sky. Flying vehicles, sleek and silent, weave between the buildings in intricate patterns. Robots of all shapes and sizes glide along the pristine sidewalks, attending to the needs of the genetically-enhanced populace. A hovering drone, its single red eye glowing ominously, swivels to scan you. You duck into a crowded cyber-market, the air thick with the scent of ozone and synthetic street food. Stalls overflow with holographic advertisements for everything from bio-enhancements to black-market data crystals.',
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
            'visit clinic': 'black_market_clinic',
            'leave': 'future_leave'
        }
    },
    black_market_clinic: {
        text: 'You duck into a dimly lit alley and find a black market clinic. A cybernetically enhanced doctor greets you. "Here for an upgrade?" she asks, her voice a metallic rasp.',
        options: {
            'ask about rare tech': 'clinic_tech',
            'leave': 'cyber_market'
        }
    },
    clinic_tech: {
        text: 'You ask the doctor about rare technology. She smirks. "I have something special, but it will cost you. I need a favor. There is a rival data broker who has a valuable data chip. Get it for me, and I will give you a Stabilizing Agent." She gives you a device to disable the broker\'s security.',
        options: {
            'accept mission': 'accept_mission',
            'leave': 'cyber_market'
        }
    },
    accept_mission: {
        text: 'You accept the mission. The data broker\'s office is in a nearby skyscraper. You use the device to disable the security and find the data chip. You return to the clinic and give the chip to the doctor.',
        options: {
            'complete mission': 'clinic_puzzle_success',
            'leave': 'cyber_market'
        }
    },
    clinic_puzzle_success: {
        text: 'The doctor smiles. "A deal is a deal." She hands you a vial of shimmering liquid. "This is a Stabilizing Agent. It will help you control the Chronos Sphere." You have acquired the Stabilizing Agent.',
        options: {
            'leave': 'cyber_market'
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
        text: 'You insert the key into the pedestal. The Temporal Stabilizer components in your inventory resonate with the Sphere, stabilizing the temporal energies. The room dissolves, not into a chaotic vortex, but into a serene landscape of swirling nebulae. You have escaped and mastered the currents of time. You are free to choose your own destiny.',
        options: {
            'play again': 'start'
        }
    },
    master_of_time_ending: {
        text: 'You insert the key into the pedestal. The Temporal Stabilizer components resonate with the Sphere, and your low paradox score allows for perfect synchronization. The room dissolves, and you find yourself not just in a serene landscape, but at the very heart of time itself. You have become a master of time, able to travel to any point in history at will. The universe is your playground.',
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

const commands = {
    'buy metal': () => {
        if (gameState === 'blacksmith_metal') {
            inventory.push('rare earth metal');
            paradoxScore += 20;
            gameData.cyber_market.text = 'You browse the market. A vendor is selling a data crystal that contains a wealth of historical information. "A real bargain," he says, "for someone who wants to know the past." You have a rare earth metal to trade.';
            gameState = 'past_intro';
        }
    },
    'buy crystal': () => {
        if (gameState === 'cyber_market' && inventory.includes('rare earth metal')) {
            inventory.push('data crystal');
            inventory = inventory.filter(item => item !== 'rare earth metal');
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
            gameData.start.text = 'You are back in the sterile, white room. You now have a strange, ornate key. The Chronos Sphere pulses before you. A keyhole has appeared on the pedestal.';
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
    'use key': () => {
        if ((gameState === 'start' || gameState === 'future_leave' || gameState === 'sphere') && inventory.includes('temporal key')) {
            const hasAllStabilizerParts = inventory.includes('Ancient CPU') && inventory.includes('Pulsating Crystal') && inventory.includes('Stabilizing Agent');
            if (hasAllStabilizerParts) {
                if (paradoxScore <= 20) {
                    gameState = 'master_of_time_ending';
                } else {
                    gameState = 'true_ending';
                }
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
            gameState = options[input];
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
