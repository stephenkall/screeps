# stephenkall's screeps ai
My [screeps.com](http://www.screeps.com/) AI, started from scratch.

## Features
###So far, the script already DOES:
- Harvesting energy
- Upgrading controllers
- Repairing structures
- Building structures
- Spawning creeps
- Defending against invaders
- Suiciding creeps that are not used anymore
- Memory cleaning
- Calling creeps to Militia when soldiers are dead
- Tweaking body parts based on controller level
- Modular, role-based creep controlling
- Priority based repairing (repairing structures with lowest hitPoints / totalHitPoints ratio first)

###The script still DOES NOT do:
- Gathering dead body parts from the ground
- Auto placing construction sites
- Invading other rooms
- Soldier patrolling
- Mining
- Market operations
- Everything else

###Working in progress:
- [x] Tweaking body parts based on total energy accumulated in extensions / containers
- [ ] Controlling more than one room

##Usage
If you play screeps by your browser, manually create every role regarding the filenames in this repository, and then copy-paste the contents of every file I provided to the corresponding role file in your [screeps.com](http://www.screeps.com/) code repository.
If you play through steam, just place all the files in your %APPDATA%\..\Local\Screeps\scripts\screeps.com\<YourScriptsDir> folder (I suggest you create one separate branch not to lose any development you might have already done).