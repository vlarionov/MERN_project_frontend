import { useEffect, useState, useContext } from "react";
import { apiClient } from "../clients/api";
import { Link } from "react-router-dom";
import type { Project } from "../types";
import { AuthContext } from "../context/AuthProvider";

import axios from 'axios'

function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    // variables for updating
    const [updateName, setUpdateName] = useState('');
    const [updateDescription, setUpdateDescription] = useState('');
    const [updateProjectId, setUpdateProjectId] = useState('')

    const [showUpdate, setShowUpdate] = useState(false);

    // AuthContext
    const { token } = useContext(AuthContext)!;

    // fetch projects should be called each time the token changes...
    // a lot of things need to be changed here....
    

    // for whatever reason using token and setToken doesnt cause a rerender,
    // but refreshing the page does, and the apiClient changes as well

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoading(true)
                console.log(`useEffect is being called`)
                console.log(apiClient.defaults.headers)

                // need to change the apiClient!
                const res = await apiClient.get('/api/projects', 
                    {headers: {
                                Authorization: token
                            }
                    });
                console.log(res.data);

                setProjects(res.data);
            } catch (error: any) {
                console.log(error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchProjects();

    }, []);

    if (loading) return <div className="text-3xl text-white">Loading...</div>

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();

        try{
            //console.log(`user: ${user._id}`)
            setLoading(true);
            
            // this works... for now
            const apiClient2 = axios.create({
                baseURL: import.meta.env.VITE_BACKEND_URL,
                headers: {
                    Authorization: token
                }
            })

            const res =await apiClient2.post('/api/projects', {headers: {
                                Authorization: token
                            }, name, description})
            setProjects(prev => (
                [...prev, res.data]
            ))

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
            setName("");
            setDescription("")
        }
    }

    const handleDelete = async(projectId: string) => {
        //e.preventDefault();

        try{
            setLoading(true);
            console.log(`deleting thing with id: ${projectId}`)
            await apiClient.delete(`/api/projects/${projectId}`, {headers: {
                                Authorization: token
                            }})
            // update the projects array
            const updatedProjects = projects.filter((item) => item._id !== projectId)
            setProjects(updatedProjects);
            

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
            setName("");
            setDescription("")
        }
    }

    const handleUpdate = async(project: Project) => {
        //e.preventDefault();

        try{
            setLoading(true);
            setShowUpdate(true);
            console.log(`updating thing with id: ${project._id}`)
            // const res = await apiClient.delete(`/api/projects/${projectId}`, {headers: {
            //                     Authorization: token
            //                 }})
            // // update the projects array
            // const updatedProjects = projects.filter((item) => item._id !== projectId)
            // setProjects(updatedProjects);
            setUpdateName(project.name)
            setUpdateDescription(project.description);
            setUpdateProjectId(project._id)
            

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
            setName("");
            setDescription("")
        }
    }

    const handleUpdateSubmit = async(e: React.FormEvent) => {
        e.preventDefault();

        try{
            //console.log(`user: ${user._id}`)
            setLoading(true);
            
            // this works... for now
            const apiClient2 = axios.create({
                baseURL: import.meta.env.VITE_BACKEND_URL,
                headers: {
                    Authorization: token
                }
            })

            // setName(updateName);
            // setDescription(updateDescription);

            // console.log(`updateName: ${updateName} , updateDescription: ${updateDescription}`)
            // console.log(`name: ${name} , description: ${description}`)

            // index for updating array
            const index = projects.findIndex(project => project._id === updateProjectId);


            const res = await apiClient2.put(`/api/projects/${updateProjectId}`, {headers: {
                                Authorization: token
                            }, name: updateName, description: updateDescription})
            
            // update this properly
            // setProjects(prev => (
            //     [...prev, res.data]
            // ))
            setProjects(prevItems => {
                const newItems = [...prevItems]; // Create a copy of the array
                newItems[index] = res.data; // Update the element in the copy
                return newItems; // Set state with the new copy
            })

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
            setName("");
            setDescription("")
            setShowUpdate(false)
        }
    }

    return (
        <div className="text-white">
            <h1 className="text-4xl font-bold text-white">Projects</h1>

            {/* TOKEN */}
             {/* <div className="text-3xl text-red-500 font-bold mt-10 text-center">
                Token: {token}
                </div> */}

            <form 
                onSubmit={handleSubmit}
                className="border p-2 h-50 mt-10 flex flex-col gap-2 rounded"
            >
                <label htmlFor="project-name">Project Name: </label>
                <input 
                    type="text" 
                    name="project-name" 
                    className="border"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <label htmlFor="project-description">Project Description</label>
                <input 
                    type="text" 
                    name="project-description" 
                    className="border"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <input type="submit" value="Create Project" className="mt-auto bg-sky-500 rounded"/>

            </form>

            {error && <div>{error}</div>}

            <div className="w-full flex gap-5 mt-10">
                {projects && projects.map(project => (
                    <div key={project._id} className="text-white w-50 flex flex-col h-50 border border-red-500 p-2 text-center rounded">

                        <div className="font-bold">{project.name}</div>
                        <div>{project.description}</div>
                        <Link
                            to={`/projects/${project._id}`}
                            className="mt-auto bg-sky-500 rounded"
                        >
                            See Project
                        </Link>

                        <button 
                            className="mt-auto bg-sky-500 rounded hover:cursor-pointer"
                            onClick={() => handleUpdate(project)}
                        >
                            Update Project
                        </button>

                        <button 
                            className="mt-auto bg-sky-500 rounded hover:cursor-pointer"
                            onClick={()=>handleDelete(project._id)}
                        >
                            Delete Project
                        </button>
                    </div>
                ))}
            </div>
            {showUpdate && 
                <div>
                    Update
                    <form 
                        onSubmit={handleUpdateSubmit}
                        className="border p-2 h-50 mt-10 flex flex-col gap-2 rounded"
                    >
                        <label htmlFor="project-name">Project Name: </label>
                        <input 
                            type="text" 
                            name="project-name" 
                            className="border"
                            value={updateName}
                            onChange={(e) => setUpdateName(e.target.value)}
                        />

                        <label htmlFor="project-description">Project Description</label>
                        <input 
                            type="text" 
                            name="project-description" 
                            className="border"
                            value={updateDescription}
                            onChange={(e) => setUpdateDescription(e.target.value)}
                        />

                        <input type="submit" value="Update Project" className="mt-auto bg-sky-500 rounded"/>

                    </form>
                </div>}
        </div>
    );
}

export default ProjectsPage