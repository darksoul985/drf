import React from 'react';

const TodoItem = ({todo}) => {

  return (
      <tr>
        <td>
          {todo.project}
        </td>
        <td>
          {todo.user.username}
        </td>
        <td className="todobody">
          {todo.body}
        </td>
        <td>
          {todo.created}
        </td>
        <td>
          {todo.update}
        </td>
        <td>
          {todo.is_active}
        </td>
      </tr>
  );
};

const TodoList = ({todo, title}) => {
  return (
    <div className="content">
      <h1 style={{ textAline: "center" }}>{title}</h1>
      <table>
        <thead>
          <tr>
            <th>
              Проект
            </th>
            <th>
              Пользователь
            </th>
            <th>
              Текст заметки
            </th>
            <th>
              Дата создания
            </th>
            <th>
              Обновлено
            </th>
            <th>
              Активно
            </th>
          </tr>
        </thead>
        <tbody>
            {todo.map((todo) => (
            <TodoItem todo={todo} key={todo.id}/>
            ))}
        </tbody>
      </table> 
    </div>
  );
};

export {TodoList, TodoItem};
