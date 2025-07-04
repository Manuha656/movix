import './App.css';
import Banner from './components/Banner';
import Movies from './components/Movies';
import Navbar from './components/Navbar';
import WatchList from './components/WatchList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';

function App() {

  const [wl,setWl] = useState([])

  const handleaddWl = (movieObj)=>{
    let  newWl = [...wl,movieObj]
    localStorage.setItem('moviesApp' , JSON.stringify(newWl))
    setWl(newWl)
  }

  const handleremWl = (movieObj)=>{
    let filteredWl = wl.filter((movie)=>{
      return movie.id != movieObj.id
    })
    setWl(filteredWl)
    localStorage.setItem('moviesApp' , JSON.stringify(filteredWl))
  }

  useEffect(()=>{
    let movieslocalStorage = localStorage.getItem('moviesApp')
    if(!movieslocalStorage)
        return
    setWl(JSON.parse(movieslocalStorage))
  },[])

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<><Banner/> <Movies handleaddWl={handleaddWl} handleremWl={handleremWl} wl={wl} /></>} />
          <Route path='/watchlist' element={<WatchList wl={wl} setWl={setWl} handleremWl={handleremWl}/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

// https://api.themoviedb.org/3/movie/popular?api_key=ead790cb69cd3b627116411f17647ba3&language=en-US&page=2