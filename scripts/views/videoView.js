/*
    file:   videoView.js
    Auth:   Jesse Parnell
    Desc:   Main page for viewing camera recordings.
*/

define([
    "views/viewContainer",
    "views/eventList",
    "procedures/getConfig",
    "views/openZM",
], (viewContainer, eventList, getConfig, openZM) => {
    const videoView = () => {

        let browser = sig();
        browser.class = "col-lg-4 alfiosify";
        let elem = openZM();

        elem.event("change", () => {
            console.log("elem change!");
            getConfig().done((config) => {
                console.log("config:", config);
                let eventListDrpDwn = eventList(config.directories, config.ids, selFun);
                evntLstCtnr.addChild(eventListDrpDwn);

                evntLstCtnr.refresh();
            });
        });

        browser.addChild(elem);
        browser.css({
            "float": "right",
        });


        let optCtnr = sig();
        optCtnr.class = "col-lg-4";
        let evntLstCtnr = sig();
        evntLstCtnr.class = "col-lg-4 alfiosify";
        evntLstCtnr.text = "Select Event To Play:";
        evntLstCtnr.css({
            "float": "left",
        });
        optCtnr.addChild(evntLstCtnr);

        let selFun = (input) => {
            let viewer = arrdb.get("viewBox");
            viewer.src = input;
            viewer.refresh();
        };

        let mainLayout = sig();
        mainLayout.class = "container, col-sm-12";

        let header = sig();
        header.class = "row";

        let title = sig();
        title.text = "Bailys";
        title.class = "col-lg-4 col-sm-12 mx-auto alfiosify";
        title.css({
            "text-align": "center",
            "font-size": "60px",
        });

        header.addChild(title);

        let view = viewContainer();

        //Note: elements will display organized by their placement in the array.
        let arr = [header, optCtnr, browser, view];
        arr.map((obj) => {
            mainLayout.addChild(obj);
        });

        return mainLayout;
    };

    return videoView;
});