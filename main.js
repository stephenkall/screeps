var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleSoldier = require('role.soldier');

module.exports.loop = function ()
{
    var maxHarvesters = 1;
    var maxUpgraders = 1;
    var maxBuilders = 1;
    var maxRepairers = 1;
    var bodyParts = [WORK,CARRY,MOVE];
    var soldierBodyParts = [TOUGH,ATTACK,MOVE];
    var curLevel = Game.spawns.Spawn1.room.controller.level;

    switch(curLevel)
    {
        case 1:
            maxHarvesters = 2;
            maxUpgraders = 2;
            maxBuilders = 1;
            maxRepairers = 1;
            bodyParts = [WORK,CARRY,MOVE];
            soldierBodyParts = [TOUGH,ATTACK,MOVE];
            break;
            
        case 2:
            maxHarvesters = 3;
            maxUpgraders = 4;
            maxBuilders = 5;
            maxRepairers = 5;            
            bodyParts = [ATTACK,WORK,CARRY,MOVE];
            soldierBodyParts = [TOUGH,TOUGH,ATTACK,MOVE];
            break;
            
        case 3:
            maxHarvesters = 5;
            maxUpgraders = 4;
            maxBuilders = 5;
            maxRepairers = 15;
            bodyParts = [TOUGH,ATTACK,WORK,WORK,CARRY,MOVE];
            soldierBodyParts = [TOUGH,TOUGH,ATTACK,RANGED_ATTACK,MOVE];
            break;
            
        default:
            maxHarvesters = 6;
            maxUpgraders = 5;
            maxBuilders = 10;
            maxRepairers = 20;
            bodyParts = [TOUGH,ATTACK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE];
            soldierBodyParts = [TOUGH,TOUGH,TOUGH,ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE];
            break;
    }



    var hostiles = Game.spawns.Spawn1.room.find(FIND_HOSTILE_CREEPS);
    
    if(hostiles.length > 0) {
        Memory.attacking = true;
        var newName = Game.spawns['Spawn1'].createCreep(soldierBodyParts, undefined, {role: 'soldier', lvl: curLevel});
        if (newName.length > 2)
        {
            console.log('Spawning new soldier: ' + newName + ', level: ' + curLevel);
        }
        //Memory.hostiles = hostiles;
        var username = hostiles[0].owner.username;
        //Game.notify('User ${username} spotted in room ${roomName}');
        Game.notify('User "' + username + '" spotted in room');
        var towers = Game.spawns.Spawn1.room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
        towers.forEach(tower => tower.attack(hostiles[0]));
    }
    else
    {
        Memory.attacking = false;
        //Memory.hostiles = null;
        //var tower = Game.getObjectById('88fa06c1f96d6e43c2eaef78');
        var towers = Game.spawns.Spawn1.room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
        if (towers != null)
        {
            towers.forEach((tower) =>
            {
                if(tower)
                {
                    var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, { filter: (structure) => structure.hits < structure.hitsMax });
                    if(closestDamagedStructure)
                    {
                        tower.repair(closestDamagedStructure);
                    }
                }
            });
        }
    }

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgraders  = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builders   = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var repairers  = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    var soldiers   = _.filter(Game.creeps, (creep) => creep.memory.role == 'soldier');

    if(harvesters.length < maxHarvesters) {
        if (harvesters == 0) // Fresh start (all creeps dead)
        {
            var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'harvester', lvl: 1});
            if (newName.length > 2)
            {
                console.log('Spawning new harvester: ' + newName + ', level: 1');
            }           
        }
        else
        {
            var newName = Game.spawns['Spawn1'].createCreep(bodyParts, undefined, {role: 'harvester', lvl: curLevel});
            if (newName.length > 2)
            {
                console.log('Spawning new harvester: ' + newName + ', level: ' + curLevel);
            }
        }
    }
    else
    if(upgraders.length < maxUpgraders) {
        var newName = Game.spawns['Spawn1'].createCreep(bodyParts, undefined, {role: 'upgrader', lvl: curLevel});
        if (newName.length > 2)
        {
            console.log('Spawning new upgrader: ' + newName + ', level: ' + curLevel);
        }
    }
    else
    if(builders.length < maxBuilders)
    {
        var buildingTargets = Game.spawns['Spawn1'].pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
        if (buildingTargets != null)
        {
            var newName = Game.spawns['Spawn1'].createCreep(bodyParts, undefined, {role: 'builder', lvl: curLevel});
            if (newName.length > 2)
            {
                console.log('Spawning new builder: ' + newName + ', level: ' + curLevel);
            }
        }
    }
    else
    if(repairers.length < maxRepairers) {
        var newName = Game.spawns['Spawn1'].createCreep(bodyParts, undefined, {role: 'repairer', lvl: curLevel});
        if (newName.length > 2)
        {
            console.log('Spawning new repairer: ' + newName + ', level: ' + curLevel);
        }
    }

    //console.log('Harvesters: ' + harvesters.length);
    //console.log('Builders: '   + builders.length);
    //console.log('Upgraders: '  + upgraders.length);
    //console.log('Repairers: '  + upgraders.length);
    
    for(var name in Game.creeps) {

        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        var upgraders  = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        var builders   = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        var repairers  = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
        var soldiers   = _.filter(Game.creeps, (creep) => creep.memory.role == 'soldier');
        
        var creep = Game.creeps[name];
        
        if(creep.memory.role == 'soldier')
        {
            roleSoldier.run(creep);
        }
        
        if(creep.memory.role == 'harvester')
        {
            if (harvesters.length > maxHarvesters && harvesters.length > 1)
            {
                console.log('Suiciding harvester: ' + creep.name + ', level: ' + creep.memory.lvl + '. Amount: ' + harvesters.length + '/' + maxHarvesters);
                creep.suicide();
            }
            else
            {
                roleHarvester.run(creep);
            }
        }
        
        if(creep.memory.role == 'upgrader')
        {

            if (upgraders.length > maxUpgraders)
            {
                console.log('Suiciding upgrader: ' + creep.name + ', level: ' + creep.memory.lvl + '. Amount: ' + upgraders.length + '/' + maxUpgraders);
                creep.suicide();
            }
            else
            {
                roleUpgrader.run(creep);
            }
        }
        
        if(creep.memory.role == 'builder')
        {

            if (builders.length > maxBuilders)
            {
                console.log('Suiciding builder: ' + creep.name + ', level: ' + creep.memory.lvl + '. Amount: ' + builders.length + '/' + maxBuilders);
                creep.suicide();
            }
            else
            {
                roleBuilder.run(creep);
            }
        }
        
        if(creep.memory.role == 'repairer')
        {

            if (repairers.length > maxRepairers)
            {
                console.log('Suiciding repairer: ' + creep.name + ', level: ' + creep.memory.lvl + '. Amount: ' + repairers.length + '/' + maxRepairers);
                creep.suicide();
            }
            else
            {
                roleRepairer.run(creep);
            }
        }
        
        if(creep.memory.role == null) {
            console.log('Suiciding creep with no role: ' + creep.name);
            creep.suicide();
        }
    }
}
