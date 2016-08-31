var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');

module.exports.loop = function () {
    
    var maxHarvesters = 1;
    var maxUpgraders = 1;
    var maxBuilders = 3;
    var maxRepairers = 1;

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
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'harvester'});
        console.log('Spawning new harvester: ' + newName);
    }
    else
    if(upgraders.length < maxUpgraders) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'upgrader'});
        console.log('Spawning new upgrader: ' + newName);
    }
    else
    if(builders.length < maxBuilders) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'builder'});
        console.log('Spawning new builder: ' + newName);
    }
    else
    if(repairers.length < maxRepairers) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'repairer'});
        console.log('Spawning new repairer: ' + newName);
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
                creep.suicide();
            }
            else
            {
                roleRepairer.run(creep);
            }
        }
        if(creep.memory.role == null) {
            creep.suicide();
        }
    }
}