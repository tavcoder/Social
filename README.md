# Tania Social

A full-stack social media application built with Node.js, Express, MongoDB for the backend, and React, Vite for the frontend. Users can register, login, create posts, follow other users, like and comment on posts, and explore the platform.

## Features

- **User Management**: Registration, login, profile updates, avatar uploads.
- **Posts**: Create text posts, upload images, view post details.
- **Interactions**: Like posts, add comments, follow/unfollow users.
- **Feed**: View posts from followed users.
- **Exploration**: Browse users, search for people.
- **Authentication**: JWT-based authentication.
- **File Uploads**: Support for avatar and post images (PNG, JPG, JPEG, GIF).
- **Pagination**: Paginated lists for users and posts.
- **API Documentation**: Swagger UI for API endpoints.

## Tech Stack

### Backend
- **Node.js**: Runtime environment.
- **Express.js**: Web framework.
- **MongoDB**: NoSQL database.
- **Mongoose**: ODM for MongoDB.
- **JWT**: Authentication.
- **Multer**: File uploads.
- **Swagger**: API documentation.
- **bcrypt**: Password hashing.
- **CORS**: Cross-origin resource sharing.

### Frontend
- **React**: UI library.
- **Vite**: Build tool and dev server.
- **React Router**: Client-side routing.
- **TanStack React Query**: Data fetching and caching.
- **Phosphor React**: Icons.
- **Date-fns**: Date utilities.
- **React Error Boundary**: Error handling.

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup
1. Navigate to the backend directory:
   ```
   cd api-rest-red-social
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Set up environment variables (create a `.env` file):
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=3900
   ```
4. Start the server:
   ```
   npm start
   ```
   The API will run on `http://localhost:3900`.

### Frontend Setup
1. Navigate to the root directory:
   ```
   cd ..
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
   The app will run on `http://localhost:5173`.

## Usage

1. Register a new account or login with existing credentials.
2. Update your profile and upload an avatar.
3. Create posts with text and images.
4. Follow other users to see their posts in your feed.
5. Like and comment on posts.
6. Explore users on the People page.

## API Documentation

The API is documented using Swagger. Once the backend is running, visit `http://localhost:3900/api-docs` to view the interactive API documentation.

Key endpoints include:
- User management: `/api/user/register`, `/api/user/login`, `/api/user/profile/:id`
- Posts: `/api/publication/save`, `/api/publication/feed/:page?`
- Follows: `/api/follow/follow`, `/api/follow/unfollow/:id`

For detailed request/response formats, refer to the Swagger docs or the `API, rutas y usos.txt` file.

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature`.
3. Commit changes: `git commit -m 'Add your feature'`.
4. Push to the branch: `git push origin feature/your-feature`.
5. Open a pull request.

Please ensure code follows ESLint rules and add tests for new features.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Notes

- This project is for educational purposes and may require security enhancements for production use (e.g., rate limiting, input sanitization).
- Refer to `TODO.md` for known issues and improvements.