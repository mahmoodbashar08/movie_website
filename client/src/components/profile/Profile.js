import React from "react";
import { Avatar, Calendar, Col, Row } from "antd";
import { UserOutlined } from "@ant-design/icons";
import image from "../menu/frame_2.webp";
import WatchList from "../watchList/WatchList";
const Profile = () => {
  return (
    <div>
      <Row className="profile-container" justify="center">
        <Col>
          <Avatar style={{ marginTop: "50px" }} size={128} src={image} />
        </Col>
      </Row>
      <Row justify="center">
        <Col>
          <div style={{ width: "100%", height: "250px" }}>
            <Calendar
              fullscreen={false}
              onSelect={(date) => {
                console.log(date);
              }}
            />
          </div>
        </Col>
      </Row>
      <Row justify="center">
        <Col>
          <WatchList />
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
