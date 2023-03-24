import React, { useState } from 'react'
import axios from 'axios';

const CommentCreate = ({ postId }) => {

    const [content, setContent] = useState('');

    const onSubmit = async e => {

        e.preventDefault();

        await axios.post(`http://posts.com/posts/${postId}/comments`, { content });
        setContent('');
    }

    return (

        <div>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>New Comment</label>
                    <input onChange={({ target: { value } }) => setContent(value)} type="text" className="form-control" value={content} />
                </div>
                <button className="btn btn-primary" >Submit</button>
            </form>
        </div>
    );
}

export default CommentCreate;