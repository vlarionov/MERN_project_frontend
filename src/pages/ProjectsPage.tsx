import { useEffect, useState, useContext } from "react";
import { apiClient } from "../clients/api";
import { Link } from "react-router-dom";
import type { Project } from "../types";
//import { AuthContext } from "../context/AuthProvider";



function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    // AuthContext
    //const { token } = useContext(AuthContext)!;

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
                const res = await apiClient.get('/api/projects');
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
            setLoading(true);
            const res =await apiClient.post('/api/projects', {name, description})
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
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProjectsPage