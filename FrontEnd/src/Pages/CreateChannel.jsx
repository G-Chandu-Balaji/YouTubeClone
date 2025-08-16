// import React from "react";
// import "./CreateChannel.css";

// export default function CreateChannel() {
//   return (
//     <div className="createChannel-container">
//       <div className="create-top-section">How you'll appear</div>
//       <div className="create-middle-section">
//         <div className="upload-image-seciton">
//           <div className="upload-image-container">
//             <img src="/user.png" alt="" />
//           </div>
//           {/* <button type="file">select a picture</button> */}
//           <input type="file" placeholder="Select Picture" />
//         </div>
//         <div className="input-field">
//           <div className="input-div">
//             <p>Name</p>
//             <input type="text" />
//           </div>
//           <div className="input-div">
//             <p>Handle</p>
//             <input type="text" />
//           </div>
//         </div>
//         <p className="create-para">
//           Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus esse
//           explicabo atque quaerat, alias officia, ducimus ipsam temporibus illo,
//           omnis exercitationem magnam aperiam magni quos tenetur doloremque ex
//           porro aut?
//         </p>
//       </div>
//       <div className="create-bottom-section">
//         <button>cancel</button>
//         <button>Create Channel</button>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import "./CreateChannel.css";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";

export default function CreateChannel() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    channelImage: "",
    bannerImage: "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/channel/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "something went wrong");
        return;
      }
      if (data.name) {
        toast.success(`${data.name} Channel Created`);
        navigate(`/channel/${data._id}`);
      }
      console.log("Channel Created:", data);
    } catch (err) {
      toast.error("Network error. Please try again.");
      console.log("Error", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="createChannel-container">
      <div className="create-top-section">How you'll appear</div>

      <div className="create-middle-section">
        <div className="upload-image-seciton">
          <div className="upload-image-container">
            <img
              src={formData.channelImage || "/user.png"}
              alt="channel"
              className="channel-img-preview"
            />
          </div>
          <input
            type="text"
            name="channelImage"
            value={formData.channelImage}
            onChange={handleChange}
            placeholder="Paste Channel Image URL"
          />
        </div>

        <div className="upload-image-seciton">
          <div className="upload-image-container banner">
            <img
              src={formData.bannerImage || "/banner-placeholder.jpg"}
              alt="banner"
              className="banner-img-preview"
            />
          </div>
          <input
            type="text"
            name="bannerImage"
            value={formData.bannerImage}
            onChange={handleChange}
            placeholder="Paste Banner Image URL"
          />
        </div>

        <div className="input-field">
          <div className="input-div">
            <p>Name</p>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Channel Name"
            />
          </div>
          <div className="input-div">
            <p>Description</p>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Channel Description"
              rows={3}
              className="textarea-field"
            />
          </div>
        </div>
      </div>

      <div className="create-bottom-section">
        <button>
          <Link to="/">Cancel</Link>
        </button>
        <button onClick={handleSubmit}>Create Channel</button>
      </div>
    </div>
  );
}
