import { Avatar, Col, Row } from "antd";
import React from "react";

const Users = () => {
  return (
    <div>
      <Row className="profile-container" justify="center">
        <Col>
          <Avatar
            style={{ marginLeft: "10px", marginTop: "50px" }}
            size={128}
            // src={image}
          />
        </Col>
      </Row>

      {/* <WatchList /> */}
    </div>
  );
};

export default Users;
