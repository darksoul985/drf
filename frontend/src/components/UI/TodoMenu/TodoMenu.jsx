import React from 'react';
import classes from './TodoMenu.module.css';

const TodoMenu = ({menuList}) => {
  return (
    <nav>
      <ul className={classes.menuItems}>
        {menuList.map((menuItem) => 
          (<li><a href='#' data-irem={menuItem.title}>{menuItem.body}</a></li>)
        )}
      </ul>
    </nav>
  );
}

export default TodoMenu;
