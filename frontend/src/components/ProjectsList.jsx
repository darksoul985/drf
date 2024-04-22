import React from 'react';
import ProjectItem from './ProjectItem';


const ProjectList = ({projects, title}) => {
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
              Участники
            </th>
            <th>
              Папка проекта
            </th>
          </tr>
        </thead>
        <tbody>
            {projects.map((project) => (
            <ProjectItem project={project} key={project.id}/>
            ))}
        </tbody>
      </table> 
    </div>
  );
};

export default ProjectList;
