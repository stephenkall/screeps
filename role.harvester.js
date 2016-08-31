var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.pos.findClosestByPath(FIND_SOURCES);
            if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources);
            }
        }
        else {
            var targets = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER ||
                                structure.structureType == STRUCTURE_STORAGE ||
                                structure.structureType == STRUCTURE_CONTAINER) && structure.energy < structure.energyCapacity;
                    }
            });
            if(targets != null) {
                if(creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets);
                }
            }
            else
            {
                targets = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_SPAWN);
                    }});
                
                if (targets != null)
                {
                    creep.moveTo(targets);
                }
            }
        }
	}
};

module.exports = roleHarvester;