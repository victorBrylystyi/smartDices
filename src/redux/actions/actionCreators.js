import { ADD, COLOR, REMOVE, UNDO, REDO, FIXPOS, CLEAR } from "./actionTypes"

const add = payload => {
    return {
        type: ADD,
        payload
    };
};

const remove = payload => {
    return {
        type: REMOVE,
        payload
    };
};

const changeColor = payload => {
    return {
        type: COLOR,
        payload
    };
};

const undo = payload => {
    return {
        type: UNDO,
        payload
    };
};

const redo = payload => {
    return {
        type: REDO,
        payload
    };
};

const fixPosition = payload => {
    return {
        type: FIXPOS,
        payload
    }
};

const clearScene = payload => {
    return {
        type: CLEAR,
        payload
    }
};



export { add, remove, changeColor, undo, redo, fixPosition, clearScene };
