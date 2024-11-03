const CoreModel = require('./CoreModel');

class Question extends CoreModel {
    description;
    wiki;
    anecdote;
    quiz_id;
    answer_id;
    level_id;

    constructor(options) {
        super(options);

        this.description = options.description;
        this.wiki = options.wiki;
        this.anecdote = options.anecdote;
        this.quiz_id = options.quiz_id;
        this.answer_id = options.answer_id;
        this.level_id = options.level_id;
    }
}

module.exports = Question;
