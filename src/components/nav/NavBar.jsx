import {Link} from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    return (
        <div className="navbar">
            <Link to="/">
                All Posts
            </Link>
        </div>
    )
}
