import { configureStore } from '@reduxjs/toolkit';
import { customAlertSlice } from 'features/custom-alert-slice/custom-alert.slice';

export const store = configureStore({
  reducer: {
    customAlertSlice: customAlertSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
