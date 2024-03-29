import { Card, Col, Row } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const WatchList = () => {
  const [favoriteMovies, setFavoriteMovie] = useState([
    { id: 758009, date: "Wed Jan 18 2023 20:22:19" },
    { id: 536554, date: "Thu Jan 19 2023 20:22:19" },
    { id: 898308, date: "Tue Jan 03 2023 20:22:19" },
    { id: 593643, date: "Tue Jan 31 2023 20:22:19" },
    { id: 785084, date: "Sun Jan 01 2023 20:22:19" },
  ]);
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const movieData = await Promise.all(
        favoriteMovies.map(async (id) => {
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
  }, [favoriteMovies]);
  return (
    <div
      style={{
        marginTop: "50px",
        overflow: "hidden",
      }}>
      <Row gutter={16} justify="center">
        <p style={{ fontSize: "16pt", marginLeft: "10px" }}>favorite movie</p>
      </Row>
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
                  navigate(`/movie/${movie.id}`);
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
    </div>
  );
};

export default WatchList;
