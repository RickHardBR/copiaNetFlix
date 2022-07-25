import React, { useEffect } from "react";
import axios from "axios";

import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import HighQualityIcon from "@material-ui/icons/HighQuality";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";

export default function PlayMovie(props) {
  const [open, setOpen] = React.useState(false);
  const [movielink, setmovielink] = React.useState(false);
  const [openYTS, setOpenYTS] = React.useState(false);
  const [magnetUri, setmagnetUri] = React.useState("");
  const [movietitle, setmovietitle] = React.useState("");


  const handleClickOpen = () => {
    setOpen(true);

    setmovielink(
      `javascript:window.location.replace("https://www.2embed.ru/embed/imdb/movie?id=${props.imdb_id}")`
      
    );
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpenYTS = () => {
    setOpenYTS(true);
    axios
      .get(`https://yts.mx/api/v2/list_movies.json?query_term=${props.imdb_id}&language=pt-BR`)
      .then((res) => {
        
        setmagnetUri(
          res.data.data.movies[0].torrents[0].hash +
            "&dn=&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Fopentor.org%3A2710&tr=udp%3A%2F%2Ftracker.ccc.de%3A80&tr=udp%3A%2F%2Ftracker.blackunicorn.xyz%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969F&language=pt-BR"
        );

        
        window.webtor = window.webtor || [];
        
        window.webtor.push({
          id: "player",
          
          magnet: "magnet:?xt=urn:btih:" + magnetUri,
          on: function (e) {
            if (e.name === window.webtor.TORRENT_FETCHED) {
              
            }
            if (e.name === window.webtor.TORRENT_ERROR) {
              
            }
          },

          imdbId: `${props.imdb_id}`,

          lang: "en",
          i18n: {
            en: {
              common: {
                "prepare to play": "Preparing Video Stream... Please Wait..."
              },
              stat: {
                seeding: "Seeding",
                waiting: "Client initialization",
                "waiting for peers": "Waiting for peers",
                from: "from"
              }
            }
          }
        });
      })
      .catch((error) => {
        alert("No Torrent URL Found ");
      });
  };

  const handleCloseYTS = () => {
    setOpenYTS(false);
  };

  useEffect(() => {
    
    
  }, [props.tmdb_id]);

  return (
    <>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        style={{
          width: "150px",
          padding: "15px",
          marginTop: "-180px",
          background: "white",
          color: "black",
          fontWeight: "bold",
          marginLeft: "10px",
          borderRadius: "5px"
        }}
      >
        <PlayArrowIcon />
        &nbsp;&nbsp; Play
      </Button>
      

      <Dialog fullScreen open={open}>
        

        <iframe
          src={movielink}
          title="movieServer"
          width="100%"
          height="100%"
          id="myId"
          className="playerBack"
          style={{ border: "none" }}
          
        />
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
        <ButtonGroup
          variant="contained"
          style={{
            position: "absolute",
            top: "5px",
            right: "12vw",
            color: "white",
            width: "190px",
            height: "50px",
            background: "rgb(0,0,0,0.5)",
            padding: "5px",
            borderRadius: "5px"
          }}
        >
          <select
            style={{ background: "rgb(0,0,0,0.5)", color: "white" }}
            value={movielink}
            onChange={(event) => {
              if (
                
                event.target.value === "https://vidhotel.com/search?q=" ||
                
                event.target.value === "http://streamm4u.com/search/"
              ) {
                setmovielink(
                  event.target.value +
                    `${props.movie_title}` +
                    ` ` +
                    `${props.movie_year}`
                );
              } else if (
                
                event.target.value === "https://www.dopebox.net/search/"
              ) {
                setmovietitle(props.movie_title.replace(/\s/g, "-"));
                console.log(movietitle);

                setmovielink(event.target.value + movietitle);
                console.log(movielink);
              } else if (
                event.target.value === "https://123chill.to/?s=" ||
                event.target.value === "https://www.movies2.com.pk/?s=" ||
                event.target.value === "https://moviestars.to/search/" ||
                event.target.value === "https://swatchseries.ru/search?keyword="
              ) {
                setmovielink(event.target.value + `${props.movie_title}`);
              } else if (
                
                event.target.value === "https://123moviesplayer.com/movie/"
              ) {
                setmovielink(
                  // eslint-disable-next-line no-useless-concat
                  event.target.value + `${props.imdb_id}` + `?src=mirror3`
                );
              } else {
                setmovielink(event.target.value + `${props.imdb_id}`);
              }
            }}
          >
            <option value="https://www.2embed.ru/embed/imdb/movie?id=">
              VidCloud
            </option>
            <option value="https://api.movieshunters.com/api/movie?id=">
              MovieHunter
            </option>
            <option value="https://gomo.to/movie/">GomoTV</option>
            <option value="https://embedforfree.co/imdb?id=">
              MultiSource
            </option>

            <option value=" https://database.gdriveplayer.io/player.php?imdb=">
              GDrive
            </option>
            <option value="https://v2.vidsrc.me/embed/">VidSrc</option>
            <option value="https://hls.hdv.fun/imdb/">HLSFun</option>
            <option value="https://123moviesplayer.com/movie/">
              123Movies
            </option>
            <option value="https://dbgo.fun/noads.php?id=">DbGo</option>
            <option value="https://fsapi.xyz/movie/">VidCloudProxy</option>

            <option value="https://www.dopebox.net/search/">DopeBox</option>
            <option value="https://vidhotel.com/search?q=">vidhotel</option>
            <option value="https://123chill.to/?s=">123Chill</option>

            <option value="https://www.movies2.com.pk/?s=">
              Movies2(Hindi)
            </option>
            <option value="https://moviestars.to/search/">MoviesStar</option>

          </select>
          <Button>
            <IconButton onClick={handleClickOpenYTS}>
              <HighQualityIcon color="primary" fontSize="large" />
            </IconButton>
          </Button>
        </ButtonGroup>

        <Dialog
          fullScreen
          open={openYTS}
          onClose={handleCloseYTS}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <IconButton
            onClick={handleCloseYTS}
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
          <Button
            variant="contained"
            color="secondary"
            style={{
              position: "absolute",
              top: "5px",
              right: "10px",
              color: "white",
              width: "60px",
              height: "60px",
              background: "rgb(0,0,0,0.5)",
              borderRadius: "100%"
            }}
          >
            <a
              href={"magnet:?xt=urn:btih:" + magnetUri}
              download
              style={{ textDecoration: "none", color: "white" }}
            >
              <CloudDownloadIcon />
            </a>
          </Button>

          <div id="player" className="webtor"></div>
          <script
            type="text/javascript"
            src="https://cdn.jsdelivr.net/npm/@webtor/player-sdk-js/dist/index.min.js"
          />
        </Dialog>
      </Dialog>
    </>
  );
}
