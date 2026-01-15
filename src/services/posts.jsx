export const getAllPosts = () => {
    return fetch("http://localhost:8088/posts?_embed=postLikes&_expand=topic")
    .then((res) => 
       res.json()
    )    
}

export const getPostById = (postId) => {
    return fetch(`http://localhost:8088/posts/${postId}?_expand=user&_expand=topic&_embed=postLikes`)
    .then((res) => 
       res.json()
    )    
}
