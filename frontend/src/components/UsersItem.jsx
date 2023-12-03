import React from 'react';

const UsersItem = ({user}) => {
  return (
      <tr>
        <td>
          {user.username}
        </td>
        <td>
          {user.first_name}
        </td>
        <td>
          {user.last_name}
        </td>
      </tr>
  );
}

export default UsersItem;
