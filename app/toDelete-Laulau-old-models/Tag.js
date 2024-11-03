const CoreModel = require('./CoreModel');

class Tag extends CoreModel {
    static table = 'tag';
    name;

    constructor(options) {
        super(options);

        this.name = options.name;
    }
}

module.exports = Tag;
