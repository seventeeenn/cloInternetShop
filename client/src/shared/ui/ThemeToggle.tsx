import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '@/features/theme/themeSlice';
import { RootState } from '@/app/store';

export const ThemeToggle = () => {
  const theme = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch();

  return (
    <button onClick={() => dispatch(toggleTheme())}>
      {theme === 'light' ? '🌙 Тёмная тема' : '☀️ Светлая тема'}
    </button>
  );
};