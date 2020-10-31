import { MERGE_SENTENCE_STARTED, MERGE_SENTENCE_INPROGRESS, MERGE_SENTENCE_FINISHED, MERGE_SENTENCE_CANCEL } from "../actions";

export default function sentenceMergeReducer(state={started: false, progress: false, finished: false, cancel: false, sentences:[]}, action){
    switch(action.type) {
        case MERGE_SENTENCE_STARTED: {
          let data      = action.payload;
          return {
              ...state,
              started: true,
              progress: true
          }
        }
        case MERGE_SENTENCE_INPROGRESS: {
            let data      = action.payload;
            let sentences = state.sentences;
            sentences.push(data.sentence)
            return {
                ...state,
                sentences: sentences,
                progress: true
            }
          }

        case MERGE_SENTENCE_FINISHED: {
            let data      = action.payload;
            return {
                ...state,
                progress: false,
                finished: true
            }
        }

        case MERGE_SENTENCE_CANCEL: {
            let data      = action.payload;
            return {
                ...state,
                started: false,
                sentences: [],
                progress: false,
                finished: true,
                cancel: true
            }
        }

        default: 
           return state;
     }
}
