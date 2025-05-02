import React, { useEffect, useState } from 'react';
import Msg_card from "./Msg_card";
import { useAuth0 } from "@auth0/auth0-react";

const Profile_feed = () => {
    const { user } = useAuth0(); // Get the logged-in user's info
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUserMessages = async () => {
            try {
                const [messagesResponse, usersResponse] = await Promise.all([
                    fetch(`http://localhost:3000/api/getMessages?userId=${user.sub}`), // Fetch messages
                    fetch("http://localhost:3000/api/getUser"), // Fetch all users
                ]);

                if (messagesResponse.ok && usersResponse.ok) {
                    const messagesData = await messagesResponse.json();
                    const usersData = await usersResponse.json();

                    // Map users to a dictionary for easy lookup
                    const usersMap = usersData.Users.reduce((map, user) => {
                        map[user.userId] = {
                            name: user.name || "Unknown User",
                            profilePicture: user.picture || "/defaultProfile.png", // Default fallback
                        };
                        return map;
                    }, {});

                    // Enrich messages with user details
                    const enrichedMessages = messagesData.messages.map((message) => {
                        const user = usersMap[message.userId] || {};
                        return {
                            ...message,
                            senderName: user.name,
                            senderProfilePicture: user.profilePicture,
                        };
                    });

                    setMessages(enrichedMessages);
                } else {
                    console.error("Failed to fetch messages or users");
                }
            } catch (error) {
                console.error("Error fetching user messages:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (user) {
            fetchUserMessages(); // Fetch messages only if the user is logged in
        }
    }, [user]);

    if (isLoading) {
        return <p>Loading messages...</p>;
    }

    if (messages.length === 0) {
        return <p>No messages found for this user.</p>;
    }

    return (
        <div className="container-fluid mt-2">
            <div className="row">
                <div className="card p-0 border-0">
                    <div className="card-body p-1">
                        {messages.map((message) => (
                            <Msg_card
                                key={message._id}
                                senderName={message.senderName}
                                senderProfilePicture={message.senderProfilePicture} // Pass profile picture
                                text={message.text}
                                topic={message.topic}
                                likes={message.likes}
                                comments={message.comments}
                                picture={message.picture}
                                messageId={message._id}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile_feed;
