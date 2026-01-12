export const getAllPosts = () => {
    return fetch("http://localhost:8088/posts?_embed=postLikes&_expand=topic")
    .then((res) => 
       res.json()
    )    
}
