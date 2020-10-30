export const HIGHLIGHT_BLOCK    = 'HIGHLIGHT_BLOCK'
export const HIGHLIGHT_SENTENCE = 'HIGHLIGHT_SENTENCE'

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