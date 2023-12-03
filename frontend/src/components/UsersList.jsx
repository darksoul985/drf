import React from 'react';
import UsersItem from './UsersItem'

const UsersList = ({users, title}) => {
  return (
    <div className="content">
      <h1 style={{ textAline: "center" }}>{title}</h1>
      <table>
        <th>
          Username
        </th>
        <th>
          First name
        </th>
        <th>
          Last name
        </th>
        {users.map((user) => (
        <UsersItem user={user} key={user.id}/>
      ))}
      </table> 
    </div>
  );
}

export default UsersList;
