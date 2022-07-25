import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

export default function Savedlist(props) {
  var rows = [];

  const removeall = () => {
    localStorage.clear();
    props.closefunc();
  };
  const closedialog = () => {
    props.closefunc();
  };
  var substr = "https://image.tmdb.org/";
  var len = localStorage.length;
  for (var i = 0; i < len; i++) {
    var link = localStorage.key(i);
    var value = localStorage[link];
    if (value.includes(substr)) {
      rows.push(
        <>
          <Link to={link}>
            <span
              key={link}
              style={{ float: "left", margin: "5px" }}
              onClick={closedialog}
            >
              <img alt={value} src={value} />

            </span>
          </Link>
        </>
      );
    }
  }

  return (
    <>
      <div style={{ background: "black" }}>
        <br />
        <Button variant="contained" color="primary" onClick={removeall}>
          Clear List
        </Button>
        <span>{rows}</span>
      </div>
    </>
  );
}
