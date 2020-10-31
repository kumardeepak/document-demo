export const HIGHLIGHT_BLOCK    = 'HIGHLIGHT_BLOCK'
export const HIGHLIGHT_SENTENCE = 'HIGHLIGHT_SENTENCE'
export const CLEAR_HIGHLIGHT_BLOCK = 'CLEAR_HIGHLIGHT_BLOCK'

export function highlightBlock(sentence) {
    return {     
        type: HIGHLIGHT_BLOCK,
        payload: {
            sentence: sentence
        }
    }
}

export function highlightSentence(block) {
    return {
        type: HIGHLIGHT_SENTENCE,
        payload: {
            block: block
        }
    }
}

export function clearHighlighBlock() {
    return {
        type: CLEAR_HIGHLIGHT_BLOCK,
        payload: {
        }
    }
}