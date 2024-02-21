"use client";

import { useState } from 'react';

interface CommentItemProps {
    comment: Comment;
}

interface Comment {
    body: string;
    comments: Array<Comment>; // This is where the recursion happens
};

interface commentInputProps {
    // This takes in a newComment of the type Comment
    // And it returns nothing
    onComment: (newComment: Comment) => void;
}

const dummyComments: Array<Comment> = [
    {
        body: "This is a comment",
        comments: [],
    },
    {
        body: "This is second comment",
        comments: [],
    },
    {
        body: "This is third comment",
        comments: [],
    }
];

export default function Home() {

    const[comments, setComments] = useState(dummyComments);
    const onComment = (newComment: Comment) => {
        // Alternate method:
        // setComments(prev => [newComment, ...prev]);
        // Convenient method : 
        setComments(prev => [...comments, newComment]);
    }

    return(
    <div className="flex flex-col gap-6 h-screen w-screen p-6">
        <span className="">Nested Comment Component</span>
        {/* Zeroth Comment : Starts the thread */}
        <div>
            {/*<div className="flex flex-col">
                {/* 
                We want the state to update as and when the comment is written
                and we need it to update on every keystroke.
                */}
                {/*<input 
                    value={commentBody}
                    onChange={event => setCommentBody(event.target.value)}
                    placeholder="What are your thoughts ?" 
                    className="border-[1px] border-zinc-400 p-4 w-3/4"
                />
                <button 
                    className="border-[1px] rounded-full border-zinc-400 w-20"
                    onClick={() => onComment()}
                >
                    Comment
                </button>
            </div>*/}
            <CommentInput onComment={onComment}/>
            <div className="flex flex-col gap-4 mt-10">
                {comments.map((comment: Comment) => (
                    <CommentItem comment={comment} />
                ))}
            </div>
        </div>
    </div>
    );
}


// Inserting comments
const CommentItem = ({ comment }: CommentItemProps) => {

    // To enable or disable commenting we have a state
    const [isReplying, setIsReplying] = useState(false);
    // In nested comments, each comment has it's own set 
    // of comments so that has to be a separate state 
    const [comments, setComments] = useState(comment.comments);

    const onComment = (newComment: Comment) => {
        setComments(prev => [...prev, newComment]);
    };

    return(
        <div className="flex flex-col border-[1px] border-zinc-500 rounded-md p-2">
            <span>{comment.body}</span>
            {isReplying ? 
            <button
                className="border-[1px] rounded-full border-zinc-400 w-20"
                onClick={() => setIsReplying(false)}
            >
               Cancel 
            </button> :
            <button
                className="border-[1px] rounded-full border-zinc-400 w-20"
                onClick={() => setIsReplying(true)}
            >
               Reply 
            </button>}
            {/*isReplying && (
                <input 
                placeholder="What are your thoughts?"
                className="border-[1px] border-zinc-400 p-4 w-3/4"
                />
            )*/}
            {isReplying && <CommentInput onComment={onComment}/>}
            <div className="flex flex-col gap-4 mt-10">
                {comments.map((comment: Comment) => (
                    <CommentItem comment={comment} />
                ))}
            </div>
        </div>
    );
}

// Making a re-usable comment-input box
const CommentInput = ({ onComment }: commentInputProps) => {

    const [commentBody, setCommentBody] = useState(''); // empty string

    return (
        <div className='flex flex-col'>
        <input 
            value={commentBody}
            onChange={event => setCommentBody(event.target.value)}
            placeholder="What are your thoughts ?" 
            className="border-[1px] border-zinc-400 p-4 w-3/4"
        />
        <button
            className="border-[1px] rounded-full border-zinc-400 w-20"
            onClick={() => {
                onComment({ body: commentBody, comments: [] });
                setCommentBody(""); // Re-setting the body to be empty string
                }
            }
        >
                Comment
        </button>
        </div>
    );
}

