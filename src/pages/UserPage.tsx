import { useState } from "react";

function UserPage() {

    const [username, setUsername] = useState("")

    return (
        <div className="text-white flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-white">User Page</h1>
            <form className="border rounded mt-10 p-2 h-60 w-150 flex flex-col justify-around items-center">

                <div>Register</div>

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
            </form>
            
        </div>
    );
}

export default UserPage