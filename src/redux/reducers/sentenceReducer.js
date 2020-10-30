import { HIGHLIGHT_SENTENCE } from "../actions";

export default function sentenceReducer(state={}, action){
    switch(action.type) {
        case HIGHLIGHT_SENTENCE: {
          let data = action.payload;
          
          return {

          }
        }

        default: 
           return state;
     }
}
