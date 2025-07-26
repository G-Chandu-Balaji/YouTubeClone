import React from "react";
import "./CreateChannel.css";

export default function CreateChannel() {
  return (
    <div className="createChannel-container">
      <div className="create-top-section">How you'll appear</div>
      <div className="create-middle-section">
        <div className="upload-image-seciton">
          <div className="upload-image-container">
            <img src="" alt="" />
          </div>
          {/* <button type="file">select a picture</button> */}
          <input type="file" placeholder="Select Picture" />
        </div>
        <div className="input-field">
          <div className="input-div">
            <p>Name</p>
            <input type="text" />
          </div>
          <div className="input-div">
            <p>Handle</p>
            <input type="text" />
          </div>
        </div>
        <p className="create-para">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus esse
          explicabo atque quaerat, alias officia, ducimus ipsam temporibus illo,
          omnis exercitationem magnam aperiam magni quos tenetur doloremque ex
          porro aut?
        </p>
      </div>
      <div className="create-bottom-section">
        <button>cancel</button>
        <button>Create Channel</button>
      </div>
    </div>
  );
}
