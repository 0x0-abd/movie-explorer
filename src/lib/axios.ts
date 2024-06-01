import axios from "axios";

export default axios.create({
    baseURL: 'https://flask-movie-api.vercel.app/'
})

// export default axios.create({
//     baseURL: 'http://localhost:5000/'
// })