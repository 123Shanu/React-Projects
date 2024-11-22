import React from "react";
import ReactDOM from "react-dom/client";
// import StarRating from "./StarRating";
// import { useState } from "react";
import './index.css';
import App from './App'; 

// function Test(){
//   const [movieRating,setMovieRating]=useState(0);

//   return (
//     <div>
//       <StarRating onSetRating= {setMovieRating} color="blue" maxRating={10} defaultRating={0}/>
//       <p>This movie was rated {movieRating} stars</p>
//     </div>
//   );
// }

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App/>
    {/* <StarRating maxRating={5} messages={['terrible','bad','okay','good','amazing']} />
    <StarRating maxRating={5} color="red" size={24} className="test" />
    <StarRating maxRating={10} color="teal" size={40} className="check" />
    <StarRating maxRating={10} color="teal" size={40} className="check" />
    <Test/> */}
  </React.StrictMode>
);
