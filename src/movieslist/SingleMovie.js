import React, { Component } from "react";
import { Link } from "react-router-dom";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";

export default class SingleMovie extends Component {
  state = {
    isHovering: false
  };

  handleEnter = () => {
    this.setState({ isHovering: true });
  };

  handleLeave = () => {
    this.setState({ isHovering: false });
  };

  render() {
    const { movie } = this.props;
    return (
      <Link to={"/" + movie.id} style={{color:"black"}}>
        <div
          className="movie-card"
          onMouseEnter={this.handleEnter}
          onMouseLeave={this.handleLeave}
        >
          {movie.backdrop_path !== null ? (
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
              alt={movie.backdrop_path}
              style={{maxWidth:"100%"}}
            />
          ) : (
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.poster_path}
            />
          )}
          <p style={{width:"180px"}}>
          <p style={{color:"white",whiteSpace: "nowrap",overflow: "hidden",textOverflow:"clip"}}>
          {movie.title}
          </p>
          </p>
          {this.state.isHovering && (
            <h3 className="movie-title">
              <PlayCircleOutlineIcon
                style={{ fontSize: "70px", color: "white", fontWeight:"bolder"}}
              />
            </h3>
          )}
        </div>
      </Link>
    );
  }
}
