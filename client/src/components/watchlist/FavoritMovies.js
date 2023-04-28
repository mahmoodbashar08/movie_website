import { Card, Col, Row } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

const FavoritMovies = ({ movie }) => {
  const [favoriteList, setFavoriteList] = useState([]);
  useEffect(() => {
    const fetchMovies = async () => {
      const movieData = await Promise.all(
        movie.map(async (movie_id) => {
          console.log("id", movie_id["movie_id"]);
          try {
            const response = await axios.get(
              `https://api.themoviedb.org/3/movie/${movie_id["movie_id"]}?api_key=${process.env.REACT_APP_API_KEY}`
            );
            return response.data;
          } catch (error) {
            console.error(error);
            return null;
          }
        })
      );
      setFavoriteList(movieData.filter((data) => data !== null));
    };
    fetchMovies();
    console.log("final", favoriteList);
  }, []);
  return (
    <>
      <Row gutter={16} justify="center">
        {favoriteList.map((movie, id) => (
          <div key={id}>
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

export default FavoritMovies;
