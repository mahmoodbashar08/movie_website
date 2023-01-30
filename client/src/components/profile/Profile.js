import React, { useState } from "react";
import { Avatar, Button, Calendar, Col, Row } from "antd";
// import { UserOutlined } from "@ant-design/icons";
import image from "../menu/frame_2.webp";
import WatchList from "./WatchList";
import * as Dayjs from "dayjs";
import dayjs from "dayjs";
const Profile = () => {
  const [value, setValue] = useState(() => dayjs(Dayjs()));
  const [selectedValue, setSelectedValue] = useState(() => dayjs(Dayjs()));
  const onSelect = (newValue) => {
    setValue(newValue);
    setSelectedValue(newValue);
  };
  const onPanelChange = (newValue) => {
    setValue(newValue);
  };
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
              onSelect={onSelect}
              onPanelChange={onPanelChange}
              value={value}
            />
          </div>
        </Col>
        <Col style={{ marginTop: "100px" }}>
          <Button
            onClick={() => {
              setValue(Dayjs());
            }}>
            reset to current date
          </Button>
        </Col>
      </Row>

      <WatchList selectedValue={selectedValue} />
    </div>
  );
};

export default Profile;
