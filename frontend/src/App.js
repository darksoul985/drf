import React, {useContext, useState, useEffect, useCallback} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
// import TodoDataService from './services/todo';
import UsersList from './components/UsersList';
import TodoMenu from './components/UI/TodoMenu/TodoMenu';
import Login from './components/authentication/LoginForm';
import Footer from './components/UI/Footer/Footer';
// import {fetchUsers, fetchProjects, fetchTodo} from './services/fetchData';
import ProjectList from './components/ProjectsList';
import Project from './components/Project';
import {TodoList} from './components/Todo';
import NotFound404 from './components/NotFound404';
import Cookies from "universal-cookie";
import AuthContext from './components/context/AuthProvider';
import axios from './services/axiosLogin';
import './styles/App.css';


export default function App() {

  const { auth } = useContext(AuthContext)
  const [token, setToken] = useState();


  const is_auth = useCallback((context_auth, token) => {
    if (context_auth?.accessToken === undefined){
      console.log("Login faild. Don't get a token")
    } else {
      const cookies = new Cookies()
      cookies.set('token', context_auth?.accessToken)
      setToken(context_auth?.accessToken)
    }
    console.log('Проверка токена')
    return !!token
  }, [])

  const logout = () => {

  }


  // const get_headers = () => {
  //   let headers = {
  //     'Content-Type': 'application/json',
  //   }
  //   if (is_auth(token)) {
  //     headers['Authorization'] = 'Bearer ' + token
  //   };
  //   return headers
  // }

  
  // установление состояния для пользователей
  const [users, setUsers] = useState([])
  useEffect(() => {
    const configuration ={
      method: "get",
      url: "/api/users/",
      headers: {
        "Content-Type": "application/json",
        "Authorization": is_auth(auth, token) ? "Bearer " + token : ""
    }};

    const cookies = new Cookies()
    const get_token = cookies.get('token')
    
    axios(configuration)
      .then((requests) => {
        (get_token !== undefined && get_token !== "") ? setUsers(requests.data) : setUsers([])
      }).catch((error) => {
        setUsers([])
        console.log(error)
      })

  }, [is_auth, auth, token])

  // async function allUsers() {
  //   const users = await fetchUsers()
  //   setUsers(users)
  // };
// получаем с бэка список проектов
  const [projects, setProjects] = useState([]);
  useEffect(() => {

    const configuration ={
      method: "get",
      url: "/api/projects/",
      headers: {
        "Content-Type": "application/json",
        "Authorization": is_auth(auth, token) ? "Bearer " + token : ""
    }};
    
    const cookies = new Cookies()
    const get_token = cookies.get('token')

    axios(configuration)
      .then((requests) => {
      (get_token !== undefined && get_token !== "") ? setProjects(requests.data.results) : setProjects([])
        
      }).catch((error) => {
        setProjects([])
        console.log(error)
      })
  },
    [is_auth, auth, token]);

  // async function allProjects() {
  //   const pro = await fetchProjects()
  //   setProjects(pro)
  // };

  // получаем с бэка список задач к проектам
  const [todolist, setTodo] = useState([]);
  useEffect(() => {
    const configuration = {
        method: "get",
        url: "/api/todo",
        headers: {
          "Content-Type": "application/json",
          "Authorization": is_auth(auth, token) ? "Bearer " + token : ""
        }
      };

    const cookies = new Cookies()
    const get_token = cookies.get('token')

    axios(configuration)
      .then((requests) => {
        (get_token !== undefined && get_token !== "") ? setTodo(requests.data.results) : setTodo([])
      }).catch((error) => {
        setTodo([])
        console.log(error)
      })
  },
    [is_auth, auth, token]);


  // async function allTodo() {
  //   const todo = await fetchTodo()
  //   setTodo(todo)
  // };

  const menu = [
      {title: 'Главная', body: 'Главная', link: '/'},
      {title: 'Пользователи', body: 'Пользователи', link: '/users'},
      {title: 'Проекты', body: 'Проекты', link: '/projects'},
      {title: 'Задачи', body: 'Задачи', link: '/notes'},
      {title: 'Авторизация', body: 'Авторизация', link: '/login'},
    ]

  return (
    <div className="App" >
      <BrowserRouter>
        <TodoMenu menuList={menu}/>
          <Routes>
            <Route path='/users' element={
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
            <Route path='/notes' element={
              <TodoList
                className="content-form"
                todo={todolist}
                title='Задачи'
              />
              }>
            </Route>

            <Route path='/login' element={<Login />}></Route>

            <Route path='*' element={<NotFound404 />}/>

          </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

