import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Color {
  name: string;
  hex_code: string;
}

interface ColorsState {
  colors: Color[];
  history: Color[][];
  historyIndex: number;
}

const initialState: ColorsState = {
  colors: [],
  history: [],
  historyIndex: -1,
};

const colorsSlice = createSlice({
  name: 'colors',
  initialState,
  reducers: {
    setColors: (state, action: PayloadAction<Color[]>) => {
        state.colors = action.payload;
        if (state.historyIndex === state.history.length - 1) {
          state.history.push(action.payload);
        } else {
          state.history = state.history.slice(0, state.historyIndex + 1);
          state.history.push(action.payload);
        }
        state.historyIndex = state.history.length - 1;
      },
      
      addColor: (state, action: PayloadAction<Color>) => {
        const newColors = [...state.colors, action.payload];
        state.colors = newColors;
        if (state.historyIndex === state.history.length - 1) {
          state.history.push(newColors);
        } else {
          state.history = state.history.slice(0, state.historyIndex + 1);
          state.history.push(newColors);
        }
        state.historyIndex += 1;
      },
    removeColor: (state, action: PayloadAction<number>) => {
      const newColors = state.colors.filter((_, index) => index !== action.payload);
      state.colors = newColors;
      state.history.push(newColors);
      state.historyIndex += 1;
    },
    undo: (state) => {
      if (state.historyIndex > 0) {
        state.historyIndex -= 1;
        state.colors = state.history[state.historyIndex];
      }
    },
    redo: (state) => {
      if (state.historyIndex < state.history.length - 1) {
        state.historyIndex += 1;
        state.colors = state.history[state.historyIndex];
      }
    },
  },
});

export const {setColors, addColor, removeColor, undo, redo } = colorsSlice.actions;

export default colorsSlice.reducer;
