import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import Sidepanel from "../components/Sidepanel";
import Feed from "../components/Feed";
import Post from "../components/Post";
import RightSide from "../components/RightSide";
import Ticker from "../components/Ticker";

const Home_page = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12 p-0">
          <Ticker/>
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
                <Post />
              </div>
            </div>

            <div className="row">
              <div className="col-md-12" >
                <Feed />
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3 ">
          <RightSide/>
        </div>
      </div>
    </div>
  )
}

export default Home_page
