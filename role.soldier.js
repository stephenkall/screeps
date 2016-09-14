var roleSoldier = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if (Memory.attacking == true)
        {
            var hostiles = creep.room.find(FIND_HOSTILE_CREEPS);
            if (hostiles != null)
            {
                if (_.filter(creep.body, function(bp){return bp.type == RANGED_ATTACK;}).length > 0)
                {
                    if (creep.rangedAttack(hostiles[0]) == ERR_NOT_IN_RANGE)
                    {
                        creep.moveTo(hostiles[0]);
                        if (creep.saying == null)
                        {
                            creep.say('ranged attacking ' + hostiles[0].name);
                        }
                    }
                }
                else
                {
                    if (creep.attack(hostiles[0]) == ERR_NOT_IN_RANGE)
                    {
                        creep.moveTo(hostiles[0]);
                        if (creep.saying == null)
                        {
                            creep.say('attacking ' + hostiles[0].name);
                        }
                    }
                }
            }
        }
        else
        {
            creep.moveTo(creep.room.controller);
        }
	}
};

module.exports = roleSoldier;