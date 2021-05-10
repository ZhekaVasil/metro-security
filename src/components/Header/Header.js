import React from 'react';
import classes from './Header.module.scss';
import Logo from '../../metro.png';
import MetroLogo from '../../Minsk_metro_logo.svg';

export const Header = () => {
  return (
    <div className={classes.container}>
      <img src={MetroLogo} className={classes.image} />
      <h2 className={classes.title}>Служба безопасности ГП "Минский метрополитен"</h2>
      <img src={Logo} className={classes.image} />
    </div>
  )
};

