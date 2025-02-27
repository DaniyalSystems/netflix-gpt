import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
    name: "config",
    initialState: {
        lang: "en"
    },
    reducers: {
        changeLang: (state, action) => {
            state.lang = action.payload
        },
        defaultLang: (state, action) => {
            state.lang = 'en'
        }
    }
});

export const {changeLang, defaultLang} = configSlice.actions;

export default configSlice.reducer;