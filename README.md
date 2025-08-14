# Swing Dance Feedback App

A Node.js/Express web application designed to gather feedback from attendees at swing dance events and classes. This application provides a secure authentication system that allows event organizers and instructors to collect valuable feedback from participants about their experiences, helping improve future events, classes, and overall community engagement.

The app implements a robust user authentication system using Passport.js local strategy with Firebase as the database backend and PostgreSQL session storage, providing a secure foundation for managing feedback collection across multiple events and classes.

## Features

### Authentication & Security
- User registration and login system for event attendees
- Password hashing with bcrypt for security
- Persistent session management with PostgreSQL storage
- Passport.js authentication middleware
- Secure session configuration with automatic cleanup
- Environment variable configuration for sensitive data

### Feedback Collection Ready
- User account system for tracking feedback across multiple events
- Scalable architecture for adding feedback forms, surveys, and rating systems
- Session-based authentication perfect for event-specific feedback collection
- Database structure ready for extending with feedback forms, event data, ratings, comments, and response tracking in Firebase
- Foundation for features like anonymous feedback options, event-specific questionnaires, and feedback analytics

## Tech Stack

- **Backend**: Node.js, Express.js
- **Authentication**: Passport.js (Local Strategy)
- **Database**: Firebase (NoSQL)
- **Session Storage**: PostgreSQL (connect-pg-simple)
- **Password Hashing**: bcrypt
- **Environment Configuration**: dotenv

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL database (for session storage)
- Firebase project setup
- npm or yarn package manager

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd prime-swing-client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a Firebase project at https://console.firebase.google.com/
   - Enable Authentication and Firestore Database
   - Download your Firebase service account key (JSON file)
   - Note: The current code uses a local PostgreSQL connection for user data, but the app is designed to work with Firebase

4. **Set up PostgreSQL for session storage**
   - Install and run PostgreSQL locally
   - The session storage will automatically create the required tables

5. **Create environment file**
   Create a `.env` file in the root directory:
   ```env
   SERVER_SESSION_SECRET=your-super-secret-session-key-here
   DATABASE_URL=postgresql://username:password@localhost:5432/swing-dance
   FIREBASE_PROJECT_ID=your-firebase-project-id
   FIREBASE_PRIVATE_KEY_ID=your-firebase-private-key-id
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour-firebase-private-key\n-----END PRIVATE KEY-----\n"
   FIREBASE_CLIENT_EMAIL=your-firebase-client-email
   FIREBASE_CLIENT_ID=your-firebase-client-id
   FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
   FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
   PORT=5001
   ```

**Important**: 
- Make sure your `SERVER_SESSION_SECRET` is longer than 8 characters, not "superDuperSecret", and a random, secure string
- Firebase private key should include proper line breaks as shown above

## Database Configuration

The application uses a hybrid approach:
- **Firebase**: NoSQL database for user data and application data
- **PostgreSQL**: Session storage for authentication sessions

### Firebase Setup
Set up your Firebase configuration using environment variables from your Firebase service account key.

### PostgreSQL for Sessions
For session storage, the app connects to:
- Host: localhost
- Port: 5432
- Database: swing-dance (for local development)

### Production Deployment
For production, build the app using npm run build and serve the static files from your backend or a hosting provider like Netlify or Vercel.
For production, set these environment variables:
- All Firebase configuration variables
- `DATABASE_URL` for PostgreSQL session storage
- `SERVER_SESSION_SECRET`

## Running the Application

### Development
```bash
npm start
```

The server will start on port 5001 (or the port specified in your `.env` file).

### Production
Make sure to set your environment variables on your hosting platform:
- All Firebase configuration variables
- `SERVER_SESSION_SECRET`
- `DATABASE_URL` (for PostgreSQL session storage)
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
- Plain text passwords are never stored in Firebase

### Session Security
- Sessions are stored in PostgreSQL for persistence and performance
- Session cookies are HTTP-only to prevent XSS attacks
- Sessions expire after 7 days
- Secure session secret validation

### Database Security
- Firebase provides built-in security rules and authentication
- User data stored securely in Firebase NoSQL collections
- Session data isolated in PostgreSQL for optimal performance

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
   - **Firebase**: Verify Firebase configuration variables are set correctly
   - **PostgreSQL**: Verify PostgreSQL is running for session storage
   - Check database credentials and ensure proper Firebase project setup

2. **Firebase authentication issues**
   - Verify Firebase service account key is properly formatted
   - Check that Firebase Authentication is enabled in your Firebase console
   - Ensure Firestore Database is set up and has proper security rules

3. **Session secret warnings**
   - Set a proper `SERVER_SESSION_SECRET` in your `.env` file
   - Make sure it's longer than 8 characters

3. **Port conflicts**
   - Change the `PORT` in your `.env` file
   - Default port is 5001

4. **Authentication issues**
   - Verify user table exists with correct schema
   - Check that passwords are being hashed properly
   - Ensure session middleware is configured correctly