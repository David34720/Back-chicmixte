const client = require('../db/client');
const CoreModel = require('./CoreModel');

class User extends CoreModel {
    static table = 'user';
    firstname;
    lastname;
    email;
    #password;

    constructor(options) {
        super(options);

        this.firstname = options.firstname;
        this.lastname = options.lastname;
        this.email = options.email;
        // * on se sert du mutateur, ça ne créé pas de nouvelle prop
        this.password = options.password;
    }

    get fullname() {
        return this.firstname + ' ' + this.lastname;
    }

    get fullnameReversed() {
        return this.lastname + ' ' + this.firstname;
    }

    get password() {
        return this.#password;
    }

    set password(value) {
        if (typeof value != 'string') {
            throw new Error('Un truc horrible est arrivé');
        }

        this.#password = value;
    }

    static async findByEmail(mail) {
        const queryByMail = {
            text: `SELECT * FROM "${this.table}" WHERE email = $1;`,
            values: [mail],
        };

        const result = await client.query(queryByMail);

        if (result.rows.length) {
            const users = [];
            for (let row of result.rows) {
                const user = new this(row);
                users.push(user);
            }

            return users;
        }

        return null;
    }

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

    async update() {
        const query = {
            text: `UPDATE "${User.table}" SET firstname = $1, lastname = $2, email = $3, password = $4 , updated_at = CURRENT_TIMESTAMP WHERE id = $5 RETURNING *`,
            values: [
                this.firstname,
                this.lastname,
                this.email,
                this.password,
                this.id,
            ],
        };

        const result = await client.query(query);

        if (result.rows[0]) {
            return result.rows[0];
        }

        return null;
    }

    async destroy() {
        const query = {
            text: `DELETE FROM "${User.table}" WHERE id = $1`,
            values: [this.id],
        };

        await client.query(query);

        return null;
    }

    resetPassword(data) {
        this.#password = data.password;
    }
}

module.exports = User;
