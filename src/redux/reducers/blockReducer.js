import { HIGHLIGHT_BLOCK } from "../actions";

export default function blockReducer(state={}, action) {
  console.log('HIGHLIGHT_BLOCK reducer called')

    switch(action.type) {
        case HIGHLIGHT_BLOCK: {
          let data = action.payload;

          return {
            ...state,
            sentence_id: data.sentence_id,
            sentence: data.sentence
          }
        }

        default: 
           return state;
     }
}

