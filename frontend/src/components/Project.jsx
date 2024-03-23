import React from 'react';
import {useParams} from 'react-router-dom';
import ProjectItem from './ProjectItem';
import {TodoItem} from './Todo';


const Project = ({projects, todolist}) => {
  let {projectId} = useParams();
  let filter_project = projects.filter((project) => project.id === parseInt(projectId));
  let filter_project_todo = todolist.filter((todo) => todo.project === filter_project[0].name)
  console.log(todolist)
  console.log(filter_project)
  //console.log(filter_project_todo)

  return (
    <div className="content">
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
          {filter_project.map((project) => <ProjectItem project={project}/>)}
        </tbody>
      </table> 
    <br/>

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
            {filter_project_todo.map((todo) => (
            <TodoItem todo={todo} key={todo.id}/>
            ))}
        </tbody>
      </table> 

    </div>

  )
}

export default Project;
