var roleHarvester = {

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
        
    	    if(creep.carry.energy < creep.carryCapacity) {
                var sources = creep.pos.findClosestByPath(FIND_SOURCES, { filter: (structure) => { return structure.energy > 0; } });
                if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources);
                }
            }
            else {
                
                var targets = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_TOWER) &&
                                    structure.energy < structure.energyCapacity * 0.9;
                        }
                });
                
                if(targets == null)
                {
                    targets = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                            filter: (structure) => {
                                return (structure.structureType == STRUCTURE_EXTENSION ||
                                        structure.structureType == STRUCTURE_SPAWN ||
                                        structure.structureType == STRUCTURE_LINK) &&
                                        structure.energy < structure.energyCapacity;
                            }
                    });
                }
                if(targets == null)
                {
                    targets = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_STORAGE ||
                                    structure.structureType == STRUCTURE_CONTAINER) &&
                                    _.sum(structure.store) < structure.storeCapacity;
                            }
                    });
                }
                
                if(targets != null) {
                    if(creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets);
                    }
                }
                else
                {
                    targets = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_CONTROLLER);
                        }});
                    
                    if (targets != null)
                    {
                        creep.moveTo(targets);
                    }
                }
            }
        }
	}
};

module.exports = roleHarvester;