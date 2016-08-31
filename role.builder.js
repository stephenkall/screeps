var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('harvesting');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        //creep.say('building');
	    }

	    if(creep.memory.building) {
	        var targets = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            if(targets != null) {
                if(creep.build(targets) == ERR_NOT_IN_RANGE) {
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
                    creep.memory.building = false;
                }
            }
	    }
	    else {
	        var sources = creep.pos.findClosestByPath(FIND_SOURCES);
            if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources);
            }
            
	    }
	    
	}
};

module.exports = roleBuilder;