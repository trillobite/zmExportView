/*
    File:   getConfig.js
    Auth:   Jesse Parnell
    Desc:   Reads the config file, and returns the name of the zoneminder
            main html file.
*/


define([], () => {
    const getConfig = (configName) => {
        let dfd = $.Deferred();

        //'zmEventImagesMaster_20190108_112132.html'
        fetch(configName)
            .then(response => response.text())
            .then((text) => {
                dfd.resolve(text);
            });

        return dfd.promise();
    };

    return getConfig;
});