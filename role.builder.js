var roleBuilder = {

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
    	    if(creep.memory.building && creep.carry.energy == 0)
    	    {
                creep.memory.building = false;
                creep.say('harvesting');
    	    }
    	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity)
    	    {
    	        creep.memory.building = true;
    	        //creep.say('building');
    	    }
    
    	    if(creep.memory.building) {
    	        var targets = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_TOWER ||
                                    structure.structureType == STRUCTURE_WALL ||
                                    structure.structureType == STRUCTURE_RAMPART);
                        }
                });
                if(targets != null) {
                    if(creep.build(targets) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets);
                    }
                }
                else
                {
                    targets = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
                        
                    if(targets != null) {
                        if(creep.build(targets) == ERR_NOT_IN_RANGE) {
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
                            creep.memory.building = false;
                        }
                    }
                }
    	    }
    	    else {
    	        //Game.spawns.Spawn1.pos.findClosestByPath(FIND_SOURCES, { filter: (structure) => { return structure.energy > 0; } });
    	        //var sources = creep.pos.findClosestByPath(FIND_SOURCES);
    	        var sources = creep.pos.findClosestByPath(FIND_SOURCES, { filter: (structure) => { return structure.energy > 0; } });
                if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources);
                }
                
    	    }
        }
	    
	}
};

module.exports = roleBuilder;