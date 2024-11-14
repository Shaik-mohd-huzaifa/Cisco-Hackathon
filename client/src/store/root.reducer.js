import { combineReducers } from "redux";
import { DetailsReducer } from "./details.reducer";
import { SummarizationReducer } from "./summarization.reducer";



export const RootReducer = combineReducers({
    detailsModule: DetailsReducer,
    Summary: SummarizationReducer
})