import { Link,useNavigate } from "react-router-dom"

const Navbar = () => {

const navigate=useNavigate();

const handleLogout = () =>{
    localStorage.removeItem("authToken");
    navigate("/login");
}

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">GoFood</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">    {/*me-auto take full width*/}
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
              </li>


              {/*When auth token is present in local storage then MyOrder is shown*/}
              {(localStorage.getItem("authToken")) ?
                <li className="nav-item">
                  <Link className="nav-link active fs-5" aria-current="page" to="/">My Orders</Link>
                </li>
                :
                ""}
            </ul>

            {/*When auth token is not present in local storage then MyOrder is shown*/}
            {(!localStorage.getItem("authToken")) ?
              <div>
                <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                <Link className="btn bg-white text-success mx-1" to="/createuser">SignUp</Link>
              </div>
              :
              <div>
                <div className="btn bg-white text-success mx-2">
                  My Cart
                </div>
                <div className="btn bg-white text-danger mx-2" onClick={handleLogout}>
                  Logout
                </div>

              </div>

            }

          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar