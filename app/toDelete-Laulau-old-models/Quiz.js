const CoreModel = require('./CoreModel');

class Quiz extends CoreModel {
    static table = 'quiz';
    title;
    description;
    user_id;

    constructor(options) {
        super(options);

        this.title = options.title;
        this.description = options.description;
        this.user_id = options.user_id;
    }
}

module.exports = Quiz;
