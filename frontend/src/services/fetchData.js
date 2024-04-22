import axios from 'axios';

//TODO импортировать сюда вызов токена аутенитфикации

async function fetchUsers(){
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/users', {headers});
      return response.data
  } catch (e) {
      console.log(e)
    }
}


async function fetchProjects(headers){
    try {
      const apiURL = 'http://127.0.0.1:8000/api/projects';
      const response = await axios.get(apiURL, {headers});
      return response.data.results
  } catch (e) {
      console.log(e)
    }
}


async function fetchTodo(headers){
    try {
      const apiURL = 'http://127.0.0.1:8000/api/todo';
      const response = await axios.get(apiURL, {headers});
      return response.data.results
  } catch (e) {
      console.log(e)
    }
}

export {fetchUsers, fetchProjects, fetchTodo};
