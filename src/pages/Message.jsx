import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import Sidepanel from "../components/Sidepanel";
import CommentFeed from "../components/CommentFeed";
import Post from "../components/Post";
import Comment from "../components/Comment";
import RightSide from "../components/RightSide";
import Ticker from "../components/Ticker";
import Msg_card from '../components/Msg_card';
import { useLocation } from "react-router-dom";

const Message = () => {
    const location = useLocation();
    const messageData = location.state?.messageData; // Access the passed message data

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12 p-0">
                    <Ticker />
                </div>
            </div>
            <div className="row pt-2">
                <div className="col-md-2">
                    <Sidepanel />
                </div>

                <div className="col-md-7 p-0 ">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12">
                                {messageData ? (
                                    <Msg_card
                                        senderName={messageData.senderName}
                                        senderProfilePicture={messageData.senderProfilePicture}
                                        text={messageData.text}
                                        topic={messageData.topic}
                                        likes={messageData.likes}
                                        comments={messageData.comments}
                                        picture={messageData.picture}
                                        messageId={messageData.messageId}
                                    />
                                ) : (
                                    <p>No message data available.</p>
                                )}
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12" >
                                <Comment messageId={messageData?.messageId} />
                            </div>
                        </div>

                        <div className="row m-3">
                            <div className="col-md-12">
                                <CommentFeed messageId={messageData?.messageId} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 ">
                    <RightSide />
                </div>
            </div>
        </div>
    )
}

export default Message
