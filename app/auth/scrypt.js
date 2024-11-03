const { scryptSync, timingSafeEqual, randomBytes } = require('node:crypto');

class Scrypt {
    static hash(password) {
        // ! se souvenir du concept de sel : le sel à rendre les hash uniques
        const salt = randomBytes(16).toString('hex');

        const buffer = scryptSync(password, salt, 64, {
            N: 131072,
            maxmem: 134220800,
        });

        return `${buffer.toString('hex')}.${salt}`;
    }

    /**
     *
     * @param {string} plainTextPassword le mot de passe en clair du login form
     * @param {string} hash le hash que l'on a en BDD
     * @returns
     */
    static compare(plainTextPassword, hash) {
        const [hashedPassword, salt] = hash.split('.');

        const hashedPasswordBuffer = Buffer.from(hashedPassword, 'hex');

        const clearPasswordBuffer = scryptSync(plainTextPassword, salt, 64, {
            N: 131072,
            maxmem: 134220800,
        });

        return timingSafeEqual(hashedPasswordBuffer, clearPasswordBuffer);
    }
}

module.exports = { Scrypt };
