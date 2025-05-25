import { ThemeToggle } from '@shared/ui/ThemeToggle';
import { Link } from 'react-router-dom';
import './header.css';

export const Header = () => {
  return (
    <header className="header">
      <div className="header__wrapper">
        
        <Link to="/" className="header__logo">
          MyApp
        </Link>

        <nav className="CLASS__NAME">
          <Link to="/login" className="header__link">
            Login
          </Link>
          <Link to="/registration" className="header__link">
            Register
          </Link>
          <Link to="/products" className="header__link">
            Products
          </Link>
        </nav>

        <ThemeToggle />
      </div>
    </header>
  );
};