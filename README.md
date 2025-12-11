# ========================================
# Description ============================
# ========================================

This is a simple project manager app with user accounts. A user needs to create an account by registering on the User Page, and will then be able to login with the registered credentials, also on the User Page. Once logged in, the user can log out from the User Page. On the Projects page, there will be a list of projects belonging to the logged in user, if they have any. The user can create, update, and delete projects. The user can also see details of a specific project on a separate project page. On the project page, there will be a list of tasks associated with the project, if there are any. A user can create, update, and delete tasks belonging to the current project page.

## frontend live demo:
https://monumental-crumble-17808a.netlify.app/

## backend live demo:
https://mern-project-1uma.onrender.com/

## frontend github repository:
https://github.com/vlarionov/MERN_project_frontend

## backend github repository:
https://github.com/vlarionov/MERN_project

# ========================================
# Setup ==================================
# ========================================

## Backend ---------------------------------------
One needs to set the following environment variables in a .env file in the root directory of the project:
- MONGO_URI
- JWT_SECRET
- GITHUB_CLIENT_ID
- GITHUB_CLIENT_SECRET
- GITHUB_CALLBACK_URL
- FRONTEND_URL

In order to run the backend server, navigate to the root directory of the project and execute the command "npm run dev". This will have nodemon run the server continuously. To stop the server, press CRTL (CMD on Mac) + C.


## Frontend --------------------------------------
One needs to set the following environment variables in a .env file in the root directory of the project:
- VITE_BACKEND_URL

In order to run the frontend application, navigate to the root directory of the project and execute the command "npm run dev". To stop running the application, press CTRL (CMD on Mac) + C.


# ========================================
# API endpoints ==========================
# ========================================

## user endpoints --------------------------------

- GET /api/users
    * Retrieves all users in the database. Accessible by administrator only.

- GET /api/users/id
    * Retrieves user information with id "id".
    
- POST /api/users/register
    * Registers new user. Body of API request must be composed of { username: string, email: string, password: string} object.

- POST /api/users/login
    * Logs in user and returns a jwt token that is added to the header of all requests until the user logs out. Body of API request must be composed of { email: string, password: string} object.


## project endpoints -----------------------------
### In order to access any project endpoints, user must be logged in first. 

- GET /api/projects
    * Retrieves all projects belonging to the logged in user.
    
- GET /api/projects/projectId
    * Retrieves project information with id "projectId".
    
- POST /api/projects
    * Creates a new project. Body of API request must be composed of { name: string, description: string} object.
    
- PUT /api/projects/projectId
    * Updates project with id "projectId".
    
- DELETE /api/projects/projectId
    * Deletes project with id "projectId", as well as all of its children tasks.
    
- POST /api/projects/projectId/tasks
    * Creates a new task as a child of the project with id "projectId". Body of API request must be composed of { title: string, description: string, status: ['todo', 'in-progress', 'done'] } object.
    
- GET /api/projects/projectId/tasks
    * Retrieves all child tasks of the project with id "projectId".


## task endpoints --------------------------------
### In order to access any task endpoints, user must be logged in first.

- PUT /api/tasks/taskId
    * Updates task with id "taskId".
    
- DELETE /api/tasks/taskId
    * Deletes task with id "taskId".
