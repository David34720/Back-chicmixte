module.exports = (req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    // * On en profit pour enregistrer l'erreur dans log erreur
    // * Quand on appelle next avec un argument, express lève une erreur
    next(error);
}