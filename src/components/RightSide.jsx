import React, { useEffect, useState } from 'react';
import './RightSide.css';
import News from './News';
import axios from 'axios';

const RightSide = () => {
  const [topics, setTopics] = useState([]);

  // Fetch topics from the backend
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/getMessages'); // Adjust the endpoint as per your backend
        const messages = response.data.messages; // Extract the messages array

        // Count occurrences of each topic (case-insensitive)
        const topicCounts = messages.reduce((acc, message) => {
          const topic = message.topic.toLowerCase(); // Convert to lowercase for case-insensitivity
          acc[topic] = (acc[topic] || 0) + 1;
          return acc;
        }, {});

        // Convert the topicCounts object to an array, sort by count (descending), and take the top 5
        const sortedTopics = Object.entries(topicCounts)
          .sort((a, b) => b[1] - a[1]) // Sort by count (highest to lowest)
          .slice(0, 5) // Take the top 5 topics
          .map(([topic, count]) => ({ topic, count })); // Convert to array of objects

        setTopics(sortedTopics);
      } catch (error) {
        console.error('Error fetching topics:', error);
      }
    };

    fetchTopics();
  }, []);

  return (
    <div className="right-side">
      <div className="card mb-3">
        <div className="card-body">
          <h1>Trending Topics</h1>
          <ol style={{fontSize : "25px"}}>
            {topics.map((item, index) => (
              <li key={index}>
                {item.topic} ({item.count})
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/*<div className="card">
        <div className="card-body">
          <News />
        </div>
      </div>*/}

    </div>
  );
};

export default RightSide;
