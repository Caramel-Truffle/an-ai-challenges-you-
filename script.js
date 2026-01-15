document.addEventListener('DOMContentLoaded', () => {
    const storyEl = document.getElementById('story');
    const optionsEl = document.getElementById('options-container');
    const inputEl = document.getElementById('user-input');
    const submitBtn = document.getElementById('submit-button');

    let playerState = {
        inventory: [],
        timePeriod: 'present',
        unlockedSafe: false,
    };

    const gameData = {
        'lab-start': {
            story: `You awaken on a cold, metallic floor, the sterile scent of ozone filling your nostrils. Your head aches, and your memory is a blank slate. You're in a futuristic laboratory, bathed in the soft glow of holographic displays. A spherical device, pulsing with a gentle, blue light, rests on a nearby console.`,
            options: [
                { text: 'Examine the spherical device', command: 'examine device' },
                { text: 'Look around the lab', command: 'look around' },
            ],
            handleCommand: (command) => {
                if (command === 'examine device') return 'device-info';
                if (command === 'look around') return 'lab-description';
                return null;
            },
        },
        'lab-description': {
            story: `The lab is filled with advanced equipment you don't recognize. Wires and conduits snake across the walls, and a large, circular portal stands at the far end of the room, currently inactive. It seems this place was abandoned in a hurry. A dusty terminal in the corner catches your eye.`,
            options: [
                { text: 'Examine the spherical device', command: 'examine device' },
                { text: 'Check the terminal', command: 'check terminal' },
            ],
            handleCommand: (command) => {
                if (command === 'examine device') return 'device-info';
                if (command === 'check terminal') return 'terminal-info';
                return null;
            },
        },
        'terminal-info': {
            story: `You access the terminal. Most files are corrupted, but you find a fragmented log entry: <em>"Emergency shutdown sequence initiated. Reactor core temperatures critical. Access code for the safe is based on the founding date of the project... I can't remember it exactly, but it's related to the prime numbers."</em>`,
            options: [
                { text: 'Examine the spherical device', command: 'examine device' },
                { text: 'Look around the lab', command: 'look around' },
            ],
            handleCommand: (command) => {
                if (command === 'examine device') return 'device-info';
                if (command === 'look around') return 'lab-description';
                return null;
            },
        },
        'device-info': {
            story: `You approach the console and examine the device. It's perfectly smooth and cool to the touch. As your fingers brush against its surface, it hums to life, and a holographic interface projects into the air. It labels the device as the "Chronos Sphere." A voice, calm and synthetic, emanates from the sphere. <br><br><em>"Greetings, Dr. Aris. It appears you have experienced a memory lapse. I am Kai, your laboratory's AI. The Chronos Sphere is your invention, a device capable of manipulating time. We were in the middle of a critical experiment when a temporal anomaly occurred."</em>`,
            options: [
                { text: 'Ask "What is the anomaly?"', command: 'ask anomaly' },
            ],
            handleCommand: (command) => command === 'ask anomaly' ? 'anomaly-explanation' : null,
        },
        'anomaly-explanation': {
            story: `<em>"The anomaly is a temporal feedback loop that threatens to collapse the timeline. The experiment failed, and now, this facility is caught in a state of flux. You are the only one who can stabilize it. The Chronos Sphere is now bonded to your biometric signature. You must use it to navigate different time periods within this lab, gather two energy cores and a critical data chip, and restore them to the main reactor."</em> <br><br> The Chronos Sphere detaches from the console and floats toward you.`,
            options: [
                { text: 'Take the Chronos Sphere', command: 'take sphere' },
            ],
            handleCommand: (command) => {
                if (command === 'take sphere') {
                    playerState.inventory.push('Chronos Sphere');
                    return 'first-puzzle-intro';
                }
                return null;
            },
        },
        'first-puzzle-intro': {
            story: `With the Chronos Sphere in your hands, you feel a strange connection to it. Kai's voice returns, <em>"The first energy core is located in the laboratory's past, shortly before the anomaly. The time portal is now active. You must travel to the past and retrieve the core. Be warned, altering the past can have unforeseen consequences."</em> <br><br>The large, circular portal at the end of the room hums to life, swirling with energy.`,
            options: [
                { text: 'Use the portal to the past', command: 'use portal past' },
            ],
            handleCommand: (command) => {
                if (command === 'use portal past') {
                    playerState.timePeriod = 'past';
                    return 'past-lab';
                }
                return null;
            },
        },
        'past-lab': {
            story: `You step through the portal and emerge into a familiar, yet different version of the lab. The equipment is pristine, and the holographic displays show data streams you don't understand. A younger version of yourself is here, frantically working at a console. He seems stressed and unaware of your presence. The first energy core is visible on a nearby workbench. A calendar on the wall is circled with the date '23/7/2137' and the note "Project Chronos Begins!"`,
            options: [
                { text: 'Take the energy core', command: 'take core' },
                { text: 'Talk to your past self', command: 'talk to self' },
            ],
            handleCommand: (command) => {
                if (command === 'take core') {
                    playerState.inventory.push('Energy Core 1');
                    return 'past-self-notices';
                }
                if (command === 'talk to self') return 'paradox';
                return null;
            },
        },
        'past-self-notices': {
            story: `You quietly take the energy core. As you turn to leave, your past self looks up, his eyes widening in shock and confusion. "Who... who are you? What are you doing?" he stammers. The room begins to distort around you as a temporal paradox begins to form.`,
            options: [
                { text: 'Return to the present', command: 'use portal present' },
            ],
            handleCommand: (command) => {
                if (command === 'use portal present') {
                    playerState.timePeriod = 'present';
                    return 'present-lab-after-core';
                }
                return null;
            },
        },
        'present-lab-after-core': {
            story: `You leap back through the portal, the energy core clutched in your hand, just as the past begins to unravel. You're back in the silent, present-day lab. One core down. Kai speaks, <em>"Excellent work. The second core is in a safe in this very room, but the access code is on a data chip in the distant future, where the lab has fallen into ruin. You must travel there to retrieve it. The access code is the first four prime numbers from the project's founding date: 23/7/2137. You must hurry."</em>`,
            options: [
                { text: 'Use the portal to the future', command: 'use portal future' },
                { text: 'Enter code into safe', command: 'enter code' },
            ],
            handleCommand: (command) => {
                if (command === 'use portal future') {
                    playerState.timePeriod = 'future';
                    return 'future-lab';
                }
                if (command === 'enter code') {
                    if (playerState.unlockedSafe) {
                        if (playerState.inventory.includes('Data Chip')) {
                            return 'present-lab-after-both-cores';
                        } else {
                            return 'safe-already-unlocked';
                        }
                    } else {
                        return 'safe-puzzle';
                    }
                }
                return null;
            },
        },
        'safe-puzzle': {
            story: `You see a large safe embedded in one of the walls. It has a digital keypad. What code do you enter? (Hint: The code is the first four prime numbers from the date 23/7/2137).`,
            options: [
                { text: 'Enter code 2372', command: 'enter 2372' },
                { text: 'Enter code 2371', command: 'enter 2371' },
                { text: 'Go to the future', command: 'use portal future' },
            ],
            handleCommand: (command) => {
                if (command === 'enter 2371') {
                     return 'safe-wrong-code';
                }
                if (command === 'enter 2372') {
                    playerState.unlockedSafe = true;
                    playerState.inventory.push('Energy Core 2');
                    if (playerState.inventory.includes('Data Chip')) {
                        return 'present-lab-after-both-cores';
                    } else {
                        return 'safe-unlocked';
                    }
                }
                if (command === 'use portal future') {
                    playerState.timePeriod = 'future';
                    return 'future-lab';
                }
                return null;
            }
        },
        'safe-wrong-code': {
            story: `The keypad flashes red. Incorrect code.`,
            options: [
                { text: 'Try again', command: 'try again' },
                { text: 'Go to the future', command: 'use portal future' },
            ],
            handleCommand: (command) => {
                 if(command === 'try again') return 'safe-puzzle';
                 if (command === 'use portal future') {
                    playerState.timePeriod = 'future';
                    return 'future-lab';
                }
                 return null;
            }
        },
        'safe-unlocked': {
            story: `The safe hisses open, revealing the second energy core. You take it. You now have both energy cores, but you still need the data chip from the future before you can activate the reactor.`,
            options: [
                { text: 'Use the portal to the future', command: 'use portal future' },
            ],
            handleCommand: (command) => {
                if (command === 'use portal future') {
                    playerState.timePeriod = 'future';
                    return 'future-lab';
                }
                return null;
            }
        },
        'safe-already-unlocked': {
            story: `You have already unlocked the safe and retrieved the second energy core. You still need the data chip from the future.`,
            options: [
                { text: 'Use the portal to the future', command: 'use portal future' },
            ],
            handleCommand: (command) => {
                if (command === 'use portal future') {
                    playerState.timePeriod = 'future';
                    return 'future-lab';
                }
                return null;
            }
        },
        'future-lab': {
            story: `You step into the future. The lab is a wreck. Wires hang from the ceiling, and the advanced equipment is rusted and broken. Nature has begun to reclaim the space, with vines snaking through cracks in the walls. The air is thick with dust. You see the decaying remains of a security robot, a data chip still blinking on its chest.`,
            options: [
                { text: 'Take the data chip', command: 'take chip' },
                { text: 'Return to the present', command: 'use portal present' },
            ],
            handleCommand: (command) => {
                if (command === 'take chip') {
                    playerState.inventory.push('Data Chip');
                    return 'future-lab-with-chip';
                }
                if (command === 'use portal present') {
                    playerState.timePeriod = 'present';
                    return playerState.inventory.includes('Energy Core 2') ? 'present-lab-after-both-cores' : 'present-lab-after-core';
                }
                return null;
            },
        },
        'future-lab-with-chip': {
            story: `You have the data chip. There is nothing else of interest in this desolate future.`,
            options: [
                { text: 'Return to the present', command: 'use portal present' },
            ],
            handleCommand: (command) => {
                if (command === 'use portal present') {
                    playerState.timePeriod = 'present';
                    return playerState.inventory.includes('Energy Core 2') ? 'present-lab-after-both-cores' : 'present-lab-after-core';
                }
                return null;
            },
        },
        'present-lab-after-both-cores': {
             story: `You are back in the present lab. You have the data chip and both energy cores. It's time to head to the reactor.`,
             options: [
                { text: 'Go to the future', command: 'use portal future' },
                { text: 'Go to the reactor', command: 'go to reactor' },
             ],
             handleCommand: (command) => {
                 if (command === 'use portal future') {
                    playerState.timePeriod = 'future';
                    return 'future-lab';
                 }
                 if (command === 'go to reactor') return 'reactor-room';
                 return null;
             }
        },
        'reactor-room': {
            story: `You proceed to the reactor room. A large cylindrical chamber dominates the center of the room, with slots for the energy cores and the data chip. A control panel is nearby. Kai says, <em>"Place the components into the reactor. This is it, Doctor. The final step."</em>`,
            options: [
                { text: 'Place the components', command: 'place components' },
            ],
            handleCommand: (command) => {
                if (command === 'place components') {
                    if (playerState.inventory.includes('Energy Core 1') && playerState.inventory.includes('Data Chip') && playerState.inventory.includes('Energy Core 2')) {
                        return 'ending-good';
                    } else {
                        return 'ending-bad';
                    }
                }
                return null;
            },
        },
        'ending-good': {
            story: `You place the two cores and the data chip into the reactor. They hum to life, and the facility's power returns to normal. The temporal anomaly stabilizes and dissipates. You've saved the timeline! Kai's voice fills the room, full of something you could almost describe as relief. <em>"You did it, Doctor. You have secured the future. Welcome back."</em><br><br>THE END`,
            options: [
                { text: 'Play again?', command: 'play again' },
            ],
            handleCommand: (command) => {
                if (command === 'play again') {
                    playerState = { inventory: [], timePeriod: 'present', unlockedSafe: false };
                    return 'lab-start';
                }
                return null;
            },
        },
        'ending-bad': {
            story: `You approach the reactor, but you don't have all the necessary components. Without both energy cores and the data chip, the reactor cannot be stabilized. The temporal anomaly grows unstable and collapses, taking the entire facility with it in a silent, white flash.<br><br>GAME OVER`,
            options: [
                { text: 'Try again?', command: 'try again' },
            ],
            handleCommand: (command) => {
                if (command === 'try again') {
                    playerState = { inventory: [], timePeriod: 'present', unlockedSafe: false };
                    return 'lab-start';
                }
                return null;
            },
        },
        'paradox': {
            story: `You try to speak, but the words catch in your throat. The sight of your past self, combined with the stress of the situation, creates a temporal paradox. The world dissolves into a chaotic vortex of light and sound, and you are thrown back to the moment you awoke, the memory of what just happened already fading. The Chronos Sphere hums gently, as if waiting for you to try again.`,
            options: [
                { text: 'Start over', command: 'start over' },
            ],
            handleCommand: (command) => {
                if (command === 'start over') {
                    playerState = { inventory: [], timePeriod: 'present', unlockedSafe: false };
                    return 'lab-start';
                }
                return null;
            },
        },
    };

    let currentState = 'lab-start';

    function updateDisplay() {
        const scene = gameData[currentState];
        storyEl.innerHTML = `<p>${scene.story}</p>`;
        optionsEl.innerHTML = '<h3>Available Commands:</h3>';
        const optionsList = document.createElement('ul');
        scene.options.forEach(option => {
            const li = document.createElement('li');
            li.textContent = `${option.text} ('${option.command}')`;
            optionsList.appendChild(li);
        });
        optionsEl.appendChild(optionsList);
    }

    function processInput() {
        const input = inputEl.value.trim().toLowerCase();
        const scene = gameData[currentState];
        const nextState = scene.handleCommand(input);

        const existingError = storyEl.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        if (nextState) {
            currentState = nextState;
            updateDisplay();
        } else {
            const p = document.createElement('p');
            p.className = 'error-message';
            p.style.color = '#ff33cc';
            p.textContent = 'Invalid command. Try one of the available commands.';
            storyEl.appendChild(p);
        }

        inputEl.value = '';
        inputEl.focus();
    }

    submitBtn.addEventListener('click', processInput);
    inputEl.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            processInput();
        }
    });

    updateDisplay();
});
