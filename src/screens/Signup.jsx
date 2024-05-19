import { Link } from "react-router-dom";
import { useState } from "react";


const Signup = () => {

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/createuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
               name: credentials.name,
               email: credentials.email,
               password: credentials.password,
               location: credentials.geolocation
            })
        })
            const json=await response.json();
            console.log(json);
            console.log("Data submitted successfully:", credentials);

        if(!json.success){
            alert("Enter valid Credentials");
        }
    }

    const onChange = (event) => {
       setCredentials({...credentials,[event.target.name]:event.target.value})
    }

    return (
        <>
            <div className="container">
                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            autoComplete="name"
                            className="form-control"
                            name="name"
                            value={credentials.name}
                            onChange={onChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input
                            type="email autocomplete"
                            autoComplete="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            name="email"
                            value={credentials.email}
                            onChange={onChange}
                        />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input
                            type="password"
                            autoComplete="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            name="password"
                            value={credentials.password}
                            onChange={onChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
                        <input
                            type="text"
                            autoComplete="address"
                            className="form-control"
                            id="exampleInputAddress1"
                            name="geolocation"
                            value={credentials.geolocation}
                            onChange={onChange}
                        />
                    </div>

                    <div className="mb-3 form-check">
                        <input type="check autocompletebox" className="form-check-input" id="exampl autocompleteeCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div>

                    <button type="submit" className=" m-3 btn btn-success">Submit</button>
                    <Link to="/login" className="m-3 btn btn-danger">Already a user</Link>
                </form>
                {/* console.log(onSubmit); */}
            </div>
        </>
    )
}

export default Signup