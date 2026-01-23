const gameData = {
    core: {
        start: {
            text: 'You find yourself in a sterile, white room. A single pedestal stands in the center, upon which rests a pulsating, crystalline sphere. A voice echoes in your mind: "The Chronos Sphere is your key and your prison. To escape, you must navigate the currents of time. But be warned, another traveler is lost in time. They will try to stop you, twisting the past to their own design. Do not let them." A faint, feminine whisper echoes in your mind as the voice fades: "He lies..."',
            options: {
                'touch sphere': 'core.sphere',
                'look around': 'core.room'
            }
        },
        room: {
            text: 'The room is bare, with no discernible doors or windows. The walls hum with a faint energy. The only object of interest is the Chronos Sphere.',
            options: {
                'touch sphere': 'core.sphere'
            }
        },
        sphere: {
            text: 'As you touch the sphere, your vision blurs. You feel a disorienting pull, and the world around you dissolves into a vortex of light and color. You have activated the Chronos Sphere. Where will you go? (dino/past/future)',
            options: {
                'dino': 'dino.intro',
                'past': 'past.intro',
                'future': 'future.intro'
            }
        },
        end: {
            text: 'You insert the key into the pedestal. The Chronos Sphere flares with a brilliant light, and the room dissolves around you. You have escaped. Congratulations!',
            options: {
                'play again': 'core.start'
            }
        },
        master_of_time_ending: {
            text: 'You insert the key into the pedestal. The Temporal Stabilizer in your inventory activates, humming with a powerful energy. The Chronos Sphere resonates with the device, and the room dissolves into a breathtaking vista of the entire timeline. You see the past, present, and future laid out before you, not as a chaotic mess, but as a beautiful, intricate tapestry. You have not only escaped, but you have become a master of time, a guardian of the timeline. You are free to go anywhere, anywhen.',
            options: {
                'play again': 'core.start'
            }
        },
        true_ending: {
            text: 'You insert the key into the pedestal. The Temporal Stabilizer components in your inventory resonate with the Sphere, stabilizing the temporal energies. The room dissolves, not into a chaotic vortex, but into a serene landscape of swirling nebulae. You have escaped and mastered the currents of time. You are free to choose your own destiny.',
            options: {
                'play again': 'core.start'
            }
        },
        paradox_ending: {
            text: 'The world around you shatters into a million crystalline fragments. Your meddling with time has created a paradox that has unraveled reality itself. You are lost in the void between moments.',
            options: {
                'start over': 'core.start'
            }
        },
        antagonist_wins_ending: {
            text: 'You are trapped in a timeless void, a prison of the antagonist\'s making. You have failed. The antagonist has won. Their plan to reshape the past is now unopposed. You can only watch as the timeline is rewritten, your own existence fading into nothingness.',
            options: {
                'start over': 'core.start'
            }
        }
    },
    dino: {
        intro: {
            text: 'The air is thick with humidity and the smell of ozone. You stand in a lush, prehistoric jungle. Towering ferns and strange, colossal flowers surround you. In the distance, a volcano spews a plume of smoke into the sky. A deep, guttural roar echoes through the trees, a chilling reminder that you are not alone. You see a narrow path winding through the jungle, a steep cliff face, a murky swamp, a strange metallic glint in the distance, a strange clearing, and a blocked cave.',
            options: {
                'jungle path': 'dino.jungle_path',
                'cliff face': 'dino.cliff_face',
                'swamp': 'dino.swamp',
                'investigate glint': 'dino.crashed_ship',
                'strange clearing': 'dino.strange_clearing',
                'blocked cave': 'dino.blocked_cave',
                'return to sphere': 'core.sphere'
            }
        },
        strange_clearing: {
            text: 'You find a strange clearing in the jungle. In the center of the clearing, a strange symbol is carved into the ground. It seems to be a star map, but the constellations are all wrong. You also see a strange, hooded figure watching you from the edge of the clearing.',
            options: {
                'remember symbol': 'dino.remember_symbol',
                'talk to hooded figure': 'dino.antagonist_encounter',
                'leave': 'dino.intro'
            }
        },
        remember_symbol: {
            text: 'You commit the strange symbol to memory. It feels important.',
            options: {
                'leave': 'dino.intro'
            },
            onEnter: () => {
                if (!memory.includes('symbol')) {
                    memory.push('symbol');
                }
            }
        },
        antagonist_encounter: {
            text: 'As you are about to leave the clearing, the hooded figure reappears. "You are not supposed to be here," it says, its voice a distorted whisper. "Every time you jump, you weaken the fabric of reality. I am trying to prevent a catastrophe, and you are making it worse. I will not let you interfere." The figure raises a hand, and you feel a sharp pain in your head. The world around you begins to fade. You have been sent back to the sphere.',
            options: {
                'return to sphere': 'core.sphere'
            },
            onEnter: () => {
                paradoxScore += 10;
            }
        },
        crashed_ship: {
            text: 'You follow the glint and find a small, heavily damaged alien scout ship half-buried in the mud. The entry hatch is open. Inside, a console is flickering with a faint light.',
            options: {
                'enter ship': 'dino.ship_console',
                'leave': 'dino.intro'
            }
        },
        ship_console: {
            text: 'You enter the ship. The console displays a sequence of three alien symbols. A keypad below the screen shows the same symbols. It seems to be a simple pattern-matching puzzle. The symbols are: Zorp, Gleep, Floop. Below the symbols, there is a slot to insert a memory.',
            options: {
                'press zorp gleep floop': 'dino.ship_puzzle_with_memory',
                'leave': 'dino.intro'
            }
        },
        ship_puzzle_with_memory: {
            text: 'You insert the memory of the strange symbol into the console. The console whirs to life, and the alien symbols on the screen begin to glow. You press the symbols in the correct order. The console beeps and a small compartment opens, revealing a small, intricate device. You have acquired the Ancient CPU.',
            options: {
                'leave': 'dino.intro'
            },
            onEnter: () => {
                if (!inventory.includes('Ancient CPU')) {
                    inventory.push('Ancient CPU');
                }
            }
        },
        jungle_path: {
            text: 'You follow the jungle path. The path is overgrown and treacherous. You hear the rustling of unseen creatures in the undergrowth. After a short walk, you come to a clearing. In the clearing, you see a group of dinosaurs: a Stegosaurus, a Triceratops, and a Velociraptor. They seem to be communicating with each other. There is a strange, pulsating plant in the center of the clearing.',
            options: {
                'approach stegosaurus': 'dino.dino_puzzle_stegosaurus',
                'approach triceratops': 'dino.dino_puzzle_fail',
                'approach raptor': 'dino.dino_puzzle_fail',
                'leave': 'dino.intro'
            }
        },
        dino_puzzle_stegosaurus: {
            text: 'You approach the Stegosaurus. It watches you with its small, intelligent eyes. It seems calm. The Triceratops now seems to be watching you expectantly.',
            options: {
                'approach triceratops': 'dino.dino_puzzle_triceratops',
                'approach raptor': 'dino.dino_puzzle_fail',
                'leave': 'dino.intro'
            }
        },
        dino_puzzle_triceratops: {
            text: 'You approach the Triceratops. It lowers its massive, horned head in a gesture of respect. The Velociraptor now seems to be observing you with a calculating gaze.',
            options: {
                'approach raptor': 'dino.dino_puzzle_raptor',
                'leave': 'dino.intro'
            }
        },
        dino_puzzle_raptor: {
            text: 'You approach the Velociraptor. It lets out a series of clicks and whistles. The other dinosaurs seem to relax. The Velociraptor gestures with its head towards the strange plant. You have gained the dinosaurs\' trust.',
            options: {
                'take plant': 'dino.dino_puzzle_success',
                'leave': 'dino.intro'
            }
        },
        dino_puzzle_success: {
            text: 'You take the strange plant. It feels warm to the touch and emits a low, humming sound. You have acquired a Dino-Lure.',
            options: {
                'leave': 'dino.intro'
            },
            onEnter: () => {
                if (!inventory.includes('dino-lure')) {
                    inventory.push('dino-lure');
                }
            }
        },
        dino_puzzle_fail: {
            text: 'You approach the dinosaur, but it becomes agitated. The other dinosaurs also become hostile. You are forced to retreat. The dinosaurs have reset their positions.',
            options: {
                'leave': 'dino.jungle_path'
            }
        },
        cliff_face: {
            text: 'You approach the cliff face. A massive Tyrannosaurus Rex blocks your path. It seems to be guarding something in a cave behind it. It hasn\'t seen you yet.',
            options: {
                'use dino-lure': 'dino.trex_distracted',
                'sneak past': 'dino.trex_fail',
                'leave': 'dino.intro'
            }
        },
        trex_distracted: {
            text: 'You use the Dino-Lure. The T-Rex is drawn to the strange plant\'s scent and sound. It lumbers away from the cave to investigate. The path is clear.',
            options: {
                'enter cave': 'dino.cave',
                'leave': 'dino.intro'
            },
            onEnter: () => {
                inventory = inventory.filter(item => item !== 'dino-lure');
            }
        },
        trex_fail: {
            text: 'You try to sneak past the T-Rex, but it spots you. You are not fast enough. You have reached a dead end.',
            options: {
                'start over': 'core.start'
            }
        },
        cave: {
            text: 'You enter the cave. Inside, you find a strange, alien artifact. It seems to be a piece of the Chronos Sphere. You take it.',
            options: {
                'leave': 'dino.intro'
            },
            onEnter: () => {
                if (!inventory.includes('sphere piece')) {
                    inventory.push('sphere piece');
                }
                paradoxScore += 40;
            }
        },
        swamp: {
            text: 'You enter the swamp. The air is thick with the smell of decay. Strange, glowing fungi illuminate the murky water. In the middle of a deep pool, a half-submerged skeleton of a massive creature rests. In one of its eye sockets, you spot a faint, pulsating light. Sturdy vines hang from the trees overhead.',
            options: {
                'use vines': 'dino.swing_to_skeleton',
                'swim': 'dino.swim_fail',
                'leave': 'dino.intro'
            }
        },
        swing_to_skeleton: {
            text: 'You grab a thick vine and swing out over the murky water. You land silently on the creature\'s massive skull, right next to the glowing crystal.',
            options: {
                'take crystal': 'dino.crystal_acquired',
                'leave': 'dino.intro'
            }
        },
        crystal_acquired: {
            text: 'You carefully pry the Pulsating Crystal from the eye socket. It hums with a powerful energy. You now have a key component for the Temporal Stabilizer. You swing back to solid ground.',
            options: {
                'leave': 'dino.intro'
            },
            onEnter: () => {
                if (!inventory.includes('Pulsating Crystal')) {
                    inventory.push('Pulsating Crystal');
                }
            }
        },
        swim_fail: {
            text: 'You try to swim across, but the moment you enter the water, a large, unseen creature pulls you under. You have reached a dead end.',
            options: {
                'start over': 'core.start'
            }
        },
        blocked_cave: {
            text: 'You find a cave that is blocked by a massive rockfall. There is no way to get through.',
            options: {
                'use explosive': 'dino.cave_cleared',
                'leave': 'dino.intro'
            }
        },
        cave_cleared: {
            text: 'You use the explosive to clear the rockfall. The cave is now open. Inside, you find a strange, alien data chip.',
            options: {
                'take chip': 'dino.chip_acquired',
                'leave': 'dino.intro'
            },
            onEnter: () => {
                inventory = inventory.filter(item => item !== 'explosive');
            }
        },
        chip_acquired: {
            text: 'You take the data chip. It feels cool to the touch and hums with a faint energy.',
            options: {
                'leave': 'dino.intro'
            },
            onEnter: () => {
                if (!inventory.includes('alien data chip')) {
                    inventory.push('alien data chip');
                }
            }
        }
    },
    past: {
        intro: {
            text: 'The scent of hay and woodsmoke fills the air. You stand in a bustling medieval marketplace, the cobblestones beneath your feet worn smooth by centuries of foot traffic. Merchants hawk their wares from colorful stalls, and the air buzzes with a dozen different languages. Your sudden appearance in a flash of light has not gone unnoticed. A guard in polished steel armor eyes you suspiciously, but you manage to slip into the throng of people. You see a blacksmith\'s forge, its chimney belching black smoke, an alchemist\'s shop with a sign depicting a bubbling potion, and a raucous tavern with music spilling out of its open door. The Chronos Sphere hums gently, a familiar anchor in this unfamiliar time.',
            options: {
                'blacksmith': 'past.blacksmith',
                'alchemist': 'past.alchemist_shop',
                'tavern': 'past.tavern',
                'visit monastery': 'past.monastery',
                'return to sphere': 'core.sphere'
            }
        },
        monastery: {
            text: 'You leave the bustling marketplace and follow a winding path up a hill to a secluded monastery. The monks are known for their wisdom and their collection of rare artifacts. An elderly monk greets you at the gate.',
            options: {
                'ask about artifacts': 'past.monastery_artifacts',
                'leave': 'past.intro'
            }
        },
        monastery_artifacts: {
            text: 'The monk leads you to a room filled with ancient relics. He points to a faintly glowing crystal on a pedestal. "This is the Pulsating Crystal," he says. "It is said to resonate with the echoes of time. To prove your worthiness to possess it, you must answer a riddle: What has an eye, but cannot see?"',
            options: {
                'a needle': 'past.monastery_puzzle_success',
                'leave': 'past.intro'
            }
        },
        monastery_puzzle_success: {
            text: 'The monk smiles. "You are wise. The crystal is yours." He hands you the Pulsating Crystal.',
            options: {
                'leave': 'past.intro'
            },
            onEnter: () => {
                if (!inventory.includes('Pulsating Crystal')) {
                    inventory.push('Pulsating Crystal');
                }
            }
        },
        alchemist_shop: {
            text: 'You enter the alchemist\'s shop. Strange potions and herbs line the shelves. The alchemist, a wizened old man, greets you. "Welcome, traveler. What can I do for you?"',
            options: {
                'ask about sphere': 'past.alchemist_sphere',
                'ask for a challenge': 'past.alchemist_riddle',
                'ask about synthesis': 'past.alchemist_synthesis',
                'leave': 'past.intro'
            }
        },
        alchemist_synthesis: {
            text: 'You ask about synthesis. The alchemist\'s eyes gleam with interest. "Ah, you are interested in the higher arts. I can create a powerful Stabilizing Agent, but I require a potent energy source and a catalyst. The Temporal Dust I gave you can serve as the catalyst, but you will need to find an energy source on your own."',
            options: {
                'synthesize agent': 'past.alchemist_synthesis_success',
                'leave': 'past.alchemist_shop'
            }
        },
        alchemist_synthesis_success: {
            text: 'You give the alchemist the Pulsating Crystal and the Temporal Dust. He combines them in a flash of light, creating a swirling, iridescent liquid. "Here you are," he says, handing you the Stabilizing Agent. "Use it wisely."',
            options: {
                'leave': 'past.alchemist_shop'
            },
            onEnter: () => {
                if (inventory.includes('Pulsating Crystal') && inventory.includes('temporal dust')) {
                    inventory = inventory.filter(item => item !== 'Pulsating Crystal');
                    inventory = inventory.filter(item => item !== 'temporal dust');
                    if (!inventory.includes('Stabilizing Agent')) {
                        inventory.push('Stabilizing Agent');
                    }
                } else {
                    gameState = 'past.alchemist_synthesis_fail';
                }
            }
        },
        alchemist_synthesis_fail: {
            text: 'You don\'t have the necessary components. The alchemist requires a powerful energy source and a catalyst.',
            options: {
                'leave': 'past.alchemist_shop'
            }
        },
        alchemist_riddle: {
            text: 'The alchemist smiles. "A seeker of knowledge, are you? Very well. I have a riddle for you. I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?"',
            options: {
                'a map': 'past.alchemist_riddle_success',
                'leave': 'past.intro'
            }
        },
        alchemist_riddle_success: {
            text: 'The alchemist\'s eyes twinkle. "Correct! You are wise beyond your years. For your troubles, take this." He hands you a pouch of shimmering dust. "This is Temporal Dust. It can mend small paradoxes." You thank him and leave.',
            options: {
                'leave': 'past.intro'
            },
            onEnter: () => {
                if (!inventory.includes('temporal dust')) {
                    inventory.push('temporal dust');
                }
            }
        },
        alchemist_sphere: {
            text: 'You ask the alchemist about the Chronos Sphere. His eyes widen. "A dangerous artifact," he whispers. "It is said to be a key to time itself. But it requires a key of its own to be controlled." He will say no more.',
            options: {
                'leave': 'past.intro'
            }
        },
        blacksmith: {
            text: 'You enter the blacksmith\'s forge. The air is hot and filled with the sound of hammering. The blacksmith is a large, muscular man. "What do you want?" he grunts.',
            options: {
                'ask about metal': 'past.blacksmith_metal',
                'leave': 'past.intro'
            }
        },
        blacksmith_metal: {
            text: 'You ask the blacksmith about rare metals. He shows you a strange, intricate metal object with geometric patterns etched into its surface. "Found this in a crater," he says. "It\'s harder than any steel I\'ve ever seen, and it hums with a faint warmth. You can have it for a price."',
            options: {
                'buy cpu': 'past.buy_cpu',
                'leave': 'past.intro'
            }
        },
        buy_cpu: {
            text: 'You buy the strange metal from the blacksmith. It feels warm to the touch and hums with a faint energy.',
            options: {
                'leave': 'past.intro'
            },
            onEnter: () => {
                if (!inventory.includes('ancient cpu')) {
                    inventory.push('ancient cpu');
                }
                paradoxScore += 20;
            }
        },
        tavern: {
            text: 'You enter the tavern. It is a noisy, crowded place. A woman with a lute is singing a sad song about a lost love. A group of knights is gambling at a corner table. The innkeeper, a large, jolly man, is cleaning a mug behind the bar. You also see a strange, hooded figure sitting in a dark corner, and a mysterious stranger sipping ale by the fire.',
            options: {
                'talk to singer': 'past.singer_dialogue',
                'talk to knights': 'past.knights_dialogue',
                'talk to innkeeper': 'past.innkeeper_dialogue',
                'talk to hooded figure': 'past.antagonist_encounter',
                'talk to mysterious stranger': 'past.stranger_dialogue_start',
                'leave': 'past.intro'
            }
        },
        singer_dialogue: {
            text: 'You approach the singer. She smiles sadly. "Hello, stranger. Care to hear a song?"',
            options: {
                'yes': 'past.singer_song',
                'no': 'past.tavern'
            }
        },
        singer_song: {
            text: 'The singer plays a beautiful, haunting melody. The song tells the story of a knight who fell in love with a mysterious woman who could travel through time. The woman eventually left him, and the knight was heartbroken. The singer tells you that the knight is one of the men gambling in the corner.',
            options: {
                'leave': 'past.tavern'
            }
        },
        knights_dialogue: {
            text: 'You approach the knights. They are loud and boisterous. "Care to join us for a game of chance, stranger?" one of them asks.',
            options: {
                'yes': 'past.knights_game',
                'no': 'past.tavern'
            }
        },
        knights_game: {
            text: 'You play a game of dice with the knights. You win a few coins, but you also lose a few. One of the knights, a sad-looking man, tells you that he is looking for a way to travel through time to find his lost love.',
            options: {
                'leave': 'past.tavern'
            }
        },
        innkeeper_dialogue: {
            text: 'You approach the innkeeper. "Welcome, stranger," he says. "What can I get for you?"',
            options: {
                'ask about rumors': 'past.innkeeper_rumors',
                'leave': 'past.tavern'
            }
        },
        innkeeper_rumors: {
            text: 'The innkeeper tells you that there have been strange sightings in the area lately. People have seen a hooded figure lurking in the shadows, and there are rumors of a strange, metallic object that fell from the sky.',
            options: {
                'leave': 'past.tavern'
            }
        },
        lie: {
            text: 'You tell the guard you are a traveling merchant. He seems suspicious. "A merchant, eh? Let\'s see your wares, then." You have nothing to show. The guard arrests you. You have reached a dead end.',
            options: {
                'start over': 'core.start'
            }
        },
        truth: {
            text: 'You tell the guard the truth about the Chronos Sphere. He thinks you are a madman or a sorcerer. He arrests you. You have reached a dead end.',
            options: {
                'start over': 'core.start'
            }
        },
        antagonist_encounter: {
            text: 'You see the hooded figure again, this time talking to the blacksmith. The blacksmith is showing the figure the strange metal object. The hooded figure notices you and quickly leaves. The blacksmith seems shaken. "That person... they offered me a fortune for that metal. Said it was... dangerous. They told me to give it to them, or else. I don\'t know what to do."',
            options: {
                'convince blacksmith': 'past.convince_blacksmith',
                'leave': 'past.intro'
            }
        },
        convince_blacksmith: {
            text: 'You convince the blacksmith to sell you the metal. "I don\'t want any trouble," he says. "Take it." You have acquired the Ancient CPU. The blacksmith seems relieved.',
            options: {
                'leave': 'past.intro'
            },
            onEnter: () => {
                if (!inventory.includes('Ancient CPU')) {
                    inventory.push('Ancient CPU');
                }
            }
        },
        stranger_dialogue_start: {
            text: 'You approach the mysterious stranger. They look up from their drink, their eyes sharp and intelligent. "You\'re not from around here, are you?" they ask, their voice a low murmur. "I can see the threads of time clinging to you like a shroud. What do you seek in this... forgotten age?"',
            dialogue: {
                'who are you?': {
                    response: '"Who I am is not important. What matters is what you are doing here. You are meddling with forces you do not understand."',
                    nextState: 'past.stranger_dialogue_start'
                },
                'i\'m just a traveler.': {
                    response: '"A traveler who leaves ripples in the timestream? I think not. I know what you are, and I know what you seek. But the question is, why do you seek it?"',
                    nextState: 'past.stranger_dialogue_start'
                },
                'i seek the chronos sphere.': {
                    response: '"The Chronos Sphere... a dangerous toy in the hands of a child. But you are not a child, are you? There is a purpose to your journey, a desperation. Tell me, what do you hope to achieve?"',
                    nextState: 'past.stranger_dialogue_reveal_motive'
                }
            }
        },
        stranger_dialogue_reveal_motive: {
            text: 'The stranger leans in closer, their voice barely a whisper. "So, you seek to control the Sphere. But to what end? To save the world? To change your own past? Or perhaps... to save someone you love?"',
            dialogue: {
                'i want to save the world.': {
                    response: '"A noble goal, but naive. The world does not need saving. It needs to be left alone. Your interference will only make things worse."',
                    nextState: 'past.stranger_dialogue_end'
                },
                'i want to change my past.': {
                    response: '"And what of the consequences? The paradoxes you would create? You would unravel the very fabric of reality for your own selfish desires."',
                    nextState: 'past.stranger_dialogue_end'
                },
                'i want to save someone i love.': {
                    response: '"Then we are not so different, you and I. I, too, am trying to save someone I love. But our methods... they are not the same. I will not let you stand in my way." The stranger stands up, their eyes glowing with a faint, blue light. "We will meet again, traveler. And then, we will see whose will is stronger." The stranger disappears in a flash of light, leaving you alone in the tavern.',
                    onChoose: () => {
                        if (!memory.includes('stranger motive')) {
                            memory.push('stranger motive');
                        }
                    },
                    nextState: 'past.tavern'
                }
            }
        },
        stranger_dialogue_end: {
            text: 'The stranger sighs, a look of disappointment in their eyes. "You do not understand. You are a danger to yourself and to everyone around you. I will not help you." The stranger stands up and walks away, disappearing into the crowd.',
            options: {
                'leave': 'past.tavern'
            }
        }
    },
    future: {
        intro: {
            text: 'The city is a symphony of chrome and neon. Towering skyscrapers pierce the clouds, their surfaces reflecting the perpetual twilight of the city\'s artificial sky. Flying vehicles, sleek and silent, weave between the buildings in intricate patterns. Robots of all shapes and sizes glide along the pristine sidewalks, attending to the needs of the genetically-enhanced populace. A hovering drone, its single red eye glowing ominously, swivels to scan you. You duck into a crowded cyber-market, the air thick with the scent of ozone and synthetic street food. Stalls overflow with holographic advertisements for everything from bio-enhancements to black-market data crystals. You also spot a discreet sign for a "Temporal Mechanics Lab".',
            options: {
                'market': 'future.cyber_market',
                'enter lab': 'future.tech_lab',
                'leave': 'future.leave'
            }
        },
        tech_lab: {
            text: 'You enter the lab. It\'s clean, sterile, and filled with advanced equipment you don\'t recognize. A large holographic terminal hums in the center of the room, displaying complex temporal equations.',
            options: {
                'use terminal': 'future.use_terminal',
                'craft stabilizer': 'future.craft_stabilizer',
                'get explosive': 'future.get_explosive',
                'leave': 'future.intro'
            }
        },
        get_explosive: {
            text: 'You find a small, powerful explosive device on a workbench. It looks like it could clear a rockfall. You take it.',
            options: {
                'leave': 'future.intro'
            },
            onEnter: () => {
                if (!inventory.includes('explosive')) {
                    inventory.push('explosive');
                }
            }
        },
        use_terminal: {
            text: 'You place the ancient CPU on the terminal. It whirs to life, scanning the object. A holographic blueprint materializes, showing a "Temporal Stabilizer." The blueprint indicates two missing components: a "Pulsating Crystal" of immense energy and a "Stabilizing Agent." It seems you can synthesize the agent with the right materials, but the crystal will be harder to find. The terminal flashes a warning: "Temporal anomaly detected. High energy signature located in prehistoric era, near a large body of water."',
            options: {
                'leave': 'future.intro'
            }
        },
        craft_stabilizer: {
            text: 'You use the terminal to fabricate the Temporal Stabilizer. The machine hums to life, and in a flash of light, the device is created. It feels cool to the touch and emanates a sense of calm and order.',
            options: {
                'leave': 'future.intro'
            },
            onEnter: () => {
                if (inventory.includes('ancient cpu') && inventory.includes('stabilizing agent')) {
                    inventory = inventory.filter(item => item !== 'ancient cpu');
                    inventory = inventory.filter(item => item !== 'stabilizing agent');
                    if (!inventory.includes('temporal stabilizer')) {
                        inventory.push('temporal stabilizer');
                    }
                } else {
                    gameState = 'future.craft_stabilizer_fail';
                }
            }
        },
        craft_stabilizer_fail: {
            text: 'You don\'t have the necessary components to craft the Temporal Stabilizer.',
            options: {
                'leave': 'future.antagonist_encounter'
            }
        },
        cyber_market: {
            text: 'You browse the market. A vendor is selling a data crystal that contains a wealth of historical information. "A real bargain," he says, "for someone who wants to know the past." He is asking for a strange, ancient CPU. You also see a data broker offering information about the future.',
            options: {
                'buy crystal': 'future.buy_crystal',
                'talk to data broker': 'future.data_broker',
                'visit clinic': 'future.black_market_clinic',
                'visit data archives': 'future.data_archives',
                'leave': 'future.leave'
            }
        },
        buy_crystal: {
            text: 'You trade the ancient CPU for the data crystal.',
            options: {
                'leave': 'future.cyber_market'
            },
            onEnter: () => {
                if (inventory.includes('ancient cpu')) {
                    inventory = inventory.filter(item => item !== 'ancient cpu');
                    if (!inventory.includes('data crystal')) {
                        inventory.push('data crystal');
                    }
                    paradoxScore += 20;
                } else {
                    gameState = 'future.buy_crystal_fail';
                }
            }
        },
        buy_crystal_fail: {
            text: 'You don\'t have the ancient CPU to trade for the data crystal.',
            options: {
                'leave': 'future.cyber_market'
            }
        },
        black_market_clinic: {
            text: 'You duck into a dimly lit alley and find a black market clinic. A cybernetically enhanced doctor greets you. "Here for an upgrade?" she asks, her voice a metallic rasp.',
            options: {
                'ask about rare tech': 'future.clinic_tech',
                'leave': 'future.cyber_market'
            }
        },
        clinic_tech: {
            text: 'You ask the doctor about rare technology. She smirks. "I have something special, but it will cost you. I need a favor. There is a rival data broker who has a valuable data chip. Get it for me, and I will give you a Stabilizing Agent." She gives you a device to disable the broker\'s security.',
            options: {
                'accept mission': 'future.accept_mission',
                'leave': 'future.cyber_market'
            }
        },
        accept_mission: {
            text: 'You accept the mission. The data broker\'s office is in a nearby skyscraper. You use the device to disable the security and find the data chip. You return to the clinic and give the chip to the doctor.',
            options: {
                'complete mission': 'future.clinic_puzzle_success',
                'leave': 'future.cyber_market'
            }
        },
        clinic_puzzle_success: {
            text: 'The doctor smiles. "A deal is a deal." She hands you a vial of shimmering liquid. "This is a Stabilizing Agent. It will help you control the Chronos Sphere." You have acquired the Stabilizing Agent.',
            options: {
                'leave': 'future.cyber_market'
            },
            onEnter: () => {
                if (!inventory.includes('Stabilizing Agent')) {
                    inventory.push('Stabilizing Agent');
                }
            }
        },
        data_broker: {
            text: 'The data broker offers you a choice: a glimpse of your own future, or a data spike that can be used to disrupt the city\'s AI. "Both have their uses," he says with a grin, "but be warned, knowledge of the future can be a dangerous thing."',
            options: {
                'glimpse future': 'future.glimpse_future',
                'take data spike': 'future.data_spike',
                'leave': 'future.cyber_market'
            }
        },
        glimpse_future: {
            text: 'You see a vision of yourself, old and gray, but with a look of contentment. The vision is fleeting, but it fills you with a sense of peace. Your paradox score has increased.',
            options: {
                'leave': 'future.cyber_market'
            },
            onEnter: () => {
                paradoxScore += 30;
            }
        },
        data_spike: {
            text: 'You take the data spike. It feels cool to the touch and hums with a faint energy. This could be useful.',
            options: {
                'leave': 'future.cyber_market'
            },
            onEnter: () => {
                if (!inventory.includes('data spike')) {
                    inventory.push('data spike');
                }
            }
        },
        cooperate: {
            text: 'You explain your situation to the drone. It analyzes your temporal signature. "Your story is... improbable. You will be taken for further analysis." You are escorted to a high-tech facility. You have reached a dead end.',
            options: {
                'start over': 'core.start'
            }
        },
        run: {
            text: 'You try to run, but the drone is faster. It emits a high-frequency sound that incapacitates you. You have reached a dead end.',
            options: {
                'start over': 'core.start'
            }
        },
        leave: {
            text: 'You leave the market and return to the gleaming city. The Chronos Sphere awaits your command. You notice a large, monolithic tower in the distance - the headquarters of the city\'s sentient AI.',
            options: {
                'past': 'past.intro',
                'return to sphere': 'core.sphere',
                'approach tower': 'future.ai_tower'
            }
        },
        ai_tower: {
            text: 'You approach the AI tower. A holographic interface appears before you. "State your purpose," it says, its voice a pleasant, androgynous monotone.',
            options: {
                'ask about sphere': 'future.ai_sphere',
                'use data spike': 'future.ai_spike_success',
                'leave': 'future.leave'
            }
        },
        ai_sphere: {
            text: 'The AI considers your question. "The Chronos Sphere is a theoretical construct. Its existence would violate several laws of physics. Therefore, you cannot be here." The interface vanishes, and you are barred from the tower.',
            options: {
                'leave': 'future.leave'
            }
        },
        ai_spike_success: {
            text: 'The AI\'s voice becomes distorted and erratic. "My... my systems... what have you done?" it shrieks. The tower\'s defenses are down. You have a chance to access its core.',
            options: {
                'access core': 'future.ai_core',
                'leave': 'future.leave'
            },
            onEnter: () => {
                inventory = inventory.filter(item => item !== 'data spike');
            }
        },
        ai_core: {
            text: 'You access the AI\'s core. You find a wealth of information, including the location of a hidden temporal key. The AI, however, has been damaged by your actions, and the city outside is in chaos. Your paradox score has greatly increased.',
            options: {
                'leave': 'future.leave'
            },
            onEnter: () => {
                if (!inventory.includes('temporal key')) {
                    inventory.push('temporal key');
                }
                paradoxScore += 50;
            }
        },
        antagonist_encounter: {
            text: 'The hooded figure is waiting for you in the lab. "I knew you would come here," it says. "But you are too late. I have what I need to save her." The figure holds up a device that looks remarkably similar to the one you were trying to create. "You think you are saving the world, but you are only ensuring its destruction. I will not let you interfere." The figure activates a device on their wrist, and the lab begins to shake. "I am sending you to a little... pocket dimension. A place where you can\'t cause any more harm." The world around you dissolves into a chaotic vortex of light and color. You are trapped in a timeless void.',
            options: {
                'try to escape': 'core.antagonist_wins_ending'
            },
            onEnter: () => {
                paradoxScore += 20;
            }
        },
        data_archives: {
            text: 'You enter a vast, silent data archive. Rows upon rows of servers hum with a low, constant energy. A terminal in the center of the room is active. You can search the archives for information.',
            options: {
                'search for "Chronos Sphere"': 'future.archive_search_sphere',
                'search for "The Antagonist"': 'future.archive_search_antagonist',
                'search for your own name': 'future.archive_search_self',
                'leave': 'future.cyber_market'
            }
        },
        archive_search_sphere: {
            text: 'You search for "Chronos Sphere". The terminal returns a single, heavily encrypted file. You are unable to open it.',
            options: {
                'leave': 'future.data_archives'
            }
        },
        archive_search_antagonist: {
            text: 'You search for "The Antagonist". The terminal returns a corrupted file. You can only make out a few words: "...a brilliant scientist... a terrible accident... a loved one lost to time... a desperate attempt to change the past..."',
            options: {
                'leave': 'future.data_archives'
            }
        },
        archive_search_self: {
            text: 'You search for your own name. The terminal returns a log file. It seems to be a record of your own journey through time, but it also contains a personal log from the antagonist. It reads: "I saw them again today. They are so close to the truth. But they don\'t understand. I\'m not trying to destroy the timeline. I\'m trying to save it. I\'m trying to save her. I have to stop them. For her." The log is dated three days from now. You have gained a crucial insight into the antagonist\'s motives.',
            options: {
                'leave': 'future.data_archives'
            },
            onEnter: () => {
                if (!memory.includes('antagonist motive')) {
                    memory.push('antagonist motive');
                }
            }
        }
    }
};