import axios from 'axios';

async function fetchUsers(){
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/users');
      return response.data
  } catch (e) {
      console.log(e)
    }
}


async function fetchProjects(){
    try {
      const apiURL = 'http://127.0.0.1:8000/api/projects';
      const response = await axios.get(apiURL);
      return response.data.results
  } catch (e) {
      console.log(e)
    }
}



async function fetchTodo(){
    try {
      const apiURL = 'http://127.0.0.1:8000/api/todo';
      const response = await axios.get(apiURL);
      return response.data.results
  } catch (e) {
      console.log(e)
    }
}

export {fetchUsers, fetchProjects, fetchTodo};
