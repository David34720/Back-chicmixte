const client = require('../db/client');

// * Cette classe ne fait que regrouper les éléments qui sont en commun à chaque modèles
// * On ne s'en sert que pour mettre enplace de l'héritage
// * On peut dire que c'est une classe abstraite
class CoreModel {
    static table;
    #id;
    created_at;
    updated_at;

    constructor(options) {
        this.#id = options.id;
        this.created_at = options.created_at;
        this.updated_at = options.updated_at;
    }

    get id() {
        return this.#id;
    }

    static async findAll() {
        const query = `SELECT * FROM "${this.table}";`;

        const result = await client.query(query);

        if (result.rows.length) {
            const data = [];

            for (let row of result.rows) {
                const instance = new this(row);

                data.push(instance);
            }

            return data;
        }

        return null;
    }

    static async findOne(id) {
        const query = `SELECT * FROM "${this.table}" WHERE id = $1`;

        const result = await client.query(query, [id]);

        if (result.rows.length) {
            return new this(result.rows[0]);
        }

        return null;
    }

    // * TODO : rendre cette requête dynamique, afin de pouvoir en hériter dans tous les modèles, faire la même chose pour update
    static async create(options) {
        const query = {
            text: `INSERT INTO "${this.table}" (firstname, lastname, email, password) VALUES ($1, $2, $3, $4 ) RETURNING *;`,
            values: [
                options.firstname,
                options.lastname,
                options.email,
                options.password,
            ],
        };

        const result = await client.query(query);

        if (result.rows[0]) {
            return new this(result.rows[0]);
        }

        return null;
    }
}

module.exports = CoreModel;
