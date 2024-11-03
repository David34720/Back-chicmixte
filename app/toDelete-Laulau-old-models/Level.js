const client = require('../db/client');
const CoreModel = require('./CoreModel');

class Level extends CoreModel {
    static table = 'level';
    name;

    constructor(options) {
        super(options);

        this.name = options.name;
    }

    // * le mot clé static permet de court-circuiter le constructeur, on pourra donc se servir de la méthode findAll avec le nom de classe
    //

    // * Pour créer un level, on a besoin d'un name
    // * on veut insérer un nouveau level en BDD, on a un front avec un formulaire : ce formulaire va nous envoyer un name, la BDD va récupérer un requête :
    // * INSERT INTO level (name) VALUES ('name du level');
    static async create(name) {
        const query = {
            text: `INSERT INTO ${this.table} (name) VALUES ($1) RETURNING *;`,
            values: [name],
        };

        const result = await client.query(query);
        if (result.rows[0]) {
            return new this(result.rows[0]);
        }

        return null;
    }

    async update() {
        const query = {
            text: `UPDATE ${Level.table} SET name = $1, updated_at = $2 WHERE id = $3 RETURNING *`,
            values: [this.name, this.updated_at, this.id],
        };

        const result = await client.query(query);

        if (result.rows[0]) {
            return result.rows[0];
        }

        return null;
    }

    async destroy() {
        const query = {
            text: `DELETE FROM ${Level.table} WHERE id = $1`,
            values: [this.id],
        };

        await client.query(query);

        return null;
    }
}

module.exports = Level;
