import './Header.scss';
import { Logo } from 'ui/Logo/Logo';

export const Header = () => {
  return (
    <header className="header">
      <Logo></Logo>
      {/* Сделать логику выпадающего меню */}
      <button className="btn header__btn">Меню</button>
    </header>
  );
};