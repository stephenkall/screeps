var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');

module.exports.loop = function () {
    
    var maxHarvesters = 3;
    var maxUpgraders = 3;
    var maxBuilders = 3;
    var maxRepairers = 3;

    /*var tower = Game.getObjectById('88fa06c1f96d6e43c2eaef78');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }*/

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

    if(harvesters.length < maxHarvesters) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'harvester'});
        if (newName.length > 2)
        {
            console.log('Spawning new harvester: ' + newName);
        }
    }
    else
    if(upgraders.length < maxUpgraders) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'upgrader'});
        if (newName.length > 2)
        {
            console.log('Spawning new upgrader: ' + newName);
        }
    }
    else
    if(builders.length < maxBuilders) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'builder'});
        if (newName.length > 2)
        {
            console.log('Spawning new builder: ' + newName);
        }
    }
    else
    if(repairers.length < maxRepairers) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'repairer'});
        if (newName.length > 2)
        {
            console.log('Spawning new repairer: ' + newName);
        }
    }
    
    //console.log('Harvesters: ' + harvesters.length);
    //console.log('Builders: '   + builders.length);
    //console.log('Upgraders: '  + upgraders.length);
    //console.log('Repairers: '  + upgraders.length);
    
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            if (_.filter(Game.creeps, (creep) => creep.memory.role == 'harvester') > maxHarvesters)
            {
                console.log('Suiciding harvester: ' + creep.name);
                creep.suicide();
            }
            else
            {
                roleHarvester.run(creep);
            }
        }
        if(creep.memory.role == 'upgrader') {
            if (_.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader') > maxUpgraders)
            {
                console.log('Suiciding upgrader: ' + creep.name);
                creep.suicide();
            }
            else
            {
                roleUpgrader.run(creep);
            }
        }
        if(creep.memory.role == 'builder') {
            if (_.filter(Game.creeps, (creep) => creep.memory.role == 'builder') > maxBuilders)
            {
                console.log('Suiciding builder: ' + creep.name);
                creep.suicide();
            }
            else
            {
                roleBuilder.run(creep);
            }
        }
        if(creep.memory.role == 'repairer') {
            if (_.filter(Game.creeps, (creep) => creep.memory.role == 'repairer') > maxRepairers)
            {
                console.log('Suiciding repairer: ' + creep.name);
                creep.suicide();
            }
            else
            {
                roleRepairer.run(creep);
            }
        }
        if(creep.memory.role == null) {
            console.log('Suiciding creep: ' + creep.name);
            creep.suicide();
        }
    }
}