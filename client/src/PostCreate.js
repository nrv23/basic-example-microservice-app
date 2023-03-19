import React, { useState } from 'react';
import axios from 'axios';

const PostForm = () => {

    const [title, setTitle] = useState('');


    const onSubmit = async e => {
        e.preventDefault();

        await axios.post('http://localhost:9000/posts',{
           title 
        });

        setTitle("");
    }

    return <div>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label> Title</label>
                <input onChange={({target:{value}}) => setTitle(value)} type="text" className="form-control" value={title} />
            </div>
            <button className="btn btn-primary">
                Submit
            </button>
        </form>
    </div>
}

export default PostForm