import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import ProjectsPage from "./pages/ProjectsPage"
import Navbar from "./components/Navbar"
import ProjectDetailsPage from "./pages/ProjectDetailsPage"


function App() {


  return (
    <>
      <div className="p-5 bg-zinc-900 min-h-screen">
        {/* <h1 className="text-4xl font-bold text-white">Project Manager App</h1> */}
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/projects" element={<ProjectsPage />}/>
          <Route path="/projects/:projectId" element={<ProjectDetailsPage />}/>
        </Routes>
      </div>
    </>
  )
}

export default App
