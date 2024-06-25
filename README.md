# Bookstore API

This is a RESTful API for a simple bookstore, implemented using Node.js, Express.js, and Sequelize with MSSQL.

## Features

- Add a new book
- Retrieve a list of all books
- Retrieve details of a single book by its ID
- Update details of an existing book
- Delete a book
- User authentication (sign up and sign in)

## Requirements

- Node.js (v14 or higher)
- MSSQL Server

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/bookstore-api.git
cd api
```

2. Install dependencies
   npm install

3. Configure environment variables
   Create a .env file in the root directory and add the following variables-TOKEN_SECRET_KEY, HOST,PORT and etc.

4. Configure the database
   Update the config/config.json file with your MSSQL database credentials:

5. Run migrations
   npx sequelize-cli db:migrate

6. Start the server
   npm start

7. After that, you must call "your-url/api/api-docs" for Swagger documentation

//Swagger UI route
app.use("/api/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

## API Endpoints
### Authentication
Sign Up: POST /api/auth/signup

Sign In: POST /api/auth/signin

On successful sign-in, you will receive a JWT token which can be used to access protected routes.

### Books
Create Book: POST /api/books (Protected)

Get All Books: GET /api/books

Get Book by ID: GET /api/books/:id

Update Book: PUT /api/books/:id (Protected)

Delete Book: DELETE /api/books/:id (Protected)

### Authentication Middleware
To protect routes, use the authentication middleware defined in middlewares/auth/auth.Middleware.js.
