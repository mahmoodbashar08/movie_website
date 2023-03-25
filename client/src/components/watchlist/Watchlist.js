import React from "react";
import { Col, Row } from "antd";
import WantToWatch from "./WantToWatch";
import WatchedMovies from "./WatchedMovies";
const Watchlist = () => {
  return (
    <div style={{ overflow: "hidden" }}>
      <Row gutter={16} justify="center">
        <Col style={{ margin: "0px", fontSize: "16pt" }}>want to watch</Col>
      </Row>
      <WantToWatch />
      <Row gutter={16} justify="center">
        <Col style={{ margin: "0px", fontSize: "16pt" }}>watched movie</Col>
      </Row>
      <WatchedMovies />
      <Row gutter={16} justify="center">
        <Col style={{ margin: "0px", fontSize: "16pt" }}>favorite</Col>
      </Row>
      <Row gutter={16} justify="center">
        <Col>list</Col>
      </Row>
    </div>
  );
};

export default Watchlist;
