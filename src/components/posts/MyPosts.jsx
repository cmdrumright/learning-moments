import {useEffect, useState} from "react"
import {getAllPosts, deletePost} from "../../services/posts.jsx"
import {FilterBar} from "../FilterBar.jsx"
import "./Posts.css"
import {Link} from "react-router-dom"

export const MyPosts = ({currentUser}) => {
    const [allPosts, setAllPosts] = useState([])
    const [filterTopic, setFilterTopic] = useState(0)
    const [filteredPosts, setFilteredPosts] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [searchedPosts, setSearchedPosts] = useState([])

    useEffect(() => {
        loadMyPosts()
    }, [currentUser])

    useEffect(() => {
        const foundPosts = allPosts.filter((post) => filterTopic ? post.topic.id === filterTopic : true)
        setFilteredPosts(foundPosts)
    }, [filterTopic, allPosts])

    useEffect(() => {
        if (searchTerm === "") {
            setSearchedPosts(filteredPosts)
        } else {
            const foundPosts = filteredPosts.filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()))
        setSearchedPosts(foundPosts)
        }
    }, [filteredPosts, searchTerm])

    const handleDelete = (postId) => {
        deletePost(postId).then(() => {
            loadMyPosts()
        })
    }

    const loadMyPosts = () => {
        getAllPosts().then((postArray) => {
            const myPosts = postArray.filter((post) => post.userId === currentUser.id)
            setAllPosts(myPosts)
        })
    }

    return (<>
        <FilterBar setFilterTopic={setFilterTopic} setSearchTerm={setSearchTerm}/>
        <div className="all-post-container">
            {searchedPosts.map((post) => {
                return (
                    <div className="post-item" key={post.id}>
                        <Link to={`/posts/${post.id}`}>
                            <p className="post-title">{post.title}</p>
                        </Link>
                        <h2>Topic</h2>
                        <p>{post.topic.name}</p>
                        <h2>Likes</h2>
                        <p>{post.postLikes.length}</p>
                        <button onClick={() => handleDelete(post.id)}>Delete</button>
                    </div>
                )
            })}
        </div>
    </>)
}
