export interface Project {
    name: string;
    description: string;
    _id: string
}

export interface User {
    _id: string;
    username: string;
    email: string;
    githubId?: string;
}

export interface Task {
    title: string;
    description: string;
    _id: string;
    project: string;
    status: ['todo', 'in-progress', 'done']
}