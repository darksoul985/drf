import react from 'react';
import classes from './Footer.module.css';

const Footer = () => {
  return (
    <div className={classes.footer}>
      <ul className={classes.footer_ul}>
        <li>Тел.</li>
        <li>8495444ХХ44</li>
        <li>Контакты</li>
      </ul>
    </div>
  );
}

export default Footer;
