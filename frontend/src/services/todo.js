import axios from 'axios';

export default class TodoDataService{
  static async getAll() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/users');
      return response.data
  } catch (e) {
      console.log(e)
    }
  }
}
