module.exports = (error, req, res, next) => {
    let status = 500;


    if (error.status) {
        status = error.status;
    }

    res.status(status).render('error', {
        error: error.message,
        stack: error.stack,
        status: status,
        notification: null
    });
}