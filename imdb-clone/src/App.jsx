import "./App.css";
import Navbar from "./components/Navbar";
import Movies from "./components/Movies";
import WatchList from "./components/WatchList";
import Banner from "./components/Banner";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  let [watchlist,setWatchList]=useState([])

  let handleAddtoWatchlist = (movieObj)=>{
    let newWatchList = [...watchlist,movieObj]
      localStorage.setItem('moviesApp',JSON.stringify(newWatchList))
      setWatchList(newWatchList)
      console.log(newWatchList)
  }

  let handleRemovefromWatchList = (movieObj)=>{
    let filteredWatchList = watchlist.filter((movie)=>{
      return movie.id != movieObj.id
    })
    localStorage.setItem('moviesApp',JSON.stringify(filteredWatchList))
    setWatchList(filteredWatchList)
  }

  useEffect(()=>{
    let moviesFromLocalStorage =localStorage.getItem('moviesApp')
    if(!moviesFromLocalStorage){
      return  
    }
    setWatchList(JSON.parse(moviesFromLocalStorage))
  },[])

  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner />
                <Movies watchlist={watchlist} handleAddtoWatchList={handleAddtoWatchlist} handleRemovefromWatchList={handleRemovefromWatchList}/>
              </>
            }
          />
          <Route path="/watchlist" element={<WatchList watchlist={watchlist} setWatchList={setWatchList} handleRemovefromWatchList={handleRemovefromWatchList}/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
