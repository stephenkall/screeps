var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if (Memory.attacking == true && _.filter(creep.body, function(bp){return bp.type == ATTACK;}).length > 0 && _.filter(creep.room.find(FIND_MY_CREEPS), function(cp){return cp.memory.role == 'soldier';}).length == 0)
        {
            var hostiles = creep.room.find(FIND_HOSTILE_CREEPS);
            if (hostiles != null)
            {
                if (creep.attack(hostiles[0]) == ERR_NOT_IN_RANGE)
                {
                    creep.moveTo(hostiles[0]);
                    if (creep.saying != null)
                    {
                        creep.say('attacking ' + hostiles[0].name);
                    }
                }
            }
        }
        else
        {
            if(creep.memory.upgrading && creep.carry.energy == 0)
            {
                creep.memory.upgrading = false;
                creep.say('harvesting');
    	    }
    	    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity)
    	    {
    	        creep.memory.upgrading = true;
    	        creep.say('upgrading');
    	    }
    
    	    if(creep.memory.upgrading) 
    	    {
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE)
                {
                    creep.moveTo(creep.room.controller);
                }
            }
            else
            {
                var sources = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_LINK) &&
                                    structure.energy > 0;
                            }
                    });
                //if (sources == null)
                {
                    sources = creep.pos.findClosestByPath(FIND_SOURCES, { filter: (structure) => { return structure.energy > 0; } });
                }
                if(creep.harvest(sources) == ERR_NOT_IN_RANGE)
                {
                    creep.moveTo(sources);
                }
                creep.memory.upgrading = false;
            }
        }
	}
};

module.exports = roleUpgrader;