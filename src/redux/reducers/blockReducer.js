import { HIGHLIGHT_BLOCK } from "../actions";

export default function blockReducer(state={}, action) {
    switch(action.type) {
        case HIGHLIGHT_BLOCK: {
          let data = action.payload;

          return {
            ...state,
            sentence_id: data.sentence_id,
            block_identifier: data.block_identifier,
            sentence: data.sentence
          }
        }

        default: 
           return state;
     }
}

