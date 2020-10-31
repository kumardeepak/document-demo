import { MERGE_SENTENCE_STARTED, MERGE_SENTENCE_INPROGRESS, MERGE_SENTENCE_FINISHED } from "../actions";

export default function sentenceMergeReducer(state={started: false, progress: false, finished: false, sentences:[]}, action){
    switch(action.type) {
        case MERGE_SENTENCE_STARTED: {
          let data      = action.payload;
          let sentence  = data.sentence;
          return {
              ...state,
            //   sentences:state.sentences.push(sentence),
              started: true,
              progress: true
          }
        }
        case MERGE_SENTENCE_INPROGRESS: {
            let data      = action.payload;
            let sentence  = data.sentence;
            return {
                ...state,
                // sentences:state.sentences.push(sentence),
                progress: true
            }
          }

        case MERGE_SENTENCE_FINISHED: {
            let data      = action.payload;
            let sentence  = data.sentence;
            return {
                ...state,
                progress: false,
                finished: true
            }
        }

        default: 
           return state;
     }
}
