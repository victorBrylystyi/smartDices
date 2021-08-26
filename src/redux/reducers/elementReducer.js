
import { ADD, COLOR, FIXPOS, REMOVE } from "../actions/actionTypes";
let ii = 0;

export const elementReducer =  (prevState = [], action) => {

    switch (action.type) {
        case ADD:
            {
                if (prevState.length>=6){
                    ii = 0;
                    return prevState;
                } 

                ii++;

                const nextState = [...prevState,{
                    text:'Dice '+ ii,
                    color: action.payload.color,
                    id: action.payload.id,
                    position: null,
                    quaternion: null
                }];

                return nextState;
            }
        case REMOVE:
            {
                const nextState = [...prevState];

                nextState.splice(nextState.findIndex(item => item.id === action.payload),1);

                return nextState;
            }
        case COLOR:
            {
                const nextState = JSON.parse(JSON.stringify(prevState));

                nextState[nextState.findIndex(item => item.id === action.payload.id)].color = action.payload.color;

                return nextState;
            }

        case FIXPOS:
            {
                const nextState = JSON.parse(JSON.stringify(prevState));

                action.payload.forEach( element => {
                    const index = nextState.findIndex(item => item.id === element.name);
                    nextState[index].position = element.position.slice();
                    nextState[index].quaternion = element.quaternion.slice();
                });

                return nextState;
            }
  
        default: return prevState;
    };

};