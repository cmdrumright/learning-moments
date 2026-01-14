import {Outlet, Route, Routes} from "react-router-dom"
import {NavBar} from "../components/nav/NavBar"
import {AllPosts} from "../components/posts/AllPosts"

export const ApplicationViews = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <>
                        <NavBar />
                        <Outlet />
                    </>
                }
            >
                <Route index element={<AllPosts />} />
            </Route>
        </Routes>
    )
}
