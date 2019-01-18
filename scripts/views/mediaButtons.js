/*
    file:   mediaButtons.js
    Auth:   Jesse Parnell
    Desc:   This is the main file that generates the
            media player buttons to play the video files.
*/


define([], () => {
    const mediaButtons = () => {

        const mediaBtnCSS = {
            "cursor": "pointer",
            "border": "1px solid black",
            "border-radius": "5px",
            "margin": "10px",
            "min-width": "80px",
            "text-align": "center",
        };

        let mediaContainer = sig();
        mediaContainer.class = "row";

        //play
        let play = sig();
        play.id = "play";
        play.text = "play";
        play.css(mediaBtnCSS);
        play.css({
            "background-color": "green",
        });

        //pause
        let pause = sig();
        pause.id = "pause";
        pause.text = "pause";
        pause.css(mediaBtnCSS);
        pause.css({
            "background-color": "gray",
        });

        //rewind
        let rewind = sig();
        rewind.id = "rewind";
        rewind.text = "rewind";
        rewind.css(mediaBtnCSS);
        rewind.css({
            "background-color": "orange",
        });

        //stop
        let stop = sig();
        stop.id = "stop";
        stop.text = "stop";
        stop.css(mediaBtnCSS);
        stop.css({
            "background-color": "red",
        });

        let arr = [play, pause, rewind, stop];
        arr.map((obj) => {
            mediaContainer.addChild(obj);
        });

        return mediaContainer;
    };

    return mediaButtons;
});