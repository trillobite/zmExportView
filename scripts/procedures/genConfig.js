/*
    File:   genConfig.js
    Auth:   Jesse Parnell
    Desc:   Reads the zoneminder .html files, and generates a config
            for viewing with this viewer.
*/

define([], () => {

    const genConfig = (htmlMaster) => {
        let dfd = $.Deferred();

        const clean = (arr) => {
            let nwArr = [];
            arr.map((obj) => {
                if (obj.indexOf(".html")) {
                    nwArr.push(obj);
                }
            });
            return nwArr;
        };

        const getDirs = (arr) => {
            let dirArr = [];
            arr.map((obj) => {
                let indxL = obj.indexOf("(") + 2;
                let indxR = obj.indexOf(")") - 1;
                let extracted = obj.substring(indxL, indxR);
                dirArr.push(extracted);
            });
            return dirArr;
        };

        //execute before clean!
        //<a href=\"javascript:switchevent('23/19/01/01/01/02/12/zmEventImages.html');\">1952923</a></div>\n\t\t\t\t
        const getIDs = (arr) => {
            let idArr = [];
            arr.map((obj) => {
                let key0 = '">';
                let key1 = "</a>";
                let indxL = obj.indexOf(key0) + key0.length;
                let indxR = obj.indexOf(key1);
                let pt = obj.substring(indxL, indxR);
                idArr.push(pt);
            });
            return idArr;
        };

        //'zmEventImagesMaster_20190108_112132.html'
        fetch(htmlMaster)
            .then(response => response.text())
            .then((text) => {
                let tmp = text.substring(text.indexOf("<h2> All </h2>") + 14, text.length);
                tmp = tmp.substring(0, tmp.indexOf("<div class='tab_content'") - 8);
                tmp = tmp.split("<div>");
                console.log("before clean:", tmp);
                let idArr = getIDs(tmp);
                tmp = clean(tmp);
                let dirArr = getDirs(tmp);
                let retVal = {
                    directories: dirArr,
                    ids: idArr,
                };
                console.log("done:", retVal);
                dfd.resolve(retVal);
            });

        return dfd.promise();
    };

    return genConfig;
});