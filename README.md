# User Authentication System with JWT

This project is a Node.js Express application that implements user authentication using JSON Web Tokens (JWT). It provides endpoints for user registration, login, access to protected routes, and secure logout functionality. The application also includes token revocation and token expiration mechanisms for enhanced security.

## Table of Contents

-   [User Authentication System with JWT](#user-authentication-system-with-jwt)
    -   [Table of Contents](#table-of-contents)
    -   [Features](#features)
    -   [Prerequisites](#prerequisites)
    -   [Installation](#installation)
    -   [Configuration](#configuration)
    -   [Usage](#usage)
        -   [User Registration](#user-registration)
        -   [User Login](#user-login)
        -   [Access Protected Routes](#access-protected-routes)
        -   [User Logout](#user-logout)
    -   [Dependencies](#dependencies)

## Features

-   User registration with secure password hashing
-   User login with JWT issuance
-   Access to protected routes with JWT verification
-   Secure user logout with token revocation
-   Token expiration mechanism
-   Environment variable management for sensitive information
-   PostgreSQL database integration

## Prerequisites

Before running this project, ensure that you have the following prerequisites installed:

-   Node.js
-   npm
-   PostgreSQL database

## Installation

Clone the repository and run following cmds:

```bash
git clone https://github.com/your-repo/User-auth-JWT.git
cd User-auth-JWT
npm install
```

## Configuration

1. Create a new PostgreSQL database for the application.
2. To get started, create a new .env file in the root directory of the project, and add the following configuration data:

```bash

PORT=3000

# Database credentials
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_HOST=your_database_host
DB_PORT=your_database_port
DB_NAME=your_database_name

# JWT secret key
JWT_SECRET=your_jwt_secret_key
```

Do not forget to Replace the placeholders with your actual credentials.

## Usage

### User Registration

To register a new user, send a POST request to `/auth/register` with a JSON payload containing the username and password:

```
POST /auth/register
Content-Type: application/json
```

```json
{
	"username": "your_username",
	"password": "your_password"
}
```

If the registration is successful, you should receive a response with a status code of 201 and a message `User registered successfully`.

### User Login

To log in, send a POST request to `/auth/login` with the username and password:

```
POST /auth/login
Content-Type: application/json
```

```json
{
	"username": "your_username",
	"password": "your_password"
}
```

If the credentials are valid, you should receive a response containing a JSON Web Token (JWT) in the token field:

```json
{
	"token": "....."
}
```

### Access Protected Routes

To access protected routes like `/protected/dashboard`, you need to include the JWT token in the Authorization header of the request:

```bash
GET /protected/dashboard
Authorization: Bearer <your_jwt_token>
```

Replace `<your_jwt_token>` with the JWT token received from the login response.

If the token is valid, you should receive a response like:

```json
{
	"message": "Welcome to the dashboard!",
	"userId": 1
}
```

### User Logout

To log out, send a POST request to `/auth/logout` with the Authorization header containing the JWT token:

```
POST /auth/logout
Authorization: Bearer <your_jwt_token>
```

If the logout is successful, you should receive a response like:

```json
{
	"message": "Logout successful"
}
```

After logging out, the provided JWT token will be revoked, and you won't be able to access protected routes with that token.

## Dependencies

This project relies on the following dependencies:

-   `express`
-   `jsonwebtoken`
-   `pg`
-   `dotenv`
-   `bcrypt`
