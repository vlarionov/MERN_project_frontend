import { useState } from "react";

function UserPage() {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [showRegister, setShowRegister] = useState(true)

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleRegister = async (event: React.FormEvent) => {
        event.preventDefault()
        try {
            setError("");
            setLoading(true);
            console.log(`username: ${username}`)
            console.log(`email: ${email}`)

        } catch (error: any) {
            console.error(error.message);
            setError(error.message)
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault()
        try {
            setError("");
            setLoading(true);
            //console.log(`username: ${username}`)
            console.log(`email: ${email}`)

        } catch (error: any) {
            console.error(error.message);
            setError(error.message)
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="text-white flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-white">User Page</h1>

            {/* ERROR message */}
            {error && <div className="text-3xl text-red-500 font-bold mt-10 text-center">
                Error: {error}
                </div>}

            {/* REGISTER / LOGIN FORMS */}
            {showRegister ? (
                <form 
                    onSubmit={handleRegister}
                    className="border rounded mt-10 p-2 h-60 w-150 flex flex-col justify-around items-center"
                >

                    <div className="texl-xl font-bold">Register</div>

                    <label htmlFor="username">
                        Username:
                        <input
                            type="text"
                            name="username"
                            id=""
                            value={username}
                            onChange={(e)=> setUsername(e.target.value)}
                            className="ml-2 border rounded"
                        />
                    </label>

                    <label htmlFor="email">
                        Email:
                        <input
                            type="email"
                            name="email"
                            id=""
                            value={email}
                            onChange={(e)=> setEmail(e.target.value)}
                            className="ml-10 border rounded"
                        />
                    </label>

                    <label htmlFor="password">
                        Password:
                        <input
                            type="password"
                            name="password"
                            id=""
                            value={password}
                            onChange={(e)=> setPassword(e.target.value)}
                            className="ml-3 border rounded"
                        />
                    </label>

                    <input 
                        type="submit"
                        value="Register"
                        className="border py-2 px-4 rounded"
                    />

                    {loading && <div className="animate-pulse">Loading...</div>}
                </form>
            ) : (
                <form
                    onSubmit={handleLogin}
                    className="border rounded mt-10 p-2 h-60 w-150 flex flex-col justify-around items-center" 
                >
                    <div className="text-xl font-bold">Login</div>

                    <label htmlFor="email">
                        Email:
                        <input
                            type="email"
                            name="email"
                            id=""
                            value={email}
                            onChange={(e)=> setEmail(e.target.value)}
                            className="ml-10 border rounded"
                        />
                    </label>

                    <label htmlFor="password">
                        Password:
                        <input
                            type="password"
                            name="password"
                            id=""
                            value={password}
                            onChange={(e)=> setPassword(e.target.value)}
                            className="ml-3 border rounded"
                        />
                    </label>

                    <input 
                        type="submit"
                        value="Register"
                        className="border py-2 px-4 rounded"
                    />
                </form>
            )}
            
            {/* TOGGLE REGISTER / LOGIN FORMS */}

            {showRegister ? (
                <div>
                    Already have an account?{" "}
                    <span
                        className="text-blue-500 hover:cursor-pointer"
                        onClick={() => setShowRegister(false)}
                    >
                        Sign in
                    </span>{" "}
                </div>
            ) : (
                <div>
                    Don't have an account?{" "}
                    <span
                        className="text-blue-500 hover:cursor-pointer"
                        onClick={() => setShowRegister(true)}
                    >
                        Sign up
                    </span>{" "}
                </div>
            )}
        </div>
    );
}

export default UserPage