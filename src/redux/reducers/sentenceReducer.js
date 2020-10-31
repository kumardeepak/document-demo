import { HIGHLIGHT_SENTENCE } from "../actions";

export default function sentenceReducer(state={}, action){
    switch(action.type) {
        case HIGHLIGHT_SENTENCE: {
          let data = action.payload;
          console.log(data)
          return {
            ...state,
            sentence_id: data.block.sentence_id,
           
          }
        }
        

        default: 
           return state;
     }
}
