import React from 'react';
import UsersItem from './UsersItem'

const UsersList = ({users, title}) => {
  return (
    <div className="content">
      <h1 style={{ textAline: "center" }}>{title}</h1>
      <table>
        <thead>
          <tr>
            <th>
              Пользователь
            </th>
            <th>
              Имя
            </th>
            <th>
              Фамилия
            </th>
          </tr>
        </thead>
        <tbody>
          {
            users.map((user, index) => (
            <UsersItem user={user} key={index}/>
            )
            )
          }
        </tbody>
      </table> 
    </div>
  );
}

export default UsersList;
