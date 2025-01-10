# User Role-Based Complaint Management System - Backend

# Overview

The backend for the User Role-Based Complaint Management System is built using Node.js and MySQL. This backend provides APIs for managing customer complaints and handling user authentication with role-based access control. It supports CRUD operations for tickets and includes functionality tailored to two user roles: Admin and Customer.

### 1. Key Features
  - **Authentication:**
    - Secure login functionality for both Admin and Customer roles.

  - **Role-Based Access:**
    - Separate dashboards and API functionalities for Admins and Customers.

  - **Ticket Management:**
    - Customers can create, view, update, and delete their tickets.
    - Admins can view all tickets, reply to tickets, and update their status.

  - **Database Integration:**
    - Uses MySQL

### 2. **Requirements**
Core Functionality
- **Authentication**
    - Single login endpoint for Admins and Customers.
    - Secure authentication using JWT.
    - Middleware for role-based access control.
- **Role-Based Dashboards**
    - **Admin:**
        - API to view all tickets.
        - API to reply to tickets.
        - API to update ticket status (Open, Resolved, Closed).
    - **Customer:**
        - API to create, view, update, and delete their tickets.
- **Ticket Management**
    - **Ticket schema includes::**
        - subject
        - description
        - status (e.g., Open, Resolved, Closed)
        - customerId

### 3. **Admin Features:**
- **Dashboard:**
    - View a list of all tickets submitted by customers.
    - Change any user to admin
- **Complaint Management:**
    - Reply to tickets directly.
    - Update the status of tickets (e.g., mark as "Resolved" or "Closed").

## Database ERD diagram
![erd](./src/image/db_er_cms.jpeg)

## Project Structure

    ├── migrations
    │   └── create-admin-user.js
    ├── node_modules
    ├── src
    │   ├── config
    │   │   ├── database.js
    │   │   └── dotenv.js
    │   ├── controllers
    │   │   ├── authController.js
    │   │   ├── ticketController.js
    │   │   └── userController.js
    │   ├── image
    ├── middlewares
    │   ├── authMiddleware.js
    │   └── roleMiddleware.js
    ├── models
    │   ├── index.js
    │   ├── ticket.js
    │   └── user.js
    ├── routes
    │   ├── authRoutes.js
    │   ├── ticketRoutes.js
    │   └── userRoutes.js
    ├── services
    │   ├── authService.js
    │   ├── ticketService.js
    │   └── userService.js
    ├── utils
    │   ├── app.js
    │   ├── errorHandler.js
    │   └── logger.js
    ├── .env
    ├── .gitignore
    ├── package-lock.json
    ├── package.json
    └── README.md


# Installation
1. Prerequisites
Ensure you have the following installed:
- node: v18.20.4
- mysql: v8.0.40

2. Environment Variables
Create a .env file in the root directory with the following variables:

    ```bash
    PORT=5000
    DATABASE_URL=mysql://root:Salman@123@localhost:3306/complaint_system
    JWT_SECRET=your_jwt_secret_key
    DB_HOST=192.168.122.20
    DB_USER=root
    DB_PASSWORD=Salman@123
    DB_DATABASE=complaint_system
    DB_PORT=3306
    ```
3. Database Schema
Run the following SQL commands to set up the database and tables:

    ```bash
    CREATE DATABASE complaint_system;

    CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('Admin', 'Customer') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE replies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ticket_id INT NOT NULL,
    admin_id INT,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ticket_id) REFERENCES tickets(id) ON DELETE CASCADE,
    FOREIGN KEY (admin_id) REFERENCES users(id) ON DELETE SET NULL
    );

    CREATE TABLE ticket_replies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ticket_id INT NOT NULL,
    admin_name VARCHAR(255),
    admin_id INT,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ticket_id) REFERENCES tickets(id) ON DELETE CASCADE,
    FOREIGN KEY (admin_id) REFERENCES users(id) ON DELETE SET NULL
    );

    CREATE TABLE tickets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    subject VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    customer_id INT NOT NULL,
    customer_name VARCHAR(255),
    status ENUM('Open', 'Resolved', 'Closed') DEFAULT 'Open',
    priority ENUM('Low', 'Medium', 'High') DEFAULT 'Medium',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES users(id) ON DELETE CASCADE
    );
    ```
# Setup and Run Instructions
1. Clone the repository:

    ```bash
    git clone https://github.com/salmannoushad/complaint-management-backend.git
    cd complaint-management-backend
    ```
2. Install dependencies:
    ```
    npm install
    ```
3. Set up the database:
- Create the database and tables using the schema provided above.
- Configure the .env file with your database credentials.

4. Start the server:
    ```bash
    npm start
    ```

5. The server will be available at http://localhost:5000

6. Run the migration to create the admin user:
    ```bash
    node migrations/create-admin-user.js
    ```
# Admin User Details
- **email** : salman@example.com
- **password**: securepassword

# API EndPoints
- **Registration**
    - post /auth/register  create customer user
- **Authentication**
    - post /auth/login : Login for Admin and Customer.
- **Tickets**
    - **POST** /tickets :  Create a ticket (Customer only).
    - **GET** /tickets : Retrieve all tickets (Admin only).
    - **PATCH** /tickets/:ticketId : update a ticket (Customer Only).
    - **DELETE** /tickets/:ticketId : delete a ticket (Customer Only)
    - **PATCH** /tickets/:ticketId/status : update ticket status (Admin Only)
    - **GET** /tickets/my-tickets : Retrieve the user's tickets (Customer Only).
    - **GET** /tickets/:ticketId/replies : Retrieve replies for a specific ticket (Admin Only)
    - **POST** /tickets/:ticketId/reply : Submit a reply to a specific ticket (Admin Only).

# Docker Configuration
1. Create a Dockerfile in the root directory with the following content:

    ```bash
    FROM node:18-alpine

    WORKDIR /app

    COPY package.json .

    RUN npm install

    COPY . .

    EXPOSE 5000

    CMD ["npm", "start"]
    ```
2. To build and run the Docker container:

    ```bash
    docker build -t backend-service .
    docker run -p 5000:5000 --env-file .env backend-service
    ```
    
Feel free to contribute or open issues for improvements! Happy coding! 🎉
