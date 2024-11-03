module.exports = (controllerMethod) => {
    return async function (req, res, next) {
        try {
            await controllerMethod(req, res, next);
        } catch (error) {
            
            next(error);
        }
    };
};