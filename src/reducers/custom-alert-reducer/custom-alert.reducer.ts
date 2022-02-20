import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CustomAlertToggleState = {
  show: boolean;
  message?: string;
};

const initialState: CustomAlertToggleState = {
  show: false,
};

export const customAlert = createSlice({
  name: 'customAlert',
  initialState,
  reducers: {
    onToggleCustomAlert: (state, action: PayloadAction<CustomAlertToggleState>) => {
      const { message, show} = action.payload;
      state.message = message || 'Something bad happened.';
      state.show = show
    },
  },
});

// Action creators are generated for each case reducer function
export const { onToggleCustomAlert } = customAlert.actions;

export default customAlert;
