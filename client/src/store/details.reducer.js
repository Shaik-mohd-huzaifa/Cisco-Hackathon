

const inital_state = {
    detailsModuleOpen: false,
    details: {}
}

export const ToggleDetailsModule = (payload) => {
    return {
        type: "update/@detailsmodule",
        payload: payload
    }
}

export const UpdateDetails = (payload) => {
    return {
        type: "update/@details",
        payload: payload
    }
}

export const DetailsReducer = (state = inital_state, action) => {
    const {type, payload} = action

    if(type == "update/@detailsmodule"){
        return {
            ...state,
            detailsModuleOpen: payload 
        }
    }else if(type == "update/@details"){
        return {
            ...state,
            details: payload
        }
    }

    return state
}

export const detailsSelector = (state) => state.detailsModule.detailsModuleOpen
export const detailsContentSelector = (state) => state.detailsModule.details