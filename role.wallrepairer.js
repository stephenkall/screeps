var roleWallRepairer = {

    /** @param {Creep} creep **/
    run: function(creep){
        
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
    
    	    if(creep.memory.repairing && creep.carry.energy == 0) 
    	    {
                creep.memory.repairing = false;
                creep.say('harvesting');
    	    }
    	    if(!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) 
    	    {
    	        creep.memory.repairing = true;
    	        //creep.say('repairing');
    	    }
    
    	    if(creep.memory.repairing) {
    	        var lowTargets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_WALL) && 
                                   (structure.hits < structure.hitsMax * 0.9);
                        }
                });
                var targets;
                
                if (lowTargets != null && lowTargets.length > 0)
                {
                    if (creep.memory.target != null && Game.getObjectById(creep.memory.target).hits == Game.getObjectById(creep.memory.target).hitsMax)
                    {
                        creep.memory.target = null;   
                    }
                    
                    if (creep.memory.target == null )
                    {
                        
                        lowTargets.sort(compareStructures);
                        creep.memory.target = (lowTargets[0].id);
                    }
                    
                    if(creep.repair(Game.getObjectById(creep.memory.target)) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(Game.getObjectById(creep.memory.target));
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
                        creep.memory.repairing = false;
                    }
                }
    	        /*
    	        var targets = creep.pos.findClosestByPath(FIND_STRUCTURES, {
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
                if(targets != null) {
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
                */
    	    }
    	    else {
    	        creep.memory.target = null;
    	        var sources = creep.pos.findClosestByPath(FIND_SOURCES, { filter: (structure) => { return structure.energy > 0; } });
                if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources);
                }
    	    }
        }
	}
};

function compareStructures(a,b)
{
    return a.hits/a.hitsMax - b.hits/b.hitsMax;
}
    
module.exports = roleWallRepairer;