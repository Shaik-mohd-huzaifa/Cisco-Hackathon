const Inital_state = {
    summary:{},
    summaryToggle: false
}

export const UpdateSummary = (payload) => {
    return {
        type: "update/@summary",
        payload: payload   
    }
}

export const ToggleSummaryModal = (payload) => {
    return {
        type: "toggle/@summary",
        payload: payload
    }
}

export const SummarizationReducer = (state = Inital_state, action) => {
    const {type, payload} = action
    if(type == "update/@summary"){
        console.log(payload)
        return {
            ...state,
            summary: payload,
        }
    }else if(type == "toggle/@summary"){
        return {
            ...state,
            summaryToggle: payload
        }
    }

    return state
}

export const SummarySelector = (state) => state.Summary.summary;

export const SummaryToggleSelector = (state) => state.Summary.summaryToggle;