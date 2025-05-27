import { configureStore } from '@reduxjs/toolkit';
import productsSlice from './productsSlice';
import themeSlice from './themeSlice';
import userSlice from './userSlice';

// import themeReducer from '@/features/theme/themeSlice'; // неправильный путь

export const store = configureStore({
  reducer: {
    theme: themeSlice,
    user: userSlice,
    products: productsSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;