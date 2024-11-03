const CoreModel = require('./CoreModel');

class Answer extends CoreModel {
    description;
    question_id;
    constructor(options) {
        super(options);

        this.description = options.description;
        this.question_id = options.question_id;
    }
}

module.exports = Answer;
