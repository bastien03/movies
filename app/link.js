module.exports = function (url) {
    var appPath = process.env.APP_PATH || '/';

    if (url) {
        return appPath + url;
    }

    return appPath;
};
