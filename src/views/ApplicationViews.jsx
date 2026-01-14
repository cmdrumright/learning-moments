import {Outlet, Route, Routes} from "react-router-dom"
import {AllPosts} from "../components/AllPosts"

export const ApplicationViews = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <>
                        <Outlet />
                    </>
                }
            >
                <Route index element={<AllPosts />} />
            </Route>
        </Routes>
    )
}
