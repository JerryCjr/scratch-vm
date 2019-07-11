module.exports = {
    analyze: function (url) {
        const markIndex = url.indexOf('?');
        const APP_PROTOCOL = /^app:\/\//;
        let name = '';
        const params = {};
        if (APP_PROTOCOL.test(url)) {
            if (markIndex > -1) {
                const PATH_REG = /app:\/\/(\S*)\?+/;
                name = url.match(PATH_REG)[1];
                const PARAMS_REG = /(?!(?:(\?|&)))(\w+)=(\w+)/g;
                const group = url.match(PARAMS_REG);
                if (group && group.length) {
                    group.forEach(element => {
                        const separatorIndex = element.indexOf('=');
                        if (separatorIndex > -1) {
                            const key = element.slice(0, separatorIndex);
                            const value = element.slice(separatorIndex + 1, element.length);
                            params[key] = value;
                        }
                    });
                }
            } else {
                const PATH_REG = /app:\/\//;
                name = url.replace(PATH_REG, '');
            }
            return {
                name,
                params
            };
        }
    }
};
