const CoreModel = require('./CoreModel');

class QuizHasTag extends CoreModel {
    quiz_id;
    tag_id;

    constructor(options) {
        super(options);

        this.quiz_id = options.quiz_id;
        this.tag_id = options.tag_id;
    }
}

module.exports = QuizHasTag;
