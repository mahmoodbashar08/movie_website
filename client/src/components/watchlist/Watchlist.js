import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";
import WantToWatchs from "./WantToWatch";
import WatchedMovies from "./WatchedMovies";
import axios from "axios";
import { UserAuth } from "../../context/UseAuth";

const Watchlist = () => {
  const { user } = UserAuth();
  const [watched, setwatched] = useState([]);
  const [wantToWatch, setWantToWatch] = useState([]);
  const [favorite, setFavorite] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/movies/", {
          headers: {
            Authorization: `Bearer ${user}`,
            "Content-Type": "application/json",
          },
        });
        // console.log(response.data.watchedMovies);
        setwatched(response.data.watchedMovies);
        setWantToWatch(response.data.watchlistMovies);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  console.log("hi", wantToWatch);
  return (
    <div style={{ overflow: "hidden" }}>
      <Row gutter={16} justify="center">
        <Col style={{ margin: "0px", fontSize: "16pt" }}>want to watch</Col>
      </Row>

      {/* {watched.map((id) => (
        <div>hi</div>
      ))} */}
      <WantToWatchs wantToWatch={wantToWatch} />
      <Row gutter={16} justify="center">
        <Col style={{ margin: "0px", fontSize: "16pt" }}>watched movie</Col>
      </Row>
      {/* <WatchedMovies /> */}
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
