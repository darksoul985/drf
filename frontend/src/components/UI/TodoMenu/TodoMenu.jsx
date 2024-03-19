import React from 'react';
import {Link} from 'react-router-dom';
import classes from './TodoMenu.module.css';

const TodoMenu = ({menuList}) => {
  return (
    <nav>
      <ul className={classes.menuItems}>
        {menuList.map((menuItem, index) => 
          //(<li key={index}><a href={menuItem.link} data-item={menuItem.title}>{menuItem.body}</a></li>)
          (<li key={index}>
            <Link to={menuItem.link} data-item={menuItem.title}>{menuItem.body}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default TodoMenu;
