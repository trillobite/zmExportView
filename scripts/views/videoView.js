/*
    file:   videoView.js
    Auth:   Jesse Parnell
    Desc:   Main page for viewing camera recordings.
*/

define(["views/mediaButtons", "views/viewContainer"], (mediaButtons, viewContainer) => {
    const videoView = () => {
        let mainLayout = sig();
        mainLayout.class= "container";

        let header = sig();
        header.class = "row";

        let title = sig();
        title.text = "Bailys";
        title.class= "col-lg-4 col-sm-12 mx-auto";

        header.addChild(title);

        let view = viewContainer();

        let controlsContainer = mediaButtons();

        let arr = [header, view, controlsContainer];
        arr.map((obj) => {
            mainLayout.addChild(obj);
        });

        return mainLayout;
    };

    return videoView;
});