import {Link} from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    return (
        <ul className="navbar">
            <li className="navbar-item">
                <Link to="/">
                    All Posts
                </Link>
            </li>
            {localStorage.getItem("learning_user") ? (
              <li className="navbar-item">
                <Link
                  to=""
                  onClick={() => {
                    localStorage.removeItem("learning_user")
                    navigate("/login", { replace: true })
                  }}
                >
                  Logout
                </Link>
              </li>
            ) : (
              ""
            )}
        </ul>
    )
}
