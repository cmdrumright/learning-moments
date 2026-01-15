import {useNavigate, useParams} from "react-router-dom"
import {getPostById, addLike} from "../../services/posts.jsx"
import {useEffect, useState} from "react"

export const PostDetails = ({currentUser}) => {
    const [currentPost, setCurrentPost] = useState({})
    const {postId} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getPostById(postId).then(setCurrentPost)
    }, [postId])
    
    const likePost = () => {
        const likeObj = {
            userId: currentUser.id,
            postId: currentPost.id
        }
        addLike(likeObj).then(() =>{
            navigate("/favorites")
        })
    }

    //  Then the title, author, topic, date, body, and number of likes should display for the post.
    return(
        <div className="post-item">
            <h2 className="post-title">{currentPost.title}</h2>
            <p>{currentPost.user?.fullName}</p>
            <h3>{currentPost.topic?.name}</h3>
            <h4>{currentPost.date}</h4>
            <p>{currentPost.body}</p>
            <footer>
                {currentPost.postLikes?.length} likes
                {currentPost.user?.id === currentUser.id 
                    ? 
                        <button className="edit-button"
                            onClick={() => {navigate("edit")}}
                        >
                            Edit Post
                        </button>
                    :
                        currentPost.postLikes?.find((like) => like.userId === currentUser.id)
                        ? "" :
                        <button className="like-button"
                            onClick={likePost}
                        >
                            Like Post
                        </button>
                }
            </footer>
        </div>
    )
}
