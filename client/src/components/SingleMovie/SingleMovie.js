import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./SingleMovie.css";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { Button, Card, Col, Row } from "antd";
import { Carousel } from "antd";
import { UserAuth } from "../../context/UseAuth";
// import { HeartTwoTone } from "@ant-design/icons";
import FormControlLabel from "@mui/material/FormControlLabel";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Checkbox from "@mui/material/Checkbox";
import { OmitProps } from "antd/es/transfer/ListBody";
const contentStyle = {
  height: "580px",
  width: "100%",
  // color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  // background: "#364d79",
};
function SingleMovie() {
  const navigate = useNavigate();
  const location = useLocation();
  const { movieId } = useParams();
  // console.log(movieId);
  const { user } = UserAuth();
  const [movie, setMovie] = useState([]);
  const [movieImages, setMovieImages] = useState([]);
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
        // console.log(response.data);
        setMovie(response.data);
        setMovieGenres(response.data["genres"]);
      })
      .catch((error) => console.log(error));
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${process.env.REACT_APP_API_KEY}`
      )
      .then((response) => {
        // console.log("images", response.data.backdrops);
        const limitImages = response.data.backdrops.slice(0, 15);
        setMovieImages(limitImages);
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
    console.log(user);
    console.log(movieId);
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
        console.log("state", response);
        const { IsInWatched, IsInWatchList, IsInFavorite } = response.data;
        setIswatched(IsInWatched);
        setIsWatcheList(IsInWatchList);
        setFavorite(IsInFavorite);
      })
      .catch((error) => console.log(error));
  }, [location.pathname]);
  const handleAddToWatchlist = () => {
    console.log(user);
    console.log(movie.id);
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
  const dotPosition = "none";
  return (
    <div className="singleMovie-main">
      <Row gutter={24} justify="center">
        <Col lg={16} md={24} sm={24} xs={24} justify="center">
          <div style={{ width: "100%" }}>
            <Carousel dots={false} effect="scrollx" interval={100} autoplay>
              {movieImages.map((movieImage, id) => {
                return (
                  <div key={id} style={{ width: "100%" }}>
                    <img
                      style={contentStyle}
                      src={
                        "https://www.themoviedb.org/t/p/original" +
                        movieImage["file_path"]
                      }
                    />
                  </div>
                );
              })}
            </Carousel>
          </div>
        </Col>
        <Col md={8} sm={16} xs={16} justify="center">
          <div style={{ paddingTop: "20px" }}>
            <h4>{movie["release_date"]}</h4>
            <h1>{movie["title"]}</h1>
            <p>vote average : {movie["vote_average"]}</p>
            <h4>genres : </h4>
            <h6>
              {movieGenres.map((recorde, id) => {
                return (
                  <div key={id} style={{ padding: "10px" }}>
                    {recorde["name"]}
                  </div>
                );
              })}
            </h6>
            <h3>Overview : </h3>
            <p>{movie["overview"]}</p>
            {isWatcheList == true ? (
              <Button
                danger
                style={{ margin: "5px" }}
              // onClick={handleAddToWatchlist}
              >
                remove from watchlist
              </Button>
            ) : (
              <Button style={{ margin: "5px" }} onClick={handleAddToWatchlist}>
                add to watchlist
              </Button>
            )}

            {isWatched == true ? (
              <Button
                danger
                style={{ margin: "5px" }}
              // onClick={handleAddToWatchedMovie}
              >
                remove from watched movie
              </Button>
            ) : (
              <Button
                style={{ margin: "5px" }}
                onClick={handleAddToWatchedMovie}>
                add to watched movie
              </Button>
            )}
            {favorite == true ? (
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
            {/* <FormControlLabel
              style={{ margin: "5px" }}
              onClick={handleAddToFavoriteMovie}
              control={
                favorite == true ? (
                  <HeartOutlined style />
                ) : (
                  // <div>hi</div>
                  <HeartFilled />
                )
              }
            /> */}
            {/* <HeartTwoTone style={{ margin: "5px", fontSize: "20pt" }} /> */}
            {/* </Button> */}
          </div>
        </Col>
      </Row>
      <h1 style={{ padding: "20px", paddingTop: "100px" }}>Related movie</h1>
      <Row gutter={24} justify="center">
        {recommendations.map((recommendate, id) => {
          return (
            <div key={id}>
              <Col
                justify="center"
                onClick={() => handleNewMovie(recommendate)}
                md={6}>
                <div>
                  <Card
                    hoverable
                    style={{ width: 245 }}
                    // onClick={showModal}
                    onClick={() => {
                      console.log("hi");
                      navigate(`/movie/${recommendate["id"]}`);
                    }}
                    cover={
                      <img
                        alt="example"
                        src={
                          "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/" +
                          recommendate["poster_path"]
                        }
                      />
                    }>
                    <h3>
                      {recommendate["title"]
                        ? recommendate["title"]
                        : recommendate["name"]}
                    </h3>
                  </Card>
                </div>
              </Col>
            </div>
          );
        })}
      </Row>
    </div>
  );
}
export default SingleMovie;
