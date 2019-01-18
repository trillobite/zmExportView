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

        let optionsContainer = sig();
        optionsContainer.class = "col-lg-12";

        let selFun = (input) => {
            let viewer = arrdb.get("viewBox");
            viewer.src = input;
            viewer.refresh();
            /*viewer.refresh().state.done(() => {
                let iframeBox = document.getElementById("viewBox");
                let strHeight = iframeBox.contentWindow.slideheight;
                console.log("strHeight", strHeight);
                let cssHeight = (parseInt(strHeight.substring(0, strHeight.length - 2)) + 200).toString() + "px";
                viewer.css({
                    "height": cssHeight,
                });
            });*/
        };

        let genConfigPromise = genConfig("zmEventImagesMaster_20190108_112132.html");
        genConfigPromise.done((config) => {
            let eventListContainer = sig();
            eventListContainer.class = "col-lg-2 col-md-4";
            let eventListDrpDwn = eventList(config.directories, config.ids, selFun);
            eventListContainer.addChild(eventListDrpDwn);

            optionsContainer.addChild(eventListContainer);
            optionsContainer.refresh();
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
        let arr = [header, optionsContainer, view];
        arr.map((obj) => {
            mainLayout.addChild(obj);
        });

        return mainLayout;
    };

    return videoView;
});