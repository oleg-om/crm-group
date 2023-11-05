import { createSlice } from '@reduxjs/toolkit';
import { ETheme } from '@enums/theme';

interface InitialStateProps {
    mode: ETheme;
}

const initialState: InitialStateProps = {
    mode: (localStorage.getItem('theme') as ETheme) || ETheme.LIGHT,
};

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        switchTheme: (state, action) => {
            localStorage.setItem('theme', action.payload);
            return { mode: action.payload };
        },
    },
});

export const { switchTheme } = themeSlice.actions;

export default themeSlice.reducer;
