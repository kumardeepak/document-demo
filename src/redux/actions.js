export const HIGHLIGHT_BLOCK            = 'HIGHLIGHT_BLOCK'
export const HIGHLIGHT_SENTENCE         = 'HIGHLIGHT_SENTENCE'
export const MERGE_SENTENCE_STARTED     = 'MERGE_SENTENCE_STARTED'
export const MERGE_SENTENCE_INPROGRESS  = 'MERGE_SENTENCE_INPROGRESS'
export const MERGE_SENTENCE_FINISHED    = 'MERGE_SENTENCE_FINISHED'

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

export function startMergeSentence(sentence) {
    return {
        type: MERGE_SENTENCE_STARTED,
        payload: {
            sentence: sentence
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

export function finishMergeSentence(sentence) {
    return {
        type: MERGE_SENTENCE_FINISHED,
        payload: {
            sentence: sentence
        }
    }
}