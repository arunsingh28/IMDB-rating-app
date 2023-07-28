import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Loading {
    isLoad: boolean
}
const initialState: Loading = {
    isLoad: true
}


const loadingSlice = createSlice({
    name: 'Search Slice',
    initialState,
    reducers: {
        changeLoadingState: (state: Loading, action: PayloadAction<Loading>) => {
            state.isLoad = action.payload.isLoad
        }
    }
})


export const { changeLoadingState } = loadingSlice.actions
export default loadingSlice.reducer