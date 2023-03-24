import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentCreate from './CommentCreate';
import CommentLists from './CommentList';



const PostList = () => {

    const [postList, setPosts] = useState({});
    const fetchPosts = async () => {
        const { data } = await axios('http://posts.com/posts');
        setPosts(data);
    };

    useEffect(() => {
        fetchPosts(); // si una funcion que devuelve una promesa no se resuelve, el contenido interno se ejecuta aunque la promesa
        // no se resuelva
    }, []);

    const renderedPosts = Object.values(postList).map(post => (
        <div
            className="card"
            style={{ with: '30%', marginBottom: '20px' }}
            key={post.id}
        >
            <div className="card-body">
                <h3>{post.title}</h3>
                <CommentLists comments={post.comments} />
                <CommentCreate postId={post.id} />
            </div>
        </div>
    ));

    return <div className="d-flex flex-row flex-wrap justify-content-between">
        {renderedPosts}
    </div>;
}

export default PostList;