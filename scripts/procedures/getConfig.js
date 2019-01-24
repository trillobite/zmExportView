/*
    File:   getConfig.js
    Auth:   Jesse Parnell
    Desc:   Uses genConfig, pulls in file from the open file dialog.
*/

define(["procedures/genConfig"], (genConfig) => {
    const getConfig = () => {
        let dfd = $.Deferred();

        const genURL = (uri, fakepath) => {
            let key = "fakepath";
            let indx = fakepath.indexOf(key) + key.length + 1;
            let urix = uri.substring(0, uri.indexOf("viewer"));
            let flNm = fakepath.substring(indx, fakepath.length);
            return urix + flNm;
        }

        let docURI = $("#inputObj").context.documentURI;
        let fakePath = $("#inputObj").val();
        let url = genURL(docURI, fakePath);

        console.log("getConfig:", url);

        genConfig(url).done((config) => {
            dfd.resolve(config);
        });

        return dfd.promise();
    }

    return getConfig;
});