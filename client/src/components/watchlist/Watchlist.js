import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";
import WantToWatchs from "./WantToWatch";
import WatchedMovies from "./WatchedMovies";
import axios from "axios";
import { UserAuth } from "../../context/UseAuth";
import FavoritMovies from "./FavoritMovies";

const Watchlist = () => {
  const { user } = UserAuth();
  const [yes, setyes] = useState(false);
  const [movies, setMovies] = useState({
    watchedMovies: [],
    watchlistMovies: [],
    favoriteMovies: [],
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/movies", {
        headers: {
          Authorization: `Bearer ${user}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // console.log(response);
        const { watchedMovies, watchlistMovies, favoriteMovies } =
          response.data;
        setMovies({
          watchedMovies,
          watchlistMovies,
          favoriteMovies,
        });
        setyes(true);
      })
      .catch((error) => console.log(error));
  }, []);
  console.log(movies["watchlistMovies"]);
  return (
    <div style={{ overflow: "hidden" }}>
      <Row gutter={16} justify="center">
        <Col style={{ margin: "20px", fontSize: "16pt" }}>watched</Col>
      </Row>
      {yes ? <WatchedMovies movie={movies["watchedMovies"]} /> : <div></div>}
      <Row gutter={16} justify="center">
        <Col style={{ margin: "20px", fontSize: "16pt" }}>not watched</Col>
      </Row>
      {yes ? <WantToWatchs movie={movies["watchlistMovies"]} /> : <div></div>}
      <Row gutter={16} justify="center">
        <Col style={{ margin: "20px", fontSize: "16pt" }}>favorite</Col>
      </Row>
      {yes ? <FavoritMovies movie={movies["favoriteMovies"]} /> : <div></div>}
    </div>
  );
};

export default Watchlist;
