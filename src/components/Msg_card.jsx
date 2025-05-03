import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faComment } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import './Msg_card.css';

const Msg_card = ({ senderName, senderProfilePicture, text, topic, likes, comments, picture, messageId, disableActions = false }) => {
    //console.log("Message ID:", messageId); // Debugging: Check if messageId is passed correctly
    const [isFullScreen, setIsFullScreen] = useState(false); // State for full-screen mode
    const [selectedImage, setSelectedImage] = useState(null); // State to store selected image for full-screen view
    const [currentLikes, setCurrentLikes] = useState(likes); // Local state for likes
    const [isLiked, setIsLiked] = useState(false); // State to track if the button has been clicked

    const linkStyle = {
        textDecoration: "none",
        color: "inherit",
    };

    // Check if the user has already liked this message
    useEffect(() => {
        const likedMessages = JSON.parse(localStorage.getItem('likedMessages')) || [];
        if (likedMessages.includes(messageId)) {
            setIsLiked(true);
        }
    }, [messageId]);

    const openFullScreen = (picUrl) => {
        setSelectedImage(picUrl);
        setIsFullScreen(true);
    };

    const closeFullScreen = () => {
        setIsFullScreen(false);
        setSelectedImage(null);
    };

    const handleLike = async () => {
        if (isLiked) return; // Prevent multiple clicks

        try {
            const response = await fetch(`https://tradelyst-backend.onrender.com/api/updateMessage/${messageId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    likes: currentLikes + 1, // Increment likes
                }),
            });

            if (response.ok) {
                setCurrentLikes((prevLikes) => prevLikes + 1); // Update likes in the UI
                setIsLiked(true); // Disable the button after clicking

                // Save the liked message ID to localStorage
                const likedMessages = JSON.parse(localStorage.getItem('likedMessages')) || [];
                likedMessages.push(messageId);
                localStorage.setItem('likedMessages', JSON.stringify(likedMessages));
            } else {
                console.error('Failed to update likes');
            }
        } catch (error) {
            console.error('Error updating likes:', error);
        }
    };

    // Function to parse text and convert URLs into clickable links
    const parseTextWithLinks = (text = "") => {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        return text.split(urlRegex).map((part, index) => {
            if (urlRegex.test(part)) {
                return (
                    <a
                        key={index}
                        href={part}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "blue", textDecoration: "underline" }}
                    >
                        {part}
                    </a>
                );
            }
            return part;
        });
    };

    return (
        <div className="card p-0 mb-1">
            <div className="card-header">
                <div className="row">
                    <div className="col d-flex flex-row align-items-center gap-3" style={{ cursor: "pointer" }}>
                        <Link to="/profile" style={linkStyle}>
                            <img
                                src={senderProfilePicture || "/defaultProfile.png"} // default profile fallback
                                className="img-thumbnail rounded-circle p-0 border-0"
                                style={{ height: "50px", width: "50px" }}
                                alt="Profile"
                            />
                        </Link>
                        <Link to="/profile" style={linkStyle}>
                            <h2 style={{ margin: "0px", fontSize: "20px" }}>{senderName}</h2>
                        </Link>

                        {!disableActions && (
                            <>
                                <p style={{ margin: "0px", fontSize: "16px" }}>- {topic}</p>
                            </>
                        )}
                    </div>

                    <div className="col d-flex justify-content-end gap-3">
                        <button
                            type="button"
                            className="btn btn-outline-primary position-relative"
                            onClick={handleLike} // Add onClick handler for likes
                            disabled={isLiked} // Disable the button if already clicked
                        >
                            <FontAwesomeIcon icon={faThumbsUp} /> {currentLikes}
                        </button>

                        {!disableActions && (
                            <>
                                <button type="button" className="btn btn-outline-primary position-relative">
                                    <FontAwesomeIcon icon={faComment} /> {comments}
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div className="card-body" style={{ cursor: "text" }}>
                {/* Parse text to make links clickable */}
                {parseTextWithLinks(text)}

                {/* If pictures exist, display them */}
                {picture && picture.length > 0 && (
                    <div className="mt-3">
                        {picture.map((picUrl, index) => (
                            <img
                                key={index}
                                src={picUrl.startsWith("http") ? picUrl : `/${picUrl}`} // if not full url, add slash
                                alt="Message Pic"
                                className="img-fluid rounded mb-2"
                                style={{ maxHeight: "200px", width: "300px", objectFit: "cover", cursor: "pointer" }}
                                onClick={() => openFullScreen(picUrl)} // Open image in full screen when clicked
                            />
                            
                        ))}
                    </div>
                )}
                <div className="mt-2">
                    <Link
                        to={{
                            pathname: "/message",
                        }}
                        state={{
                            messageData: {
                                senderName,
                                senderProfilePicture,
                                text,
                                topic,
                                likes,
                                comments,
                                picture,
                                messageId,
                            },
                        }}
                        style={linkStyle}
                    >
                        {!disableActions && (
                            <>
                                <button className="btn btn-link p-0" style={{ textDecoration: "none" }}>
                                    Read More
                                </button>
                            </>
                        )}
                    </Link>
                </div>
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
                                cursor: "pointer"
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

export default Msg_card;
