const responseNotFound = (res) => {
    return res.status(404).json({
        success: false,
        message: 'Not Found'
    });
};

const responseSuccess = (res, results, message) => {
    return res.status(200).json({
        success: true,
        message: message,
        data: results
    })
}

module.exports = {
    responseNotFound,
    responseSuccess
}