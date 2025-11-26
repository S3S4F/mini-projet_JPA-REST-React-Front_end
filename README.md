# Task Manager Frontend

A modern, responsive frontend for the Task Manager application, built with React and Tailwind CSS. This application allows users to register, login, and manage their tasks efficiently.

## Features

-   **User Authentication**: Secure login and registration functionality.
-   **Dashboard**: A clean and intuitive dashboard to view all tasks.
-   **Task Management**: Create, read, update, and delete tasks easily.
-   **Responsive Design**: Fully responsive interface optimized for various screen sizes using Tailwind CSS.
-   **Real-time Feedback**: Instant visual feedback for user actions.

## Tech Stack

-   **React**: A JavaScript library for building user interfaces.
-   **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
-   **React Router DOM**: For handling routing and navigation within the application.
-   **Axios**: For making HTTP requests to the backend API.

## Prerequisites

Before running this project, ensure you have the following installed:

-   [Node.js](https://nodejs.org/) (v14 or higher recommended)
-   npm (Node Package Manager)

You also need the **Task Manager Backend** (Spring Boot) running locally on port `8080`.

## Installation

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd task-manager-frontend
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

## Configuration

The application is configured to communicate with the backend at `http://localhost:8080/api`.

If your backend is running on a different URL or port, you can modify the configuration in `src/services/api.js`:

```javascript
// src/services/api.js
const API_URL = 'http://localhost:8080/api'; // Update this URL if needed
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Project Structure

```
task-manager-frontend/
├── public/          # Static assets
├── src/
│   ├── components/  # Reusable UI components (TaskCard, TaskForm, etc.)
│   ├── context/     # React Context for state management (AuthContext)
│   ├── pages/       # Application pages (Home, Login, Dashboard, etc.)
│   ├── services/    # API service calls (authService, taskService)
│   ├── App.js       # Main application component with routing
│   └── index.css    # Global styles and Tailwind directives
├── package.json     # Project dependencies and scripts
└── README.md        # Project documentation
```

## License

This project is licensed under the MIT License.
