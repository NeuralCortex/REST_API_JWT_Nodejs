# REST API with JWT and SQLite

## Overview

This project is a simple REST API implementing the CRUD (Create, Read, Update, Delete) pattern, secured with JSON Web Tokens (JWT), and built with Node.js. It uses a SQLite database to store data. The source code is commented for clarity, with detailed method descriptions provided in the code rather than in this README.

## Features

- RESTful API endpoints following the CRUD pattern.
- JWT-based authentication for secure access.
- SQLite database for lightweight data storage.
- Demo client to interact with the API.
- Easy setup with Node.js and npm.

## Setup Instructions

To run the API, follow these steps:

1. **Install Node.js**: Download and install [Node.js](https://nodejs.org) if not already installed.
2. **Clone the Repository**: Clone this project to your local machine.
   ```bash
   git clone <repository-url>
   ```
3. **Navigate to Project Directory**: Change to the project's root directory.
   ```bash
   cd <project-directory>
   ```
4. **Generate JWT Keys**: Use an [Online RSA Key Generator](https://travistidwell.com/jsencrypt/demo/) to create `public.key` and `private.key` files, and place them in the project directory.
5. **Install Dependencies**: Run the following command to install required packages:
   ```bash
   npm install
   ```
6. **Start the API Server**: Launch the server using nodemon:
   ```bash
   nodemon server
   ```
7. **Run the Demo Client**: Start the demo client to interact with the API:
   ```bash
   npm start
   ```

## Technologies Used

The following tools and frameworks were used to develop this project:

- **Visual Studio Code**: [VS Code](https://code.visualstudio.com/) for code editing.
- **Postman**: [Postman](https://www.postman.com/) for API testing.
- **SQLiteStudio**: [SQLiteStudio](https://sqlitestudio.pl/) for database management.
- **Node.js**: [Node.js](https://nodejs.org) for the runtime environment.
- **Google Chrome**: [Chrome](https://www.google.com/chrome/) for testing the demo client.