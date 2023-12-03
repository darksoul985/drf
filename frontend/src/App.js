import React, {useState, useEffect} from 'react';
import TodoDataService from './services/todo'
import UsersList from './components/UsersList';
import TodoMenu from './components/UI/TodoMenu/TodoMenu'
import Footer from './components/UI/Footer/Footer'
import './styles/App.css'


export default function App() {
  const [users, setUsers] = useState([])
  useEffect(() => {fetchPosts()}, [])

  async function fetchPosts() {
    const users = await TodoDataService.getAll();
    setUsers(users)
  };

  const menu = [
      {title: 'Главная', body: 'Главная', link: ''},
      {title: 'Пользователи', body: 'Пользователи', link: ''},
      {title: 'Задачи', body: 'Задачи', link: ''},
    ]
  

  return (
    <div className="App">
      <TodoMenu menuList={menu}/>
      <UsersList
        className="content"
        users={users}
        title='Список зарегистрированных пользователей'
      />
      <Footer />
    </div>
  );
}

