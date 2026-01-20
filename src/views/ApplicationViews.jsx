import { Outlet, Route, Routes } from 'react-router-dom'
import { NavBar } from '../components/nav/NavBar'
import { AllPosts } from '../components/posts/AllPosts'
import { MyPosts } from '../components/posts/MyPosts.jsx'
import { PostDetails } from '../components/posts/PostDetails.jsx'
import { NewPost } from '../components/posts/NewPost.jsx'
import { useEffect, useState } from 'react'
import { EditPost } from '../components/posts/EditPost'

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    const localLearningUser = localStorage.getItem('learning_user')
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
        <Route path="posts/:postId">
          <Route index element={<PostDetails currentUser={currentUser} />} />
          <Route path="edit" element={<EditPost currentUser={currentUser} />} />
        </Route>
        <Route path="new" element={<NewPost currentUser={currentUser} />} />
        <Route path="myposts" element={<MyPosts currentUser={currentUser} />} />
      </Route>
    </Routes>
  )
}
