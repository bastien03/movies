var appPath = process.env.APP_PATH || '/';

module.exports = function (url) {
    if (url) {
        return appPath + url;
    }

    return appPath;
};
