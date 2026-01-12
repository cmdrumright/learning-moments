import {useEffect, useState} from "react"
import {getAllPosts} from "../services/posts.jsx"
import "./Posts.css"

export const AllPosts = () => {
    const [allPosts, setAllPosts] = useState([])

    useEffect(() => {
        getAllPosts().then((postArray) => {
            setAllPosts(postArray)
            console.log(postArray)
        })
    }, [])

    return (
        <div className="all-post-container">
            {allPosts.map((post) => {
                return (
                    <div className="post-item" key={post.id}>
                        <h2>Title</h2>
                        <p>{post.title}</p>
                        <h2>Topic</h2>
                        <p>{post.topic.name}</p>
                        <h2>Likes</h2>
                        <p>{post.postLikes.length}</p>
                    </div>
                )
            })}
        </div>
    )

}
