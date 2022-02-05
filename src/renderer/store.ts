import { configureStore } from '@reduxjs/toolkit';
import WebViewModalURL from 'features/WebViewModalURL/WebViewModalURL';

export const store = configureStore({
  reducer: {
    WebViewModalURL: WebViewModalURL,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
