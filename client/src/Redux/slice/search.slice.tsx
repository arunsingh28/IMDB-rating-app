import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Search {
    text: string
}
const initialState: Search = {
    text: ''
}


const seachSlice = createSlice({
    name: 'Search Slice',
    initialState,
    reducers: {
        changeSeach: (state: Search, action: PayloadAction<Search>) => {
            state.text = action.payload.text
        }
    }
})


export const { changeSeach } = seachSlice.actions
export default seachSlice.reducer