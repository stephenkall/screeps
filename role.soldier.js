var roleSoldier = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if (Memory.attacking == true)
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
            creep.moveTo(creep.room.controller);
        }
	}
};

module.exports = roleSoldier;