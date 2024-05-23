import axios from "axios";

export default axios.create({
    baseURL: 'https://flask-movie-api.vercel.app/'
})