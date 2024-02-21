"use client";
import { useState } from 'react';

interface Comment {
    body: string;
};

const dummyComments: Array<Comment> = [
    {
        body: "This is a comment",
    },
    {
        body: "This is second comment",
    },
    {
        body: "This is third comment",
    }
];

export default function Home() {

    const[comments, setComments] = useState(dummyComments);
    const [commentBody, setCommentBody] = useState(''); // empty string

    const onComment = () => {
        const newComment: Comment = {
            body: commentBody, 
        };
        // Alternate method:
        // setComments(prev => [newComment, ...prev]);
        // Convenient method : 
        setComments([newComment, ...comments]);
        setCommentBody(""); // Resetting after comment is created
    }

    return(
    <div className="flex flex-col gap-6 h-screen w-screen p-6">
        <span className="">React Nested Components</span>
        <div>
            <div className="flex flex-col">
                {/* 
                We want the state to update as and when the comment is written
                and we need it to update on every keystroke.
                */}
                <input 
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
            </div>
            <div className="flex flex-col gap-4 mt-10">
                {comments.map((comment: Comment) => (
                    <div className="border-[1px] border-zinc-500 rounded-md">
                            {comment.body}
                    </div>
                ))}
            </div>
        </div>
    </div>
    );
}
