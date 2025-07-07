# Swing Dance App

A Node.js/Express web application with user authentication using Passport.js local strategy and PostgreSQL session storage.

## Features

- User registration and login
- Password hashing with bcrypt
- Session management with PostgreSQL storage
- Passport.js authentication middleware
- Secure session configuration
- Environment variable configuration

## Tech Stack

- **Backend**: Node.js, Express.js
- **Authentication**: Passport.js (Local Strategy)
- **Database**: PostgreSQL
- **Session Storage**: PostgreSQL (connect-pg-simple)
- **Password Hashing**: bcrypt
- **Environment Configuration**: dotenv

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL database
- npm or yarn package manager

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd swing-dance-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up your PostgreSQL database**
   - Create a database named `swing-dance`
   - Create a `user` table with the following structure:
   ```sql
   CREATE TABLE "user" (
     "id" SERIAL PRIMARY KEY,
     "username" VARCHAR(80) UNIQUE NOT NULL,
     "password" VARCHAR(1000) NOT NULL
   );
   ```

4. **Create environment file**
   Create a `.env` file in the root directory:
   ```env
   SERVER_SESSION_SECRET=your-super-secret-session-key-here
   DATABASE_URL=postgresql://username:password@localhost:5432/swing-dance
   PORT=5001
   ```

   **Important**: Make sure your `SERVER_SESSION_SECRET` is:
   - Longer than 8 characters
   - Not "superDuperSecret"
   - A random, secure string

## Database Configuration

The application supports two database connection methods:

### Local Development
For local development, the app connects to:
- Host: localhost
- Port: 5432
- Database: swing-dance

### Production Deployment
For production (like Heroku), set the `DATABASE_URL` environment variable:
```
DATABASE_URL=postgresql://username:password@host:port/database
```

## Running the Application

### Development
```bash
npm start
```

The server will start on port 5001 (or the port specified in your `.env` file).

### Production
Make sure to set your environment variables on your hosting platform:
- `SERVER_SESSION_SECRET`
- `DATABASE_URL` (for production databases)
- `PORT` (if different from 5001)

## API Endpoints

### Authentication Routes (`/api/user`)

- **GET** `/api/user/` - Get current user information
  - Returns user object if authenticated, empty object if not

- **POST** `/api/user/register` - Register a new user
  - Body: `{ "username": "string", "password": "string" }`
  - Returns: 201 on success, 500 on error

- **POST** `/api/user/login` - Login user
  - Body: `{ "username": "string", "password": "string" }`
  - Returns: 200 on success, 401 on invalid credentials

- **POST** `/api/user/logout` - Logout current user
  - Returns: 200 on success

## Security Features

### Password Security
- Passwords are hashed using bcrypt with a salt factor of 10
- Plain text passwords are never stored in the database

### Session Security
- Sessions are stored in PostgreSQL for persistence
- Session cookies are HTTP-only to prevent XSS attacks
- Sessions expire after 7 days
- Secure session secret validation

### Authentication Middleware
- `rejectUnauthenticated` middleware available for protecting routes
- Passport.js handles authentication strategy

## Project Structure

```
├── server.js                          # Main application entry point
├── modules/
│   ├── pool.js                        # PostgreSQL connection pool
│   ├── encryption.js                  # Password hashing utilities
│   ├── session-middleware.js          # Session configuration
│   └── authentication-middleware.js   # Auth middleware
├── strategies/
│   └── user.strategy.js              # Passport local strategy
├── routes/
│   └── user.router.js                # User authentication routes
├── constants/
│   └── warnings.js                   # Security warnings
└── build/                            # Static files directory
```

## Development Notes

### Session Management
- Sessions are automatically cleaned up by `connect-pg-simple`
- Session table is created automatically if it doesn't exist
- Session pruning runs every 60 seconds (disabled in test environment)

### Security Warnings
The application includes built-in security warnings that will display in the console if:
- No session secret is set
- Session secret is too short (< 8 characters)
- Session secret is set to the example value

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Troubleshooting

### Common Issues

1. **Database connection errors**
   - Verify PostgreSQL is running
   - Check database name and credentials
   - Ensure the database exists

2. **Session secret warnings**
   - Set a proper `SERVER_SESSION_SECRET` in your `.env` file
   - Make sure it's longer than 8 characters

3. **Port conflicts**
   - Change the `PORT` in your `.env` file
   - Default port is 5001

4. **Authentication issues**
   - Verify user table exists with correct schema
   - Check that passwords are being hashed properly
   - Ensure session middleware is configured correctly