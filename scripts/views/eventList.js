
/*
    File:   eventList.js
    Auth:   Jesse Parnell
    Desc:   Creates a place where events can be listed, clicked on
            and played on the video viewer iframe.
*/

define([], () => {
    const eventList = (dirArr, idArr, eventFunc) => {
        console.log("dirArr:", dirArr);
        console.log("idArr:", idArr);

        let select = sig("select");
        select.id = "eventList";
        select.event("change", () => {
            let tmp = $("#" + select.id).val();
            eventFunc(tmp);
        });

        for(let i = 0; i < dirArr.length; ++i) {
            let option = sig("option");
            option.id = "eventListOption" + i; //set an id because we can... and it's free.
            option.text = idArr[i]; //set the text to the event id.
            option.value = dirArr[i]; //set the value to the directory path.
            select.addChild(option);
        }

        return select;
    };

    return eventList;
});