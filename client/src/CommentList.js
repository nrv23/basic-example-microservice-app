import React, { useState } from 'react';

const CommentLists = ({ comments }) => {

    const [commentLists, _] = useState(comments);
    const renderedComments = commentLists.map(({ id, content, status }) => {

        let currentContent;

        if (status === "approved") {
            currentContent = content;
        }

        else if (status === "pending") {
            currentContent = "This comment is awaiting moderation";
        }

        else { // rejected
            currentContent = "This comment has been rejected";
        }

        return <li key={id} >{currentContent}</li>
    });

    return <ul> {renderedComments} </ul>;
}

export default CommentLists;