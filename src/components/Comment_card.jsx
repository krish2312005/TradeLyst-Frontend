import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import "./Msg_card.css";

const Comment_card = ({ senderName, senderProfilePicture, text, likes, picture, commentId }) => {
    const [isFullScreen, setIsFullScreen] = useState(false); // State for full-screen mode
    const [selectedImage, setSelectedImage] = useState(null); // State to store selected image for full-screen view
    const [currentLikes, setCurrentLikes] = useState(likes); // Local state for likes
    const [isLiked, setIsLiked] = useState(false); // State to track if the button has been clicked

    // Check if the user has already liked this comment
    useEffect(() => {
        const likedComments = JSON.parse(localStorage.getItem("likedComments")) || [];
        if (likedComments.includes(commentId)) {
            setIsLiked(true);
        }
    }, [commentId]);

    const handleLike = async () => {
        if (isLiked) return; // Prevent multiple clicks

        try {
            const response = await fetch(`http://localhost:3000/api/updateComment/${commentId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    likes: currentLikes + 1, // Increment likes
                }),
            });

            if (response.ok) {
                setCurrentLikes((prevLikes) => prevLikes + 1); // Update likes in the UI
                setIsLiked(true); // Disable the button after clicking

                // Save the liked comment ID to localStorage
                const likedComments = JSON.parse(localStorage.getItem("likedComments")) || [];
                likedComments.push(commentId);
                localStorage.setItem("likedComments", JSON.stringify(likedComments));
            } else {
                console.error("Failed to update likes");
            }
        } catch (error) {
            console.error("Error updating likes:", error);
        }
    };

    const openFullScreen = (picUrl) => {
        setSelectedImage(picUrl);
        setIsFullScreen(true);
    };

    const closeFullScreen = () => {
        setIsFullScreen(false);
        setSelectedImage(null);
    };

    return (
        <div className="card p-0 mb-1">
            {/* Card Header */}
            <div className="card-header">
                <div className="row">
                    <div className="col d-flex flex-row align-items-center gap-3">
                        <Link to="/profile" style={{ textDecoration: "none", color: "inherit" }}>
                            <img
                                src={senderProfilePicture || "/defaultProfile.png"} // Default profile fallback
                                className="img-thumbnail rounded-circle p-0 border-0"
                                style={{ height: "50px", width: "50px" }}
                                alt="Profile"
                            />
                        </Link>
                        <Link to="/profile" style={{ textDecoration: "none", color: "inherit" }}>
                            <h2 style={{ margin: "0px", fontSize: "20px" }}>{senderName}</h2>
                        </Link>
                        <button
                            type="button"
                            className="btn btn-outline-primary position-relative ms-auto"
                            onClick={handleLike} // Add onClick handler for likes
                            disabled={isLiked} // Disable the button if already clicked
                        >
                            <FontAwesomeIcon icon={faThumbsUp} /> {currentLikes}
                        </button>
                    </div>
                </div>
            </div>

            {/* Card Body */}
            <div className="card-body">
                <p>{text}</p>

                {/* If pictures exist, display them */}
                {picture && picture.length > 0 && (
                    <div className="mt-3">
                        {picture.map((picUrl, index) => (
                            <img
                                key={index}
                                src={picUrl.startsWith("http") ? picUrl : `/${picUrl}`} // If not full URL, add slash
                                alt="Comment Pic"
                                className="img-fluid rounded mb-2"
                                style={{ maxHeight: "200px", width: "300px", objectFit: "cover", cursor: "pointer" }}
                                onClick={() => openFullScreen(picUrl)} // Open image in full screen when clicked
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Full-screen image modal */}
            {isFullScreen && (
                <div className="fullscreen-modal">
                    <div className="modal-content">
                        <button
                            className="btn-close"
                            style={{
                                position: "fixed",
                                top: "10px",
                                right: "10px",
                                background: "transparent",
                                border: "none",
                                fontSize: "20px",
                                color: "white",
                                cursor: "pointer",
                            }}
                            onClick={closeFullScreen}
                        >
                            ×
                        </button>
                        <img
                            src={selectedImage}
                            alt="Full Screen"
                            style={{ width: "100%", height: "auto" }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Comment_card;
