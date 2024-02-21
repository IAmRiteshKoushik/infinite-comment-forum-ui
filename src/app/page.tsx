"use client";
import { useState } from 'react';

interface Comment {
    body: string;
    comment: Array<Comment>; // This is where the recursion happens
};

const dummyComments: Array<Comment> = [
    {
        body: "This is a comment",
        comment: [],
    },
    {
        body: "This is second comment",
        comment: [],
    },
    {
        body: "This is third comment",
        comment: [],
    }
];

export default function Home() {

    const[comments, setComments] = useState(dummyComments);
    const [commentBody, setCommentBody] = useState(''); // empty string

    const onComment = () => {
        const newComment: Comment = {
            body: commentBody, 
            comment: [],
        };
        // Alternate method:
        // setComments(prev => [newComment, ...prev]);
        // Convenient method : 
        setComments([newComment, ...comments]);
        setCommentBody(""); // Resetting after comment is created
    }

    // In Nested Comments system :
    // 1 - Every comment has its own dynamically generated state variables
    // 2 - This 

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
                    <CommentItem comment={comment} />
                ))}
            </div>
        </div>
    </div>
    );
}

interface CommentItemProps {
    comment: Comment;
}

// Inserting comments
const CommentItem = ({ comment }: CommentItemProps) => {

    // To enable or disable commenting we have a state
    const [isReplying, setIsReplying] = useState(false);
    // In nested comments, each comment has it's own set 
    // of comments so that has to be a separate state 


    return(
        <div className="flex flex-col border-[1px] border-zinc-500 rounded-md">
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
            {isReplying && (
                <input 
                placeholder="What are your thoughts?"
                className="border-[1px] border-zinc-400 p-4 w-3/4"
                />
            )}
        </div>
    )

}
