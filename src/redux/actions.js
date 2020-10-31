export const HIGHLIGHT_BLOCK            = 'HIGHLIGHT_BLOCK'
export const HIGHLIGHT_SENTENCE         = 'HIGHLIGHT_SENTENCE'
export const MERGE_SENTENCE_STARTED     = 'MERGE_SENTENCE_STARTED'
export const MERGE_SENTENCE_INPROGRESS  = 'MERGE_SENTENCE_INPROGRESS'
export const MERGE_SENTENCE_FINISHED    = 'MERGE_SENTENCE_FINISHED'
export const MERGE_SENTENCE_CANCEL      = 'MERGE_SENTENCE_CANCEL'

export function highlightBlock(sentence) {
    return {     
        type: HIGHLIGHT_BLOCK,
        payload: {
            sentence: sentence
        }
    }
}

export function highlightSentence(block_id, sentence) {
    return {
        type: HIGHLIGHT_SENTENCE,
        payload: {
            block_id: block_id,
            sentence: sentence
        }
    }
}

/**
 * sentence merge related user action
 */
export function startMergeSentence() {
    return {
        type: MERGE_SENTENCE_STARTED,
        payload: {
        }
    }
}

export function inProgressMergeSentence(sentence) {
    return {
        type: MERGE_SENTENCE_INPROGRESS,
        payload: {
            sentence: sentence
        }
    }
}

export function finishMergeSentence() {
    return {
        type: MERGE_SENTENCE_FINISHED,
        payload: {
            
        }
    }
}

export function cancelMergeSentence() {
    return {
        type: MERGE_SENTENCE_CANCEL,
        payload: {
        }
    }
}