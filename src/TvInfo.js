import React, { Component } from "react";
import Navbar from "./header/Navbar";
import Footer from "./header/Footer";
import PlayTv from "./header/PlayTv";
import Dialog from "@material-ui/core/Dialog";
import CircularProgress from "@material-ui/core/CircularProgress";

export default class Tvinfo extends Component {
  constructor(props) {
    super(props);
    this.mounted = false;
    this.open = false;
  }

  state = {
    movie: {},
    credits: [],
    video: []
  };

  fetchMovie = () => {
    console.log(this.props.match.params.movie_id);
    const urlMovie = fetch(
      `https://api.themoviedb.org/3/tv/${this.props.match.params.movie_id}?api_key=80ed461d05b7e155c56d598a9495315e&language=pr-BR`
    );
    const urlCredits = fetch(`https://api.themoviedb.org/3/tv/${this.props.match.params.movie_id}/credits?api_key=80ed461d05b7e155c56d598a9495315e&language=pt-BR
        `);
    const urlVideos = fetch(`https://api.themoviedb.org/3/tv/${this.props.match.params.movie_id}/videos?api_key=80ed461d05b7e155c56d598a9495315e&language=pt-BR
          `);
    const urls = [urlMovie, urlCredits, urlVideos];

    Promise.all(urls)
      .then(([r1, r2, r3]) => Promise.all([r1.json(), r2.json(), r3.json()]))
      .then(([data1, data2, data3]) => {
        if (this.mounted)
          this.setState({
            movie: data1,
            credits: data2,
            video: data3.results
          });
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.mounted = true;

    this.fetchMovie();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.fetchMovie();
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  time_convert = (num) => {
    const hours = Math.floor(num / 60);
    const minutes = num % 60;
    return `${hours}h ${minutes}min`;
  };

  render() {
    const { movie, credits, video } = this.state;
    //console.log(movie.seasons)

    const backgroundImg = {
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2) , rgba(0, 0, 0, 0.7)), url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`
    };

    const backwithPoster = {
      backgroundImage: `linear-gradient(90deg, rgba(0, 0, 0, 0.8) 40%, rgba(0, 0, 0, 0.8) 60%), url("https://image.tmdb.org/t/p/original/${movie.poster_path}")`
    };

    const content =
      Object.keys(movie).length > 0 ? (
        <div
          style={movie.backdrop_path !== null ? backgroundImg : backwithPoster}
          className="bgImage"
        >
          <div className="content">
            <h1>{movie.name}</h1>

            <p className="year-run-vote">
              <span className="year">
                {new Date(movie.first_air_date).getFullYear()}
              </span>
              <span className="year">
                {"| "}
                {new Date(movie.last_air_date).getFullYear()}
              </span>
              <span className="run">
                {"seasons :"}
                {movie.number_of_seasons}
              </span>
              <span className="vote">
                <img
                  src={require("./header/imdb_logo.png")}
                  alt="Rating"
                  style={{
                    width: "40px",
                    height: "20px",
                    marginBottom: "-5px"
                  }}
                />{" "}
                {movie.vote_average}
              </span>
            </p>
            <div className="overview-container">
              <p className="overview">{movie.overview}</p>
              <span>
                <p>
                  <span className="greyed">Starring: </span>
                  {credits.cast &&
                    credits.cast.map((cast, i) => {
                      if (i < 4)
                        return <span key={cast.cast_id}>{cast.name}, </span>;
                      if (i === 4)
                        return <span key={cast.cast_id}>{cast.name}</span>;
                      else return null;
                    })}
                </p>
              </span>

              <p>
                <span className="greyed">Genres: </span>
                {movie.genres.map((genre, i, arr) => {
                  if (i === arr.length - 1)
                    return <span key={genre.id}>{genre.name}</span>;
                  return <span key={genre.id}>{genre.name}, </span>;
                })}
              </p>

              {credits && credits.crew.length > 0 && (
                <>
                  <p>
                    <span className="greyed">Director: </span>{" "}
                    {credits.crew[0].name}
                  </p>
                </>
              )}
            </div>
          </div>
          <PlayTv
            tmdb_id={movie.id}
            movie_seasons={movie.seasons}
            seasons_count={movie.number_of_seasons}
          />
          <br />
        </div>
      ) : (
        <p style={{ textAlign: "center" }}>
          <CircularProgress color="secondary" />
        </p>
      );
    return (
      <div>
        <Navbar />

        <div className="movie-page">
          {content}
          <Dialog fullScreen open={false}>
            <PlayTv />
          </Dialog>
        </div>
        <br />
        <br />
        <div className="lists">
          <div
            style={{
              marginLeft: "20px",
              marginBottom: "-50px",
              width: "8px",
              height: "40px",
              backgroundColor: "red"
            }}
          />{" "}
          <h2 style={{ marginLeft: "25px" }}>Trailer</h2>
          <br />
          {video.length ? (
            <div className="video">
              <iframe
                src={`https://www.youtube.com/embed/${video[0].key}`}
                title={video[0].name}
                frameBorder="0"
                allowFullScreen
                style={{ marginLeft: "45px" }}
              />
            </div>
          ) : null}
        </div>
        <div className="lists">
          <div
            style={{
              marginLeft: "20px",
              marginBottom: "-50px",
              width: "8px",
              height: "40px",
              backgroundColor: "red"
            }}
          />
          <h2 style={{ marginLeft: "25px" }}>Cast</h2>
          <br />
          <div
            className="hidescroll"
            style={{
              marginLeft: "45px",
              overflow: "auto",
              whiteSpace: "nowrap"
            }}
          >
            {credits.cast &&
              credits.cast.map((cast, i) => {
                if (i < 4)
                  return (
                    <span key={cast.cast_id}>
                      <img
                        alt={cast.cast_id}
                        style={{
                          width: "115px",
                          height: "120px",
                          marginRight: "15px",
                          borderRadius: "100%"
                        }}
                        src={`https://image.tmdb.org/t/p/w500/${cast.profile_path}`}
                      />
                    </span>
                  );
                if (i === 4)
                  return (
                    <span key={cast.cast_id}>
                      <img
                        alt={cast.cast_id}
                        style={{
                          width: "115px",
                          height: "120px",
                          marginRight: "15px",
                          borderRadius: "100%"
                        }}
                        src={`https://image.tmdb.org/t/p/w500/${cast.profile_path}`}
                      />
                    </span>
                  );
                else return null;
              })}
          </div>
        </div>
        <br />
        <br />
        
        <br />

        <Footer />
      </div>
    );
  }
}
