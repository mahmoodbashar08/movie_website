import { Card, Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";
const WatchedMovies = () => {
  const [wantToWatchList, setWantToWatchList] = useState([
    { id: 758009 },
    { id: 536554 },
    { id: 898308 },
    { id: 593643 },
    { id: 785084 },
  ]);
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const fetchMovies = async () => {
      const movieData = await Promise.all(
        wantToWatchList.map(async (id) => {
          try {
            const response = await axios.get(
              `https://api.themoviedb.org/3/movie/${id["id"]}?api_key=${process.env.REACT_APP_API_KEY}`
            );
            return response.data;
          } catch (error) {
            console.error(error);
            return null;
          }
        })
      );
      setMovies(movieData.filter((data) => data !== null));
    };
    fetchMovies();
  }, [wantToWatchList]);
  return (
    <>
      <Row gutter={16} justify="center">
        {movies.map((movie) => (
          <div>
            <Col
              style={{
                width: 245,
                margin: "10px",
              }}
              md={5}
              sm={12}
              xs={16}>
              <Card
                onClick={() => {
                  console.log("hi");
                }}
                hoverable
                style={{ width: 245 }}
                key={movie.id}
                cover={
                  <img
                    alt={movie.title || movie.name}
                    src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`}
                  />
                }>
                <h3>{movie.title || movie.name}</h3>
              </Card>
            </Col>
          </div>
        ))}
      </Row>
    </>
  );
};

export default WatchedMovies;
