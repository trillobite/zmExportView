/*
    File:   stack.js
    Auth:   Jesse Parnell
    Desc:   Creates a stack of images of a specified size
            in order to pre-buffer required images from source.
*/


define([], () => {
    const stack = () => {

        //first in, last out.
        let filo = [];

        return {
            insert: (input) => {
                filo.push(input);
            },
            pop: () => {
                return filo.shift();
            },
        }
    }

    return stack;
});