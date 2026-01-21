const gameData = {
    start: {
        text: 'You find yourself in a sterile, white room. A single pedestal stands in the center, upon which rests a pulsating, crystalline sphere. A voice echoes in your mind: "The Chronos Sphere is your key and your prison. To escape, you must navigate the currents of time. But be warned, another traveler is lost in time. They will try to stop you, twisting the past to their own design. Do not let them." A faint, feminine whisper echoes in your mind as the voice fades: "He lies..."',
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
        text: 'The air is thick with humidity and the smell of ozone. You stand in a lush, prehistoric jungle. Towering ferns and strange, colossal flowers surround you. In the distance, a volcano spews a plume of smoke into the sky. A deep, guttural roar echoes through the trees, a chilling reminder that you are not alone. You see a narrow path winding through the jungle, a steep cliff face, a murky swamp, a strange metallic glint in the distance and a strange clearing.',
        options: {
            'jungle path': 'jungle_path',
            'cliff face': 'cliff_face',
            'swamp': 'swamp',
            'investigate glint': 'crashed_ship',
            'strange clearing': 'strange_clearing',
            'return to sphere': 'sphere'
        }
    },
    strange_clearing: {
        text: 'You find a strange clearing in the jungle. In the center of the clearing, a strange symbol is carved into the ground. It seems to be a star map, but the constellations are all wrong. You also see a strange, hooded figure watching you from the edge of the clearing. The figure disappears into the jungle before you can get a closer look.',
        options: {
            'remember symbol': 'remember_symbol',
            'leave': 'dino_era_intro'
        }
    },
    remember_symbol: {
        text: 'You commit the strange symbol to memory. It feels important.',
        options: {
            'leave': 'dino_era_intro'
        },
        onEnter: () => {
            memory.push('symbol');
        }
    },
    antagonist_encounter: {
        text: 'As you are about to leave the clearing, the hooded figure reappears. "You are not supposed to be here," it says, its voice a distorted whisper. "I will not let you interfere with my plans." The figure raises a hand, and you feel a sharp pain in your head. The world around you begins to fade. You have been sent back to the sphere.',
        options: {
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
        text: 'You enter the ship. The console displays a sequence of three alien symbols. A keypad below the screen shows the same symbols. It seems to be a simple pattern-matching puzzle. The symbols are: Zorp, Gleep, Floop. Below the symbols, there is a slot to insert a memory.',
        options: {
            'press zorp gleep floop': 'ship_puzzle_no_memory',
            'use memory': () => {
                if (memory.includes('symbol')) {
                    return 'ship_puzzle_with_memory';
                } else {
                    return 'ship_puzzle_no_memory';
                }
            },
            'leave': 'dino_era_intro'
        }
    },
    ship_puzzle_no_memory: {
        text: 'You press the symbols in the correct order. The console beeps, but nothing happens. It seems to be missing a component.',
        options: {
            'leave': 'dino_era_intro'
        }
    },
    ship_puzzle_with_memory: {
        text: 'You insert the memory of the strange symbol into the console. The console whirs to life, and the alien symbols on the screen begin to glow. You press the symbols in the correct order. The console beeps and a small compartment opens, revealing a small, intricate device. You have acquired the Ancient CPU.',
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
        text: 'You enter the swamp. The air is thick with the smell of decay. Strange, glowing fungi illuminate the murky water. In the middle of a deep pool, a half-submerged skeleton of a massive creature rests. In one of its eye sockets, you spot a faint, pulsating light. Sturdy vines hang from the trees overhead.',
        options: {
            'use vines': 'swing_to_skeleton',
            'swim': 'swim_fail',
            'leave': 'dino_era_intro'
        }
    },
    swing_to_skeleton: {
        text: 'You grab a thick vine and swing out over the murky water. You land silently on the creature\'s massive skull, right next to the glowing crystal.',
        options: {
            'take crystal': 'crystal_acquired',
            'leave': 'dino_era_intro'
        }
    },
    crystal_acquired: {
        text: 'You carefully pry the Pulsating Crystal from the eye socket. It hums with a powerful energy. You now have a key component for the Temporal Stabilizer. You swing back to solid ground.',
        options: {
            'leave': 'dino_era_intro'
        }
    },
    swim_fail: {
        text: 'You try to swim across, but the moment you enter the water, a large, unseen creature pulls you under. You have reached a dead end.',
        options: {
            'start over': 'start'
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
            'ask about synthesis': 'alchemist_synthesis',
            'leave': 'past_intro'
        }
    },
    alchemist_synthesis: {
        text: 'You ask about synthesis. The alchemist\'s eyes gleam with interest. "Ah, you are interested in the higher arts. I can create a powerful Stabilizing Agent, but I require a potent energy source and a catalyst. The Temporal Dust I gave you can serve as the catalyst, but you will need to find an energy source on your own."',
        options: {
            'synthesize agent': 'synthesize_agent',
            'leave': 'alchemist_shop'
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
        text: 'You ask the blacksmith about rare metals. He shows you a strange, intricate metal object with geometric patterns etched into its surface. "Found this in a crater," he says. "It\'s harder than any steel I\'ve ever seen, and it hums with a faint warmth. You can have it for a price."',
        options: {
            'buy cpu': 'buy_cpu',
            'leave': 'past_intro'
        }
    },
    future_intro: {
        text: 'The city is a symphony of chrome and neon. Towering skyscrapers pierce the clouds, their surfaces reflecting the perpetual twilight of the city\'s artificial sky. Flying vehicles, sleek and silent, weave between the buildings in intricate patterns. Robots of all shapes and sizes glide along the pristine sidewalks, attending to the needs of the genetically-enhanced populace. A hovering drone, its single red eye glowing ominously, swivels to scan you. You duck into a crowded cyber-market, the air thick with the scent of ozone and synthetic street food. Stalls overflow with holographic advertisements for everything from bio-enhancements to black-market data crystals. You also spot a discreet sign for a "Temporal Mechanics Lab".',
        options: {
            'market': 'cyber_market',
            'enter lab': 'tech_lab',
            'leave': 'future_leave'
        }
    },
    tech_lab: {
        text: 'You enter the lab. It\'s clean, sterile, and filled with advanced equipment you don\'t recognize. A large holographic terminal hums in the center of the room, displaying complex temporal equations.',
        options: {
            'use terminal': 'use_terminal',
            'craft stabilizer': 'craft_stabilizer',
            'leave': 'future_intro'
        }
    },
    use_terminal: {
        text: 'You place the ancient CPU on the terminal. It whirs to life, scanning the object. A holographic blueprint materializes, showing a "Temporal Stabilizer." The blueprint indicates two missing components: a "Pulsating Crystal" of immense energy and a "Stabilizing Agent." It seems you can synthesize the agent with the right materials, but the crystal will be harder to find. The terminal flashes a warning: "Temporal anomaly detected. High energy signature located in prehistoric era, near a large body of water."',
        options: {
            'leave': 'future_intro'
        }
    },
    cyber_market: {
        text: 'You browse the market. A vendor is selling a data crystal that contains a wealth of historical information. "A real bargain," he says, "for someone who wants to know the past." He is asking for a strange, ancient CPU. You also see a data broker offering information about the future.',
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
    master_of_time_ending: {
        text: 'You insert the key into the pedestal. The Temporal Stabilizer in your inventory activates, humming with a powerful energy. The Chronos Sphere resonates with the device, and the room dissolves into a breathtaking vista of the entire timeline. You see the past, present, and future laid out before you, not as a chaotic mess, but as a beautiful, intricate tapestry. You have not only escaped, but you have become a master of time, a guardian of the timeline. You are free to go anywhere, anywhen.',
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
    paradox_ending: {
        text: 'The world around you shatters into a million crystalline fragments. Your meddling with time has created a paradox that has unraveled reality itself. You are lost in the void between moments.',
        options: {
            'start over': 'start'
        }
    }
};
