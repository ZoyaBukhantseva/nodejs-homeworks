const errorMessages = {
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    409: "Conflict"
}

const HttpError = (status, message = errorMessages[status]) => {
    const error = new Error(message);
    error.status = status;
    return error;
}

module.exports = HttpError;

/*
const HttpError = (status, msg = errMess[status]) => {
    const err = new Error(msg);
    err.status = status;
    return err;
}

module.exports = HttpError;
 */