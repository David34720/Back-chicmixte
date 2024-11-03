const client = require('../db/client');
const Level = require('../models/Level');

const dataMapper = {
    async getLevels() {
        const query = 'SELECT * FROM level';

        const result = await client.query(query);

        // * Si on a des résultats
        if (result.rows) {
            // * On créé un tableau
            const levels = [];

            // * On se sert de chaque objet retourné par pg pour instancier la classe Level
            for (let row of result.rows) {
                const level = new Level(row);
                // * On envoie l'instance fraichement créée dans notre tableau
                levels.push(level);
            }

            // * On retourne un tableau d'instance de Level
            return levels;
        }

        return null;
    },

    async getOneLevel(id) {
        // const query = {
        //     text: 'SELECT * FROM level WHERE id = $1',
        //     values: [id],
        // };

        // const result = await client.query(query);

        const query = 'SELECT * FROM level WHERE id = $1';

        const result = await client.query(query, [id]);

        if (result.rows[0]) {
            return new Level(result.rows[0]);
        }

        return null;
    },
};

module.exports = dataMapper;
