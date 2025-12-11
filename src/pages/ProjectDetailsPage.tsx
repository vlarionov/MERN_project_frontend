import { useEffect, useState, useContext } from "react";
import { apiClient } from "../clients/api";
import { useParams } from "react-router-dom";
import type { Project, Task } from "../types";
import { AuthContext } from "../context/AuthProvider";

import axios from "axios";

function ProjectDetailsPage() {
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // variables for updating
  const [updateTitle, setUpdateTitle] = useState('');
  const [updateDescription, setUpdateDescription] = useState('');
  const [updateTaskStatus, setUpdateTaskStatus] = useState('')
  const [updateTaskId, setUpdateTaskId] = useState('')

  const [showUpdate, setShowUpdate] = useState(false);

  const { projectId } = useParams();
  //console.log(projectId);

  // AuthContext
  const { token } = useContext(AuthContext)!;

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        setLoading(true);

        const res = await apiClient.get(`/api/projects/${projectId}`,
          { headers: 
            { Authorization: token}
          });
        console.log(res.data);

        setProject(res.data);
      } catch (error: any) {
        console.log(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [projectId]);

  useEffect(() => {
    const fetchProjectTasks = async () => {
      try {
        setLoading(true);

        const res = await apiClient.get(`/api/projects/${projectId}/tasks`,
          { headers: 
            { Authorization: token}
          });
        console.log(res.data);

        setTasks(res.data);
      } catch (error: any) {
        console.log(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectTasks();
  }, [projectId]);

  const handleDelete = async(taskId: string) => {
      //e.preventDefault();

      try{
          setLoading(true);
          console.log(`deleting thing with id: ${taskId}`)
          const res = await apiClient.delete(`/api/tasks/${taskId}`, {headers: {
                              Authorization: token
                          }})
          // update the projects array
          const updatedTasks = tasks.filter((item) => item._id !== taskId)
          setTasks(updatedTasks);
          

      } catch (error) {
          console.error(error);
      } finally {
          setLoading(false)
          setTitle("");
          setDescription("")
      }
  }

  const handleUpdate = async(task: Task) => {
      //e.preventDefault();

      try{
          setLoading(true);
          setShowUpdate(true);
          console.log(`updating thing with id: ${task._id}`)

          setUpdateTitle(task.title)
          setUpdateDescription(task.description);
          setUpdateTaskId(task._id)
          

      } catch (error) {
          console.error(error);
      } finally {
          setLoading(false)
          setTitle("");
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

            // index for updating array
            const index = tasks.findIndex(task => task._id === updateTaskId);


            const res = await apiClient2.put(`/api/tasks/${updateTaskId}`, {headers: {
                                Authorization: token
                            }, name: updateTitle, description: updateDescription, status: updateTaskStatus})
            
            // update this properly
            // setProjects(prev => (
            //     [...prev, res.data]
            // ))
            setTasks(prevItems => {
                const newItems = [...prevItems]; // Create a copy of the array
                newItems[index] = res.data; // Update the element in the copy
                return newItems; // Set state with the new copy
            })

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
            setTitle("");
            setDescription("")
            setShowUpdate(false)
        }
    }

  if (loading) return <div className="text-3xl text-white">Loading...</div>

  if (error) return <div className="text-3xl text-white">Error loading Project</div>

  return (
    <div className="text-white">
      <h1 className="text-4xl">Project Details</h1>
      <div className="mt-10">
        <div className="text-3xl">Project name: {project?.name}</div>
        <div className="text-xl">Project description: {project?.description}</div>

        <div className="w-full flex gap-5 mt-10">
                {tasks && tasks.map(task => (
                    <div key={task._id} className="text-white w-50 flex flex-col h-50 border border-red-500 p-2 text-center rounded">

                        <div className="font-bold">Title: {task.title}</div>
                        <div>Description: {task.description}</div>
                        <div>Status: {task.status}</div>
                        <button 
                            className="mt-auto bg-sky-500 rounded hover:cursor-pointer"
                            onClick={() => handleUpdate(task)}
                        >
                            Update Task
                        </button>

                        <button 
                            className="mt-auto bg-sky-500 rounded hover:cursor-pointer"
                            onClick={()=>handleDelete(task._id)}
                        >
                            Delete Task
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
                  <label htmlFor="project-name">Task Name: </label>
                  <input 
                      type="text" 
                      name="project-name" 
                      className="border"
                      value={updateTitle}
                      onChange={(e) => setUpdateTitle(e.target.value)}
                  />

                  <label htmlFor="project-description">Task Description: </label>
                  <input 
                      type="text" 
                      name="project-description" 
                      className="border"
                      value={updateDescription}
                      onChange={(e) => setUpdateDescription(e.target.value)}
                  />

                  <label htmlFor="task-status">Task Status: </label>
                  <select 
                    name="task-status" className="border"
                    onChange={(e) => setUpdateTaskStatus(e.target.value)}
                  >
                    <option value="todo">todo</option>
                    <option value="in-progress">in-progress</option>
                    <option value="done">done</option>
                  </select>

                  <input type="submit" value="Update Task" className="mt-auto bg-sky-500 rounded"/>

              </form>
          </div>}

      </div>
    </div>
  );
}

export default ProjectDetailsPage;
