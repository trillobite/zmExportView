/*
    file:   videoView.js
    Auth:   Jesse Parnell
    Desc:   Main page for viewing camera recordings.
*/

define([
    "views/viewContainer",
    "views/eventList",
    "procedures/genConfig"
], (viewContainer, eventList, genConfig) => {
    const videoView = () => {

        let optCtnr = sig();
        optCtnr.class = "col-lg-12";
        let evntLstCtnr= sig();
        evntLstCtnr.class = "col-lg-2 col-md-4";
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

        genConfig("zmEventImagesMaster_20190108_112132.html").done((config) => {
            let eventListDrpDwn = eventList(config.directories, config.ids, selFun);
            evntLstCtnr.addChild(eventListDrpDwn);

            evntLstCtnr.refresh();
        });

        let mainLayout = sig();
        mainLayout.class = "container, col-sm-12";

        let header = sig();
        header.class = "row";

        let title = sig();
        title.text = "Bailys";
        title.class = "col-lg-4 col-sm-12 mx-auto";

        header.addChild(title);

        let view = viewContainer();

        //Note: elements will display organized by their placement in the array.
        let arr = [header, optCtnr, view];
        arr.map((obj) => {
            mainLayout.addChild(obj);
        });

        return mainLayout;
    };

    return videoView;
});