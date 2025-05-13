import { RootState } from '@shared/store';
import { toggleTheme } from '@shared/store/themeSlice';
import { useDispatch, useSelector } from 'react-redux';
// import { toggleTheme } from '@/features/theme/themeSlice'; //не правильный путь
// import { RootState } from '@/app/store'; //не правильный путь

export const ThemeToggle = () => {
  const theme = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch();

  return (
    <button onClick={() => dispatch(toggleTheme())}>
      {theme === 'light' ? '🌙 Тёмная тема' : '☀️ Светлая тема'}
    </button>
  );
};