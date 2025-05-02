import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const response = await fetch(
            `https://tradelyst-backend.onrender.com/api/getUser/${user.sub}`
          );
          //console.log("The User Id is : " , user.sub);
          const data = await response.json();
          setUserData(data);

        } catch (error) {
          //console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const updatedAbout = e.target.about.value; // Get the updated "about" value from the form

    try {
      const response = await fetch(`https://tradelyst-backend.onrender.com/api/updateUser/${user.sub}`, {
        method: "PUT", // Use PUT for updating resources
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ about: updatedAbout }),
      });

      if (response.ok) {
        const updatedData = await response.json();
        //console.log("Updated user data:", updatedData);
        setUserData((prevData) => ({
          ...prevData,
          user: {
            ...prevData.user,
            about: updatedAbout,
          },
        }));
        //alert("About information updated successfully!");
        toast.success("About Information is Changed!");
      } else {
        //console.error("Failed to update about information");
        //alert("Failed to update about information.");
      }
    } catch (error) {
      //console.error("Error updating about information:", error);
      //alert("An error occurred while updating about information.");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading indicator while fetching user data
  }

  if (!isAuthenticated) {
    return <div>You are not logged in.</div>; // Handle unauthenticated state
  }

  const styles = {
    image: {
      height: "100px",
      width: "100px",
    },
    heading: {
      margin: "0px",
    },
    card: {
      marginBottom: "0px",
    },
    rowMarginTop: {
      marginTop: "10px",
    },
    textarea: {
      height: "100px",
    },
  };

  return (
    <div className="card">
      <div className="card-body">
        <div className="row">
          <div className="col-12 d-flex flex-row align-items-center gap-3">
            <img
              src={user.picture}
              className="img-thumbnail rounded-circle p-0 border-0"
              style={styles.image}
              alt="Profile"
            />
            <h2 style={styles.heading}>{user.given_name}</h2>
          </div>
        </div>

        <div className="row" style={styles.rowMarginTop}>
          <div className="col-12">
            <div className="card" style={styles.card}>
              <div className="card-body pt-3">
                {/* Bordered Tabs */}
                <ul className="nav nav-tabs nav-tabs-bordered">
                  <li className="nav-item">
                    <button
                      className="nav-link active"
                      data-bs-toggle="tab"
                      data-bs-target="#profile-overview"
                    >
                      Overview
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link"
                      data-bs-toggle="tab"
                      data-bs-target="#profile-settings"
                    >
                      Settings
                    </button>
                  </li>
                </ul>
                <div className="tab-content pt-2">
                  <div
                    className="tab-pane fade show active profile-overview"
                    id="profile-overview"
                  >
                    <h5 className="card-title">About</h5>
                    <p className="small fst-italic">
                      {userData?.user?.about || "No about information available."}
                      
                    </p>
                  </div>

                  <div
                    className="tab-pane fade profile-settings pt-3"
                    id="profile-settings"
                  >
                    <form onSubmit={handleSubmit}>
                      <div className="row mb-3">
                        <label
                          htmlFor="About"
                          className="col-md-4 col-lg-3 col-form-label"
                        >
                          About
                        </label>
                        <div className="col-md-8 col-lg-9">
                          <textarea
                            name="about"
                            type="text"
                            className="form-control"
                            id="About"
                            defaultValue={userData?.user?.about || ""}
                          ></textarea>
                        </div>
                      </div>
                      <div className="text-center">
                        <button type="submit" className="btn btn-primary">
                          Change Information
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Profile;
