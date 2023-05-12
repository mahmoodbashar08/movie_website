import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./SingleMovie.css";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { Button, Card, Col, Row } from "antd";

import { UserAuth } from "../../context/UseAuth";
// import { HeartTwoTone } from "@ant-design/icons";
import FormControlLabel from "@mui/material/FormControlLabel";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Checkbox from "@mui/material/Checkbox";
import { OmitProps } from "antd/es/transfer/ListBody";
import { Rating } from "@mui/material";
const contentStyle = {
  // height: "380px",
  width: "100%",
  // color: "#fff",
  filter: "brightness(0.6)",
  lineHeight: "160px",
  textAlign: "center",
  // borderRadius: "30px",
  // background: "#364d79",
};
function SingleMovie() {
  const navigate = useNavigate();
  const location = useLocation();
  const { movieId } = useParams();
  // console.log(movieId);
  const { user } = UserAuth();
  const [movie, setMovie] = useState([]);
  const [movieGenres, setMovieGenres] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  const [isWatched, setIswatched] = useState(false);
  const [isWatcheList, setIsWatcheList] = useState(false);
  // const [isFavorited, setIsFavorite] = useState(false);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      )
      .then((response) => {
        console.log(response.data);
        setMovie(response.data);
        setMovieGenres(response.data["genres"]);
      })
      .catch((error) => console.log(error));
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
      )
      .then((response) => {
        // console.log("recommendations", response.data["results"]);
        setRecommendations(response.data["results"]);
      })
      .catch((error) => console.log(error));
    window.scrollTo(0, 0);
    // console.log(user);
    // console.log(movieId);
    axios
      .get("http://localhost:3001/api/moviestatus", {
        params: {
          movieId: movieId,
        },
        headers: {
          Authorization: `Bearer ${user}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // console.log("state", response);
        const { IsInWatched, IsInWatchList, IsInFavorite } = response.data;
        setIswatched(IsInWatched);
        setIsWatcheList(IsInWatchList);
        setFavorite(IsInFavorite);
      })
      .catch((error) => console.log(error));
  }, [location.pathname]);
  const handleAddToWatchlist = () => {
    // console.log(user);
    // console.log(movie.id);
    axios
      .post(
        `http://localhost:3001/api/watchlist`,
        {
          user_id: user,
          movieId: movie.id,
        },
        {
          headers: {
            Authorization: `Bearer ${user}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        setIsWatcheList(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleRemoveFromWatchlist = () => {
    console.log(user);
    console.log(movie.id);
    axios
      .delete(`http://localhost:3001/api/remocewanttowatch/${movieId}`, {
        headers: {
          Authorization: `Bearer ${user}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        setIsWatcheList(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleAddToWatchedMovie = () => {
    console.log(user);
    console.log(movie.id);
    axios
      .post(
        `http://localhost:3001/api/watched`,
        {
          user_id: user,
          movieId: movie.id,
        },
        {
          headers: {
            Authorization: `Bearer ${user}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        setIswatched(true);
        setIsWatcheList(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleRemoveFromWatchedMovie = () => {
    // console.log(user);
    // console.log(movie.id);
    axios
      .delete(`http://localhost:3001/api/removewatched/${movieId}`, {
        headers: {
          Authorization: `Bearer ${user}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        setIswatched(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleAddToFavoriteMovie = () => {
    // console.log(user);
    // console.log(movie.id);
    // setFavorite(!favorite);
    axios
      .post(
        `http://localhost:3001/api/favorites`,
        {
          user_id: user,
          movieId: movie.id,
        },
        {
          headers: {
            Authorization: `Bearer ${user}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        setFavorite(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleDeleteFromFavorites = () => {
    axios
      .delete(`http://localhost:3001/api/removefavorite/${movieId}`, {
        headers: {
          Authorization: `Bearer ${user}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        setFavorite(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleNewMovie = (recommendate) => {
    console.log("this movie", recommendate);
    navigate(`/movie/${recommendate["id"]}`);
  };
  if (!movie) {
    return <p>Loading...</p>;
  }
  return (
    <div className="singleMovie-main">
      <Row gutter={24} justify="start">
        <div
          style={{
            width: "100%",
            height: "450px",
            backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie["backdrop_path"]}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.3)",
          }}></div>
        <div
          style={{
            position: "absolute",

            marginTop: "250px",
            marginLeft: "40px",
            display: "flex",
          }}>
          <img
            style={{
              width: "180px",
              borderRadius: "10px",
              transition: "filter 0.3s", // Add a smooth transition for the filter effect
            }}
            src={"https://image.tmdb.org/t/p/original/" + movie["poster_path"]}
            onMouseOver={(event) => (event.target.style.filter = "blur(2px)")} // Apply blur on hover
            onMouseOut={(event) => (event.target.style.filter = "none")} // Remove blur when not hovering
          />
          <div>
            <h1
              style={{ color: "white", marginTop: "30px", marginLeft: "30px" }}>
              {movie["title"]}
            </h1>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
              <h4 style={{ color: "white", marginLeft: "30px" }}>
                {movie["release_date"]}
              </h4>
            </div>
            <div style={{ display: "flex", marginLeft: "30px" }}>
              {movieGenres.map((record, id) => {
                return (
                  <div
                    key={id}
                    style={{
                      marginRight: "10px",
                      color: "white",
                      border: "1px solid white",
                      borderRadius: "20px",
                      padding: "10px",
                      transition: "background-color 0.3s",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor =
                        "rgba(255, 255, 255, 0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "transparent";
                    }}>
                    {record["name"]}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* </Col> */}

        {/* <Col md={8} sm={16} xs={16} justify="center"> */}
        <div style={{ paddingTop: "20px", marginLeft: "250px" }}>
          {/* <h1>{movie["title"]}</h1>
            <p>vote average : {Math.round(movie["vote_average"])}</p>
            <h4>genres : </h4>
            <h6></h6>
            <h3>Overview : </h3>
            <p>{movie["overview"]}</p> */}
          {isWatcheList === true ? (
            <Button
              danger
              style={{ margin: "5px" }}
              onClick={handleRemoveFromWatchlist}>
              remove from watchlist
            </Button>
          ) : (
            <Button style={{ margin: "5px" }} onClick={handleAddToWatchlist}>
              add to watchlist
            </Button>
          )}

          {isWatched === true ? (
            <Button
              danger
              style={{ margin: "5px" }}
              onClick={handleRemoveFromWatchedMovie}>
              remove from watched movie
            </Button>
          ) : (
            <Button style={{ margin: "5px" }} onClick={handleAddToWatchedMovie}>
              add to watched movie
            </Button>
          )}
          {favorite === true ? (
            <HeartFilled
              onClick={handleDeleteFromFavorites}
              style={{ margin: "5px", fontSize: "20pt", color: "red" }}
            />
          ) : (
            <HeartOutlined
              onClick={handleAddToFavoriteMovie}
              style={{ margin: "5px", fontSize: "20pt" }}
            />
          )}
        </div>
        {/* </Col> */}
      </Row>
      <h1 style={{ padding: "20px", paddingTop: "100px" }}>Related movie</h1>
      <Row justify="center" gutter={{ xs: 8, sm: 16, md: 24 }}>
        {recommendations.map((movie, id) => {
          return (
            <Col
              key={id}
              lg={4}
              md={7}
              sm={11}
              xs={10}
              style={{
                margin: "10px",
              }}>
              <Card
                hoverable
                style={{
                  height: "100%",
                }}
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
                <p
                  style={{
                    fontSize: "14pt",
                    textAlign: "center",
                    padding: "0px",
                  }}>
                  {movie.title ? movie.title : movie.name}
                </p>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
export default SingleMovie;
