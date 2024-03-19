import React, {useState, useEffect} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
// import TodoDataService from './services/todo';
import UsersList from './components/UsersList';
import TodoMenu from './components/UI/TodoMenu/TodoMenu';
import Footer from './components/UI/Footer/Footer';
import {fetchUsers, fetchProjects, fetchTodo} from './services/fetchData';
import ProjectList from './components/ProjectsList';
import Project from './components/Project';
import {TodoList} from './components/Todo';
import NotFound404 from './components/NotFound404';
import './styles/App.css';


export default function App() {
  // установление состояния для пользователей
  const [users, setUsers] = useState([])
  useEffect(() => {allUsers()}, [])

  async function allUsers() {
    {/*const users = await TodoDataService.getAll();*/}
    const users = await fetchUsers()
    setUsers(users)
  };

  // получаем с бэка список проектов
  const [projects, setProjects] = useState([]);
  useEffect(() => {allProjects()}, []);

  async function allProjects() {
    const pro = await fetchProjects()
    setProjects(pro)
  };

  // получаем с бэка список задач к проектам
  const [todolist, setTodo] = useState([]);
  useEffect(() => {allTodo()}, []);

  async function allTodo() {
    const todo = await fetchTodo()
    setTodo(todo)
  };

  const menu = [
      {title: 'Главная', body: 'Главная', link: '/'},
      {title: 'Пользователи', body: 'Пользователи', link: '/users'},
      {title: 'Проекты', body: 'Проекты', link: '/projects'},
      {title: 'Задачи', body: 'Задачи', link: '/notes'},
    ]
  

  return (
    <div className="App">
      <BrowserRouter>
        <TodoMenu menuList={menu}/>
          <Routes>
            <Route exact path='/users' element={
              <UsersList
                className="content"
                users={users}
                title='Список зарегистрированных пользователей'
              />
              }>
            </Route>
            <Route path='/projects'>
              <Route index element={<ProjectList className="content" projects={projects} title='Проекты' />}/>
              <Route path=':projectId' element={<Project className="content" projects={projects} todolist={todolist} title='Проект' />}/>
                  
            </Route>
            <Route exact path='/notes' element={
              <TodoList
                className="content"
                todo={todolist}
                title='Задачи'
              />
              }>
            </Route>
            <Route path='*' element={<NotFound404 />}/>

          </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

