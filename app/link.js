const appPath = process.env.APP_PATH || '/';

export function linkTo(url) {
    if (url) {
        return appPath + url;
    }

    return appPath;
}
