/*
    file:   viewContainer.js
    Auth:   Jesse Parnell
    Desc:   This is where the image view actually happens.
*/

define([], () => {
    const viewContainer = () => {

        let container = sig();
        viewContainer.class= "row";

        let viewBox = sig("iframe");
        viewBox.id = "viewBox";
        viewBox.class= "col-lg-12";
        viewBox.css({ //default size
            "width": "100%",
            "min-height": "1280px",
            "border": "1px solid gray",
            "border-radius": "3px",
        });

        container.addChild(viewBox);

        return container;
    }

    return viewContainer;
});