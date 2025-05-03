import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Post = () => {
    const { user } = useAuth0(); // Get the Auth0 user object
    const [tweetText, setTweetText] = useState("");
    const [topic, setTopic] = useState("");
    const [files, setFiles] = useState(null);

    const handleFileChange = (e) => {
        setFiles(e.target.files); // Store multiple files
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create a FormData object to handle file uploads
        const formData = new FormData();
        formData.append("text", tweetText);
        formData.append("topic", topic);
        formData.append("userId", user.sub); // Auth0 user ID

        if (files) {
            Array.from(files).forEach((file) => {
                formData.append("pictures", file); // Use 'pictures' as the key for multiple files
            });
        }

        try {
            // Send the form data to your backend API
            const response = await axios.post(
                "https://tradelyst-backend.onrender.com/api/PostMessage", // Replace with your backend endpoint
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            // Show success toast
            toast.success("Post submitted successfully!");
            //console.log("Post submitted successfully:", response.data);

            // Clear the form fields
            setTweetText("");
            setTopic("");
            setFiles(null);
        } catch (error) {
            // Show error toast
            toast.error("Error submitting post. Please try again.");
            console.error("Error submitting post:", error);
        }
    };

    return (
        <div className="card">
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="post-panel">
                        <div className="row">
                            <div className="col">
                                <textarea
                                    className="form-control"
                                    id="tweet-text"
                                    rows="3"
                                    placeholder="What's happening?"
                                    maxLength="280"
                                    value={tweetText}
                                    onChange={(e) => setTweetText(e.target.value)}
                                ></textarea>
                                <div className="post-actions d-flex justify-content-between align-items-center mt-3">
                                    <div className="d-flex flex-row gap-3">
                                        <input
                                            className="form-control"
                                            type="file"
                                            id="formFileMultiple"
                                            multiple
                                            onChange={handleFileChange} // Handle multiple files
                                        />
                                        <input
                                            className="form-control"
                                            type="text"
                                            placeholder="Topic"
                                            value={topic}
                                            onChange={(e) => setTopic(e.target.value)}
                                        />
                                    </div>

                                    <div className="d-flex align-items-center">
                                        <button
                                            id="tweet-btn"
                                            className="btn btn-outline-success"
                                            type="submit"
                                        >
                                            Post
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            {/* Toast container to display notifications */}
            <ToastContainer />
        </div>
    );
};

export default Post;
