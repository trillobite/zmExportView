/*
    File:   openZM.js
    Auth:   Jesse Parnell
    Desc:   Creates a jsonHTML object which opens the zoneminder .html file
            and generates a config, or list of file locations of each event.
*/

define(["procedures/genConfig"], (genConfig) => {
    const openZM = () => {

        // outputs the content of the text file

        /*<input type='file' accept='image/*' onchange='openFile(event)'><br>
        <img id='output'>*/

        let inputObj = sig("input", {
            id: "inputObj",
            type: "file",
            accept: "html/image/*", //can open images, html, and all.
        });


        return inputObj;
    };

    return openZM;
});