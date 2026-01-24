# Plexi

Plexi is a lightweight MERN-stack blog application (React + Express + MongoDB) with image upload support.

**Tech stack:** Node.js, Express, MongoDB (Atlas), React, Axios, GridFS (multer-gridfs-storage)

**Repository structure**
- `server/`: Express backend, controllers, models, routes, and upload utilities.
- `client/`: React frontend (Create React App) with components and API service.

Tagline

"Write, share, and showcase — effortless blogging with images."

Features

- **Auth:** Signup and login with JWT-protected routes.
- **CRUD posts:** Create, read, update, and delete blog posts.
- **Image uploads:** Store images in MongoDB GridFS using `multer-gridfs-storage` with upload progress.
- **Responsive UI:** React frontend with componentized structure for fast development.
- **REST API client:** Centralized API service (`client/src/service/api.js`) with error handling and progress hooks.

Future scope

- Add comments, likes, and following to build social features.
- Rich-text editor and tagging for better content creation and discovery.
- Image optimization, CDN integration, and caching for production performance.
- Role-based access control and email verification for improved security.



Getting started

Prerequisites
- Node.js (v18+ recommended)
- npm (or yarn)
- A MongoDB Atlas cluster (or local MongoDB) and account credentials

Setup — Server
1. Open a terminal and go to the server folder:

	cd server

2. Install dependencies:

	npm install

3. Create a `.env` file in `server/` with the required environment variables (example):

	DB_USERNAME=yourMongoUser
	DB_PASSWORD=yourMongoPassword
	ACCESS_SECRET_KEY=your_jwt_secret

4. Start the server (uses `nodemon`):

	npm start

The server listens on port `8000` by default. The backend's base URL is `http://localhost:8000`.

Setup — Client
1. Open another terminal and go to the client folder:

	cd client

2. Install dependencies:

	npm install

3. Start the React development server:

	npm start

By default the client expects the API at `http://localhost:8000` (see `client/src/service/api.js`).

Environment variables and notes
- `DB_USERNAME` / `DB_PASSWORD`: used to connect to MongoDB Atlas in `server/utils/upload.js` and `server/index.js`.
- `ACCESS_SECRET_KEY`: JWT secret used by `server/controller/jwt-controller.js`.

Development
- Routes and controllers live under `server/controller/`.
- React components live under `client/src/components/`.
- Image storage uses GridFS via `multer-gridfs-storage` and the `uploads`/fs bucket.

Useful scripts
- `cd server && npm start`: Run server with nodemon.
- `cd client && npm start`: Run React development server.

Deployment
- For production, build the client (`npm run build` in `client`) and serve the static build via a production-ready server or separate hosting (Netlify/Vercel for frontend, Heroku/DigitalOcean/Azure for backend).
