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

        let extractEventDirs = () => {
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
                    let indxL = obj.indexOf("(") + 2;
                    let indxR = obj.indexOf(")") - 1;
                    let extracted = obj.substring(indxL, indxR);
                    dirArr.push(extracted);
                });
                return dirArr;
            };

            let fetchImgArr = (obj) => {
                let dfd = $.Deferred();
                fetch(obj)
                    .then(response => response.text())
                    .then((text) => {
                        let key = "variableslide";
                        let indx = text.indexOf(key) + key.length; //only get the list of images.
                        let tmp = text.substring(indx, text.length);

                        let indxL = tmp.indexOf("[") + 1; //we don't want to include the bracket.
                        let indxR = tmp.indexOf("]") - 1; //we don't want to include the bracket.
                        tmp = tmp.substring(indxL, indxR);
                        let imgLst = "";
                        tmp.split('"').map((fragment) => { //get rid of the quotes.
                            imgLst += fragment; //combine the fragments....
                        });
                        let imgArr = imgLst.split(",");
                        //console.log(imgArr);
                        dfd.resolve(imgArr);
                    })

                return dfd.promise();
            }

            let getImgArr = (arr) => {
                let imgsArr = [];

                let recursive = (obj) => {
                    fetchImgArr(obj).done((imgArr) => {
                        let nwImgArr = [];
                        imgArr.map((imgNmStr) => {
                            let dirImgStr = obj.substring(0, obj.indexOf("zmEvent"))
                            nwImgArr.push(dirImgStr + imgNmStr);
                        });
                        imgsArr.push(nwImgArr);
                        call(); //now that were done, call for another.
                    });
                };

                let call = () => {
                    let val = arr.shift();
                    if(val) { //don't do anything if there is no value.
                        recursive(val);
                    } else {
                        if(arr.length) {
                            call(); //call again if objects are left.
                        }
                    }
                };

                call(); //it would help if I would call the function that starts the recursive loop... this took me 1.5hrs... why won't the loop start... i thought... omg...
                //console.log("imgsArr:", imgsArr);

                return imgsArr;
            };

            fetch('zmEventImagesMaster_20190108_112132.html')
                .then(response => response.text())
                .then((text) => {
                    let tmp = text.substring(text.indexOf("<h2> All </h2>") + 14, text.length);
                    tmp = tmp.substring(0, tmp.indexOf("<div class='tab_content'") - 8);
                    tmp = tmp.split("<div>");
                    tmp = clean(tmp);
                    let dirArr = getDirs(tmp);
                    let imgArr = getImgArr(dirArr);
                    console.log("done:", imgArr);
                    dfd.resolve(imgArr);
                });

            return dfd.promise();
        };



    };

    return genConfig;
});