import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:3333"
});

const cloudApi = axios.create({
    baseURL: `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_KEY}`,
    headers: {
        'Content-Type': 'multipart/form-data'
    }
})

export {api, cloudApi};