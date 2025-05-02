import React, { useEffect, useState } from "react";
import Msg_card from "./msg_card";

const Feed = () => {
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [messagesRes, usersRes] = await Promise.all([
          fetch("http://localhost:3000/api/getMessages"),
          fetch("http://localhost:3000/api/getUser"),
        ]);

        const messagesJson = await messagesRes.json();
        const usersJson = await usersRes.json();

        const messagesData = messagesJson.messages || [];
        const usersData = usersJson.Users || [];

        // Map the users data to a dictionary for easy lookup
        const usersMap = usersData.reduce((map, user) => {
          map[user.userId] = {
            picture: user.picture || "/defaultProfile.png", // Use default if no picture
            name: user.name || "Unknown User", // Add name to the map
          };
          return map;
        }, {});

        // Sort messages by createdAt in descending order (most recent first)
        const sortedMessages = messagesData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        const enrichedMessages = sortedMessages.map((message) => {
          const user = usersMap[message.userId] || {}; // Get user data from the map

          return {
            ...message,
            senderName: user.name || "Unknown User", // Use the name from the map
            senderProfilePicture: user.picture || "/defaultProfile.png", // Use the picture from the map
            picture: message.picture?.map((pic) => `http://localhost:3000/${pic}`) || [],
          };
        });

        setMessages(enrichedMessages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container-fluid mt-2">
      <div className="row">
        <div className="card p-0 border-0">
          <div className="card-body p-1">
            {messages.length > 0 ? (
              messages.map((message) => (
                <Msg_card
                  key={message._id}
                  senderName={message.senderName}
                  senderProfilePicture={message.senderProfilePicture}
                  text={message.text}
                  topic={message.topic}
                  likes={message.likes}
                  comments={message.comments}
                  picture={message.picture} // Pass images array
                  messageId={message._id} // Pass the message ID here
                />
              ))
            ) : (
              <p className="text-center my-3">No messages found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
