import { useContext, useState } from "react";
//import { apiClient } from "../clients/api";

import { AuthContext } from "../context/AuthProvider";
//import { useNavigate } from "react-router-dom";

function UserPage() {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [showRegister, setShowRegister] = useState(false)

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    // AuthContext
    const { logIn, register, user, logOut } = useContext(AuthContext)!;

    //const navigate = useNavigate();

    const handleRegister = async (event: React.FormEvent) => {
        event.preventDefault()

        // call validation function...
        // see if the input fields are valid
        // nab this from annother project...
        if (!username || !email || !password) return;

        try {
            setError("");
            setLoading(true);
            console.log(`username: ${username}`)
            console.log(`email: ${email}`)

            // register user
            // make this a function in a separate module...
            // const resTest = await apiClient.get(
            //     `/api/users/login`
            // );

            // console.log(resTest.data)

            // const res = await apiClient.post(
            //     `/api/users/register` ,
            //     {
            //         username: username,
            //         email: email,
            //         password: password
            //     }
            // );

            // console.log(res.data)

            register(username, email, password);

        } catch (error: any) {
            console.error(error.message);
            setError(error.message)
        } finally {
            setLoading(false);
            setUsername("");
            setEmail("");
            setPassword("");
        }
    };

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault()

        // validate input fields ...
        if (!email || !password) return;

        try {
            setError("");
            setLoading(true);
            //console.log(`username: ${username}`)
            console.log(`email: ${email}`)

            // const res = await apiClient.post(
            //     `/api/users/login` ,
            //     {
            //         email: email,
            //         password: password
            //     }
            // );

            // need res.data.token
            // console.log(res.data.token)

            logIn(email, password);
            //navigate('/projects');

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

            {/* USER info */}
            {/* {user && <div className="text-3xl text-red-500 font-bold mt-10 text-center">
                User: {user.username}
                </div>} */}

            {/* REGISTER / LOGIN FORMS */}
            {user? 
            (<div className="border rounded mt-10 p-2 h-60 w-150 flex flex-col justify-around items-center">
                <div className="text-3xl font-bold mt-10 text-center">
                    User: {user.username}
                </div>
                <button 
                    className="border py-2 px-4 rounded"
                    onClick={logOut}
                >
                    Log out
                </button>
            </div>):
            (
                showRegister ? (
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
                            value="Login"
                            className="border py-2 px-4 rounded"
                        />
                    </form>
                )
            )}
            
                {/* TOGGLE REGISTER / LOGIN FORMS */}

                {!user &&(showRegister ? (
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
                ))}
        </div>
    );
}

export default UserPage