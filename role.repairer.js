var roleRepairer = {

    /** @param {Creep} creep **/
    run: function(creep){

	    if(creep.memory.repairing && creep.carry.energy == 0) {
            creep.memory.repairing = false;
            creep.say('harvesting');
	    }
	    if(!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.repairing = true;
	        //creep.say('repairing');
	    }

	    if(creep.memory.repairing) {
	        var lowTargets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER ||
                                structure.structureType == STRUCTURE_STORAGE ||
                                structure.structureType == STRUCTURE_CONTAINER ||
                                structure.structureType == STRUCTURE_WALL ||
                                structure.structureType == STRUCTURE_RAMPART ||
                                structure.structureType == STRUCTURE_ROAD) && 
                               (structure.hits < structure.hitsMax * 0.9);
                    }
            });
            var targets;
            if (lowTargets != null)
            {
                
                lowTargets.sort(compareStructures);
                
                targets = lowTargets[0];
                
                if(creep.repair(targets) == ERR_NOT_IN_RANGE) {
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
                    creep.memory.repairing = false;
                }
            }
	    }
	    else {
	        var sources = creep.pos.findClosestByPath(FIND_SOURCES, { filter: (structure) => { return structure.energy > 0; } });
            if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources);
            }
	    }
	}
};

function compareStructures(a,b)
{
    return a.hits/a.hitsMax - b.hits/b.hitsMax;
}
    
module.exports = roleRepairer;