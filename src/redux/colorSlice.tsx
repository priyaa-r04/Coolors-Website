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
    initColors: (state, action: PayloadAction<Color[]>) => {
      state.colors = action.payload;
      state.history = [action.payload];  
      state.historyIndex = 0;  
    },

    setColors: (state, action: PayloadAction<Color[]>) => {
      const newColors = action.payload;
      state.colors = newColors;

      if (state.historyIndex === state.history.length - 1) {
        state.history.push(newColors); 
      } else {
        state.history = state.history.slice(0, state.historyIndex + 1);
        state.history.push(newColors);
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
      
      state.historyIndex = state.history.length - 1; 
    },

    removeColor: (state, action: PayloadAction<number>) => {
      const newColors = state.colors.filter((_, index) => index !== action.payload);
      state.colors = newColors;

      if (state.historyIndex === state.history.length - 1) {
        state.history.push(newColors);
      } else {
        state.history = state.history.slice(0, state.historyIndex + 1);
        state.history.push(newColors);
      }

      state.historyIndex = state.history.length - 1;  
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

export const selectCanUndo = (state: { colors: ColorsState }) => state.colors.historyIndex > 0;
export const selectCanRedo = (state: { colors: ColorsState }) => state.colors.historyIndex < state.colors.history.length - 1;


export const {
  initColors,
  setColors,
  addColor,
  removeColor,
  undo,
  redo,
} = colorsSlice.actions;

export default colorsSlice.reducer;
