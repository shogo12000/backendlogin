BackendLogin
A simple backend API for user authentication, built with Node.js, Express, MongoDB, and JWT. This project allows users to register, login, and access protected routes using JWT tokens for authentication.

Technologies Used
Node.js: JavaScript runtime environment for server-side execution.
Express: Minimal and flexible web application framework for Node.js.
MongoDB: NoSQL database for storing user data.
Mongoose: ODM (Object Data Modeling) library for MongoDB and Node.js.
bcryptjs: Library for hashing and verifying user passwords.
jsonwebtoken (JWT): Library for creating and verifying JSON Web Tokens for authentication.
dotenv: Loads environment variables from a .env file.
cors: Middleware for enabling Cross-Origin Resource Sharing (CORS).
Features
User Authentication:

Users can register with a username, email, and password.
Passwords are securely hashed before storing in the database.
JWT tokens are used for authenticating users and accessing protected routes.
Protected Routes:

/profile: A protected route requiring a valid JWT token to access.
/verify-token: A route to check if the provided token is valid.
/profilebody: Another protected route for testing POST requests with token validation.﻿# backendlogin
