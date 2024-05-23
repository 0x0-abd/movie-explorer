# Movie Explorer

> Website to seach for movies

This website made with [Next.js](https://nextjs.org/) and [Flask](https://flask.palletsprojects.com/en/3.0.x/). A live demo can be viewed [here](https://movie-explorer-weld.vercel.app/).

Before installing this, make sure to install the backend server from [here](https://github.com/0x0-abd/flask-movie-api)

## Features

- User Friendly UI with Light and Dark Mode
- [Framer Motion](https://www.framer.com/motion/) for animations
- Fast searches

## Getting Started

Install the dependencies and run the development server:

```bash
npm i
npm run dev
```

In src/lib/axios.ts, change baseURL to ``http://localhost:5000/``
```
import axios from "axios";

export default axios.create({
    baseURL: 'http://localhost:5000/'
})
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.


