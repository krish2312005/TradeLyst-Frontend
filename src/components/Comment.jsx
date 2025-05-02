import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react"; // Import Auth0 for session management

const Comment = ({ messageId }) => {
    const { user } = useAuth0(); // Get the current session user
    const [text, setText] = useState("");
    const [picture, setPicture] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleFileChange = (event) => {
        setPicture(event.target.files[0]); // Store the selected file
    };

    const handleSubmit = async () => {
        if (!text.trim()) {
            alert("Comment text cannot be empty.");
            return;
        }

        if (!user || !messageId) {
            alert("User or message ID is missing.");
            return;
        }

        setIsSubmitting(true);

        const formData = new FormData();
        formData.append("userId", user.sub); // Pass the current session userId
        formData.append("messageId", messageId); // Pass the messageId
        formData.append("text", text);
        formData.append("likes", 0); // Default likes to 0
        if (picture) {
            formData.append("picture", picture); // Attach the picture if available
        }

        try {
            const response = await fetch("https://tradelyst-backend.onrender.com/api/PostComment", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const savedComment = await response.json();
                alert("Comment posted successfully!");
                setText(""); // Clear the text area
                setPicture(null); // Clear the file input
            } else {
                alert("Failed to post the comment.");
            }
        } catch (error) {
            console.error("Error posting comment:", error);
            alert("An error occurred while posting the comment.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="card">
            <div className="card-body">
                <div className="post-panel">
                    <div className="row">
                        <div className="col">
                            <textarea
                                className="form-control"
                                id="tweet-text"
                                rows="3"
                                placeholder="Comment Here"
                                maxLength="280"
                                value={text}
                                onChange={(e) => setText(e.target.value)} // Update state on text change
                            ></textarea>
                            <div className="post-actions d-flex justify-content-between align-items-center mt-3">
                                <div className="d-flex flex-row gap-3">
                                    <input
                                        className="form-control"
                                        type="file"
                                        id="formFileMultiple"
                                        onChange={handleFileChange} // Handle file selection
                                    />
                                </div>

                                <div className="d-flex align-items-center">
                                    <button
                                        id="tweet-btn"
                                        className="btn btn-outline-success"
                                        onClick={handleSubmit} // Submit the comment
                                        disabled={isSubmitting} // Disable button while submitting
                                    >
                                        {isSubmitting ? "Posting..." : "Comment"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Comment;
