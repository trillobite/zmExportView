/*
    File:   genConfig.js
    Auth:   Jesse Parnell
    Desc:   Reads the zoneminder .html files, and generates a config
            for viewing with this viewer.
*/

define([], () => {
    const genConfig = () => {

        //tmp.substring(tmp.indexOf("<div>"), tmp.indexOf("</div>"))

        // outputs the content of the text file

        /*<input type='file' accept='image/*' onchange='openFile(event)'><br>
        <img id='output'>
        <script>
        var openFile = function(event) {
            var input = event.target;

            var reader = new FileReader();
            reader.onload = function(){
            var dataURL = reader.result;
            var output = document.getElementById('output');
            output.src = dataURL;
            };
            reader.readAsDataURL(input.files[0]);
        };
        </script>*/

        let inputObj = sig("input", {
            type: "file",
            accept: "image/*",
        })

        let extractDirs = () => {
            let dfd = $.Deferred();

            let clean = (arr) => {
                let nwArr = [];
                arr.map((obj) => {
                    if (obj.indexOf(".html")) {
                        nwArr.push(obj);
                    }
                });
                return nwArr;
            };

            let getDirs = (arr) => {
                let dirArr = [];
                arr.map((obj) => {
                    let indxL = obj.indexOf("('") + 1;
                    let indxR = obj.indexOf(")") - 1;
                    let extracted = obj.substring(indxL, indxR);
                    dirArr.push(extracted);
                });
                return dirArr;
            };

            fetch('zmEventImagesMaster_20190108_112132.html')
                .then(response => response.text())
                .then((text) => {
                    let tmp = text.substring(text.indexOf("<h2> All </h2>") + 14, text.length);
                    tmp = tmp.substring(0, tmp.indexOf("<div class='tab_content'") - 8);
                    tmp = tmp.split("<div>");
                    tmp = clean(tmp);
                    console.log(getDirs(tmp));
                    dfd.resolve(getDirs(tmp));
                });
            
            return dfd.promise();
        };



    };

    return genConfig;
});