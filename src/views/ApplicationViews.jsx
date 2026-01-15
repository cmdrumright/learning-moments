import {Outlet, Route, Routes} from "react-router-dom"
import {NavBar} from "../components/nav/NavBar"
import {AllPosts} from "../components/posts/AllPosts"
import {PostDetails} from "../components/posts/PostDetails.jsx"
import {useEffect, useState} from "react"

export const ApplicationViews = () => {
    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
        const localLearningUser = localStorage.getItem("learning_user")
        const learningUserObject = JSON.parse(localLearningUser)
        setCurrentUser(learningUserObject)
    }, [])

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
                <Route path="posts/:postId" element={<PostDetails />} />
            </Route>
        </Routes>
    )
}
