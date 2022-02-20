import { configureStore } from '@reduxjs/toolkit';
import { customAlert } from 'reducers/custom-alert-reducer/custom-alert.reducer';

export const store = configureStore({
  reducer: {
    customAlert: customAlert.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
