import React, { useEffect, useState } from "react";
import Comment_card from "./Comment_card";

const CommentFeed = ({ messageId }) => {
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const endpoint = messageId
                    ? `https://tradelyst-backend.onrender.com/api/getComments/${messageId}` // Fetch comments by messageId
                    : `https://tradelyst-backend.onrender.com/api/getComment`; // Fetch all comments

                const [commentsResponse, usersResponse] = await Promise.all([
                    fetch(endpoint),
                    fetch("https://tradelyst-backend.onrender.com/api/getUser"), // Fetch all users
                ]);

                if (commentsResponse.ok && usersResponse.ok) {
                    const commentsData = await commentsResponse.json();
                    const usersData = await usersResponse.json();

                    // Map users to a dictionary for easy lookup
                    const usersMap = usersData.Users.reduce((map, user) => {
                        map[user.userId] = {
                            name: user.name || "Unknown User",
                            profilePicture: user.picture || "/defaultProfile.png", // Default fallback
                        };
                        return map;
                    }, {});

                    // Enrich comments with user details
                    const enrichedComments = (messageId ? commentsData : commentsData.comments).map((comment) => {
                        const user = usersMap[comment.userId] || {};
                        return {
                            ...comment,
                            senderName: user.name,
                            senderProfilePicture: user.profilePicture,
                        };
                    });

                    setComments(enrichedComments);
                } else {
                    console.error("Failed to fetch comments or users");
                }
            } catch (error) {
                console.error("Error fetching comments:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchComments(); // Fetch comments
    }, [messageId]);

    if (isLoading) {
        return <p>Loading comments...</p>;
    }

    if (comments.length === 0) {
        return <p>No comments available for this message.</p>;
    }

    return (
        <div className="comment-feed">
            {comments.map((comment) => (
                <Comment_card
                    key={comment._id}
                    senderName={comment.senderName}
                    senderProfilePicture={comment.senderProfilePicture}
                    text={comment.text}
                    likes={comment.likes}
                    picture={comment.picture}
                    commentId={comment._id}
                />
            ))}
        </div>
    );
};

export default CommentFeed;