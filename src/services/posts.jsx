export const getAllPosts = () => {
  return fetch(
    'http://localhost:8088/posts?_embed=postLikes&_expand=topic'
  ).then((res) => res.json())
}

export const getPostById = (postId) => {
  return fetch(
    `http://localhost:8088/posts/${postId}?_expand=user&_expand=topic&_embed=postLikes`
  ).then((res) => res.json())
}

export const addLike = (likeObj) => {
  return fetch('http://localhost:8088/postLikes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(likeObj),
  })
}

export const createPost = (postObj) => {
  return fetch('http://localhost:8088/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postObj),
  })
}

export const deletePost = (postId) => {
  return fetch(`http://localhost:8088/posts/${postId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const updatePost = (postObj) => {
  return fetch(`http://localhost:8088/posts/${postObj.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postObj),
  })
}
