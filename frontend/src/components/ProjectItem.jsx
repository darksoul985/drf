import React from 'react';
import {Link} from 'react-router-dom';


const ProjectItem = ({project}) => {
  return (
      <tr>
        <td>
          <Link to={`/projects/${project.id}`}>{project.name}</Link>
        </td>
        <td>
          {project.users.map((user) => user.username).join(', ')}
        </td>
        <td>
          {project.repo}
        </td>
      </tr>
  );
};

export default ProjectItem;
