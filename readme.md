# Task Manager API
- Use the /api/auth/register route to register as new user.
- Use the /api/auth/login route to log in and obtain a JWT token.
- Use the /api/tasks routes to manage tasks (create, read, update, delete) with a valid JWT token.


## Server Configuration
- **Port**: 5000

## Configuration
- **Database Connection**: `db.js` is used to connect to the PostgreSQL database.

## Middleware
- **Token Authentication**: `authenticateToken.js` is used as middleware to verify JWT tokens.

## Routes

### Authentication Routes (`/api/auth`)
- **Register** (`/register`):
  - Registers a new user by inserting the username and password into the users database in PostgreSQL.
  - Returns the username and hashed password.

- **Login** (`/login`):
  - Authenticates a registered user by matching the username and password with the database.
  - Returns a JWT token valid for 1 hour.

### Task Routes (`/api/tasks`)
- **Create Task** (`POST /api/tasks`):
  - Adds a new task to the tasks table in the database with title, description, and userID.
  - Requires a valid JWT token.

- **Get All Tasks** (`GET /api/tasks`):
  - Retrieves all tasks associated with the userID provided through the JWT token.
  - Requires a valid JWT token.

- **Update Task** (`PUT /api/tasks/:id`):
  - Updates a task with the specified ID.
  - Requires a valid JWT token.

- **Delete Task** (`DELETE /api/tasks/:id`):
  - Deletes a task with the specified ID.
  - Requires a valid JWT token.



## Environment Variables
The following environment variables need to be set in a `.env` file:

```properties
PORT=5000
DB_USER
DB_PASSWORD
DB_HOST
DB_PORT=5432
DB_NAME
JWT_SECRET
BCRYPT_SALT```


