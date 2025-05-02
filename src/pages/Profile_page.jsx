import React from 'react'
import Sidepanel from "../components/Sidepanel";
import Feed from "../components/Feed";
import Post from "../components/Post";
import RightSide from "../components/RightSide";
import Ticker from "../components/Ticker";
import Profile from '../components/Profile';
import Profile_feed from '../components/Profile_feed';

const Profile_page = () => {
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
                    <Profile />
                    <Profile_feed/>
                </div>

                <div className="col-md-3 ">
                    <RightSide />
                </div>
            </div>
        </div>
    )
}

export default Profile_page
