// We will use this anywhere we get an error
const ErrorHandler = (err, req, resp, next) => {
    const statuscode = resp.statusCode ? resp.statusCode : 500;
    resp.status(statuscode);

    resp.json({
        message: err.message,
        stack : process.env.NODE_ENV === 'deployment' ? err.stack : null
    })

};

module.exports = ErrorHandler;