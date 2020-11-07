import axios from 'axios'

const http = axios.create({
    baseURL: 'http://localhost:9000/select-service',
    timeout: 1000 * 100,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    }
})

export default http