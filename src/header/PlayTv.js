import React from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";

export default function PlayTv(props) {
  const [open, setOpen] = React.useState(false);
  const [serieslink, setserieslink] = React.useState();
  const [season, setseason] = React.useState("1");


  const handleClickOpen = () => {
    setOpen(true);

    setserieslink(
      `https://www.2embed.ru/embed/tmdb/tv?id=${props.tmdb_id}&s=1&e=1`
    );
  };

  const handleClose = () => {
    setOpen(false);
    setseason("1");
  };

  let movie_seasons = props.movie_seasons;
  if (movie_seasons[0].season_number === 0) {
    movie_seasons = movie_seasons.slice(1, movie_seasons.length);
  }

  return (
    <>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        style={{
          width: "250px",
          padding: "15px",
          marginTop: "-150px",
          background: "#cc0000",
          color: "white",
          marginLeft: "10px"
        }}
      >
        <PlayArrowIcon />
        &nbsp;&nbsp; Play
      </Button>
      <Dialog fullScreen open={open}>

        <iframe
          src={serieslink}
          title="movieServer"
          width="100%"
          height="100%"
          id="myId"
          className="playerBack"
          style={{ border: "none" }}

        />

        <select
          defaultValue={season}
          onChange={(event) => {
            setseason(event.target.value);
          }}
          style={{
            position: "absolute",
            top: "5px",
            left: "25vw",
            color: "white",
            width: "90px",
            height: "50px",
            background: "rgb(0,0,0,0.5)",
            padding: "5px",
            borderRadius: "5px"
          }}
        >

          {[...Array(movie_seasons.length)].map((e, i) => (
            <option value={movie_seasons[i].season_number} key={i}>
              Season{movie_seasons[i].season_number}
            </option>
          ))}

        </select>

        <select
          value={serieslink} 
          onChange={(event) => {
            setserieslink(
              `https://www.2embed.ru/embed/tmdb/tv?id=` +
                `${props.tmdb_id}&s=` +
                `${season}` +
                `&e=` +
                event.target.value
            );
          }}
          style={{
            position: "absolute",
            top: "5px",
            right: "12vw",
            color: "white",
            width: "90px",
            height: "50px",
            background: "rgb(0,0,0,0.5)",
            padding: "5px",
            borderRadius: "5px"
          }}
        >
          {[
            ...Array(
              movie_seasons[season - movie_seasons[0].season_number]
                .episode_count
            )
          ].map((e, i) => (
            <option value={i + 1} key={i}>
              Episode {i + 1}
            </option>
          ))}

        </select>

        <IconButton
          onClick={handleClose}
          style={{
            position: "absolute",
            top: "5px",
            left: "5px",
            color: "white",
            width: "60px",
            height: "60px",
            background: "rgb(0,0,0,0.5)",
            borderRadius: "100%"
          }}
        >
          <ArrowBackIcon fontSize="large" />
        </IconButton>
      </Dialog>
    </>
  );
}
