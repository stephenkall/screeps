var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');

module.exports.loop = function () {
    
    var maxHarvesters = 5;
    var maxUpgraders = 5;
    var maxBuilders = 2;
    var maxRepairers = 10;

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
    
    var hostiles = Game.rooms.E21S58.find(FIND_HOSTILE_CREEPS);
    
    if(hostiles.length > 0) {
        var username = hostiles[0].owner.username;
        Game.notify(`User ${username} spotted in room ${roomName}`);
        var towers = Game.rooms[roomName].find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
        towers.forEach(tower => tower.attack(hostiles[0]));
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

    if(harvesters.length < maxHarvesters) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, {role: 'harvester'});
        if (newName.length > 2)
        {
            console.log('Spawning new harvester: ' + newName);
        }
    }
    else
    if(upgraders.length < maxUpgraders) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, {role: 'upgrader'});
        if (newName.length > 2)
        {
            console.log('Spawning new upgrader: ' + newName);
        }
    }
    else
    if(builders.length < maxBuilders) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, {role: 'builder'});
        if (newName.length > 2)
        {
            console.log('Spawning new builder: ' + newName);
        }
    }
    else
    if(repairers.length < maxRepairers) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, {role: 'repairer'});
        if (newName.length > 2)
        {
            console.log('Spawning new repairer: ' + newName);
        }
    }
    
    harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    upgraders  = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    builders   = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    repairers  = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    //console.log('Harvesters: ' + harvesters.length);
    //console.log('Builders: '   + builders.length);
    //console.log('Upgraders: '  + upgraders.length);
    //console.log('Repairers: '  + upgraders.length);
    
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            if (harvesters.length > maxHarvesters)
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
            if (upgraders.length > maxUpgraders)
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
            if (builders.length > maxBuilders)
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
            if (repairers.length > maxRepairers)
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

