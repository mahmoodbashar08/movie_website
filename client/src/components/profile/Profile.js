import React, { useState } from "react";
import { Avatar, Button, Calendar, Col, Row } from "antd";
// import { UserOutlined } from "@ant-design/icons";
import image from "../menu/frame_2.webp";
import WatchList from "./WatchList";

const Profile = () => {
  return (
    <div>
      <Row className="profile-container" justify="center">
        <Col>
          <Avatar
            style={{ marginLeft: "10px", marginTop: "50px" }}
            size={128}
            src={image}
          />
        </Col>
      </Row>

      <WatchList />
    </div>
  );
};

export default Profile;
