# Product Store 🛒

[![GitHub license](https://img.shields.io/github/license/yourusername/product-store)](https://github.com/yourusername/product-store/blob/main/LICENSE)
[![Node.js Version](https://img.shields.io/badge/node-v18.x-brightgreen.svg)](https://nodejs.org/)
[![MongoDB Version](https://img.shields.io/badge/mongodb-v5.x-brightgreen.svg)](https://www.mongodb.com/)
[![Express Version](https://img.shields.io/badge/express-v4.18.x-blue.svg)](https://expressjs.com/)
[![React Version](https://img.shields.io/badge/react-v18.x-blue.svg)](https://reactjs.org/)

A full-featured e-commerce product store built with the MERN (MongoDB, Express, React, Node.js) stack. This application provides a complete solution for managing products, users, and orders with a modern, responsive interface.

![Product Store Demo](demo-screenshot.png)

## ✨ Features

- **User Authentication & Authorization**
  - JWT-based authentication system
  - Role-based access control (Admin, Customer)
  - Secure password hashing with bcrypt

- **Product Management**
  - Advanced product search and filtering
  - Product categories and tags
  - Image upload with cloud storage
  - Product reviews and ratings

- **Shopping Experience**
  - Intuitive shopping cart
  - Wishlist functionality
  - Secure checkout process
  - Order history and tracking

- **Admin Dashboard**
  - Comprehensive sales analytics
  - Inventory management
  - User management
  - Order processing and fulfillment

- **Performance & Security**
  - RESTful API with proper error handling
  - Data validation and sanitization
  - Optimized database queries
  - Rate limiting and security headers

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (v5 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/product-store.git
   cd product-store
   ```

2. Install dependencies for both client and server
   ```bash
   # Install server dependencies
   npm install
   
   # Install client dependencies
   cd client
   npm install
   cd ..
   ```

3. Create a `.env` file in the root directory with the following variables
   ```
   NODE_ENV=development
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. Run the development server
   ```bash
   # Run both client and server (from root directory)
   npm run dev
   
   # Run server only
   npm run server
   
   # Run client only
   npm run client
   ```

5. The server will run on `http://localhost:5000` and the client will run on `http://localhost:3000`

## 🏗️ Project Structure

```
product-store/
├── client/                 # React frontend
│   ├── public/             # Static files
│   ├── src/                # Source files
│   │   ├── actions/        # Redux actions
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── reducers/       # Redux reducers
│   │   ├── utils/          # Utility functions
│   │   ├── App.js          # Main component
│   │   └── index.js        # Entry point
│   └── package.json        # Frontend dependencies
├── controllers/            # Route controllers
├── middleware/             # Custom middleware
├── models/                 # Mongoose models
├── routes/                 # API routes
├── utils/                  # Utility functions
├── uploads/                # Uploaded files
├── .env                    # Environment variables
├── .gitignore              # Git ignore file
├── package.json            # Backend dependencies
└── server.js               # Express server
```

## 📚 API Documentation

The API endpoints are organized around REST principles:

### Authentication Routes
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Authenticate user and get token
- `GET /api/users/profile` - Get user profile (protected)

### Product Routes
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product by ID
- `POST /api/products` - Create a product (admin only)
- `PUT /api/products/:id` - Update a product (admin only)
- `DELETE /api/products/:id` - Delete a product (admin only)
- `POST /api/products/:id/reviews` - Create product review

### Order Routes
- `POST /api/orders` - Create new order
- `GET /api/orders/myorders` - Get logged in user orders
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id/pay` - Update order to paid
- `GET /api/orders` - Get all orders (admin only)
- `PUT /api/orders/:id/deliver` - Update order to delivered (admin only)

## 🔧 Technologies Used

### Backend
- **Node.js & Express** - Server and API framework
- **MongoDB & Mongoose** - Database and ODM
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **multer** - File uploads
- **cloudinary** - Cloud storage for images
- **express-validator** - Data validation

### Frontend
- **React** - UI library
- **Redux & Redux Toolkit** - State management
- **React Router** - Navigation
- **Axios** - API requests
- **React Bootstrap** - UI components
- **Formik & Yup** - Form handling and validation
- **react-toastify** - Notifications

### DevOps & Tools
- **Jest & React Testing Library** - Testing
- **ESLint & Prettier** - Code quality
- **Concurrently & Nodemon** - Development tools
- **Morgan** - HTTP request logger

## 🔄 Continuous Integration/Deployment

This project uses GitHub Actions for CI/CD:

- Automated testing on push to main branch
- Linting and code quality checks
- Automatic deployment to Heroku on merge to main

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgements

- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Heroku](https://www.heroku.com/)
- [Cloudinary](https://cloudinary.com/)
- [Font Awesome](https://fontawesome.com/)
- [Unsplash](https://unsplash.com/) for product images

## 📧 Contact

Your Name - [@your_twitter](https://twitter.com/your_twitter) - email@example.com

Project Link: [https://github.com/yourusername/product-store](https://github.com/yourusername/product-store)