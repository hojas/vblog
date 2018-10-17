import axios from 'axios'

const apis = {
  categories: {
    getAll: 'categories',
    post: 'categories',
    put: 'categories',
    delete: 'categories',
  },
}

const ajax = axios.create({
  baseURL: 'http://localhost:3000/api/',
  timeout: 3000,
})

export { apis, ajax }
