class Gate {
    /**
     * Cette méthode retourne true si user possède une permission action, sinon false
     * @param {string} action
     * @param {object} user
     * @returns {boolean}
     */
    static allows(action, user) {
        let ok = false;
        const permissions = user.permissions;

        for (let i = 0; i < permissions.length; i++) {
            if (permissions[i].name === action) {
                ok = true;
                break;
            }
        }

        return ok;
    }
}

module.exports = { Gate };