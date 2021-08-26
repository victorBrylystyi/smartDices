
import { UNDO, REDO, FIXPOS, CLEAR } from "../actions/actionTypes";

export const undoRedoReducer = (reducer) => {

    const init = {
        past: [],
        present: reducer([],{}),
        future: []
    };

    const historyLimit = 40;

    return ((prevState= init, action) => {

        switch (action.type) {

            case UNDO:
                {
                    if (prevState.past.length === 0) return prevState;

                    if (prevState.future.length >= historyLimit){
                        console.warn ('App history limit reached!');
                        return prevState;
                    }

                    const nextState = JSON.parse(JSON.stringify(prevState));
    
                    nextState.future.unshift(nextState.present);
                    nextState.present = nextState.past.pop();

                    return nextState;
                }
                    
            case REDO:
                {
                    if (prevState.future.length === 0) return prevState;
                    if (prevState.past.length >= historyLimit){
                        console.warn ('App history limit reached!');
                        return prevState;
                    }

                    const nextState = JSON.parse(JSON.stringify(prevState));

                    nextState.past.push(nextState.present);
                    nextState.present = nextState.future.shift();

                    return nextState;
                }
            case CLEAR:
                {
                    if (prevState.future.length===0 && prevState.present.length===0)
                    return prevState;

                    return {
                        past: [],
                        present: reducer([],{}),
                        future: []
                    };
                }
            
            default: 
                {
                    const nextState = JSON.parse(JSON.stringify(prevState));
                    const newPresent = reducer(nextState.present, action);

                    if (newPresent === nextState.present) 
                    return prevState;

                    if (action.type === FIXPOS) {
                        nextState.present = newPresent;
                        return nextState;
                    }

                    nextState.past.push(nextState.present);
                    nextState.present = newPresent;
                    nextState.future = [];

                    return nextState;
                }
        };
    });
};



