import { HIGHLIGHT_BLOCK , CLEAR_HIGHLIGHT_BLOCK } from "../actions";

export default function blockReducer(state={}, action) {
    switch(action.type) {
        case HIGHLIGHT_BLOCK: {
          let data = action.payload;
          return {
            ...state,
            block_identifier: data.sentence.block_identifier
            
          }
        }

        case CLEAR_HIGHLIGHT_BLOCK: {
          let data = action.payload;
          console.log(data)
          return {
            ...state,
            block_identifier: "",
           
          }
        }

        default: 
           return state;
     }
}

