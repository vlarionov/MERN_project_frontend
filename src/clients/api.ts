import axios from 'axios'

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
        Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjY5MzFjYjAxZGE0NGFhYzZkNmNlNmM2YSIsInVzZXJuYW1lIjoic2xhdiIsImVtYWlsIjoic2xhdkB0ZXN0LmNvbSIsInJvbGUiOiJ1c2VyIn0sImlhdCI6MTc2NDk1NjI3MCwiZXhwIjoxNzY0OTYzNDcwfQ.nhN5utopgEjAjrGF0LMyBHyXFBmCTNLWIs2q98qw3Gc'
    }
});