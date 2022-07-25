import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import ListsOfMovies from "../movieslist/ListsOfMovies";
import Welcome from 'react-welcome-page'

export default function Home () {
  return (
    <div>
    <Welcome
		loopDuration={3000}
		data={[
		{
		
    image: require('./logo.png') ,
    imageAnimation: 'zoomIn',
    backgroundColor: 'black',
    text:''
 
    }
   
	
	]}

/>
      <Header />

      <ListsOfMovies />
      <Footer />
    </div>
  );
};
