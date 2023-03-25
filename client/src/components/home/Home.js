import React, { useEffect, useState } from "react";
import axios from "axios";
import "./home.css";
import { Card, Col, Row, Input, Modal, Button } from "antd";
import { useNavigate } from "react-router-dom";
// const { Meta } = Card;
// import dotenv from 'dotenv';
// dotenv.config();
const Home = () => {
  // console.log("hi", process.env.REACT_APP_API_KEY);
  const [popularMovie, setPopularMovie] = useState([]);
  const [searchMovie, setSearchMovie] = useState("");
  const [page, setPage] = useState(2);
  const navigate = useNavigate();
  const handlesearch = (e) => {
    e.preventDefault();

    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchMovie}&page=1&include_adult=false`
      )
      .then((response) => {
        // console.log(response.data["results"]);
        setPopularMovie(response.data["results"]);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_API_KEY}&`
      )
      .then((response) => {
        // console.log("hi", response.data["results"]);
        setPopularMovie(response.data["results"]);
      })
      .catch((error) => {
        console.log(error);
      });
    setSearchMovie("");
  }, []);

  const handleShowMore = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
      )
      .then((response) => {
        setPopularMovie([...popularMovie, ...response.data["results"]]);
        setPage(page + 1);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="main_home">
      <div className="searchBar">
        <Row gutter={16} justify="center">
          <Col span={4} md={8} sm={12} xs={16} justify="center">
            <form onSubmit={handlesearch}>
              <Input
                placeholder="Search movie"
                onPressEnter={(e) => setSearchMovie(e.target.value)}
              />
            </form>
          </Col>
        </Row>
      </div>
      <Row gutter={16} justify="center">
        {popularMovie.map((movie, id) => {
          return (
            <div key={id}>
              <Col
                md={6}
                style={{
                  width: 245,
                  margin: "10px",
                }}>
                <Card
                  hoverable
                  style={{
                    width: 245,
                  }}
                  // onClick={showModal}
                  onClick={() => {
                    // console.log("hi");
                    navigate(`/movie/${movie.id}`);
                  }}
                  cover={
                    <img
                      alt="example"
                      src={
                        "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/" +
                        movie.poster_path
                      }
                    />
                  }>
                  <h3>{movie.title ? movie.title : movie.name}</h3>
                </Card>
              </Col>
            </div>
          );
        })}
      </Row>
      <Row gutter={16} justify="center">
        <Col span={2}>
          <div className="show-more-button">
            <Button
              // style={{ margin: "5px", marginBottom: "40px" }}
              onClick={handleShowMore}>
              show more
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
