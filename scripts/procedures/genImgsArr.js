/*
    File:   genImgsArr.js
    Auth:   Jesse Parnell
    Desc:   Takes the array of directories from genConfig.js, and will
            extract all of the paths to each image for video playback.
            Currently, this function is not being used, it was written
            and discovered that there was a simpler method to achieve
            the same goal. Work and code has been preserved here for any
            future projects which may require gathering each image for
            every recording.
*/


define([], () => {
    const genImgsArr = (dirArr) => {

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

            return getImgArr(dirArr);
    }

    return genImgsArr;
});