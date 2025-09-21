import React, { useEffect, useState } from 'react'
import MovieCard from './MovieCard'
import axios from 'axios'
import Pagination from './Pagination'


function Movies({wl,handleaddWl,handleremWl}) {

  const [movies,setMovies] = useState([])
  const [pageNo,setPage] = useState(1)
  

  const handlePrev = ()=>{
    if(pageNo===1)
      setPage(1)
    else
      setPage(pageNo-1)
  }

  const handleNext = ()=>{
    setPage(pageNo+1)
  }

  useEffect(()=>{
    axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=ead790cb69cd3b627116411f17647ba3&language=en-US&page=${pageNo}`).then(function(res){
      setMovies(res.data.results)
    })
  },[pageNo])
  return (
    <div className='p-5'>
      <div className='text-2xl text-center m-5 font-bold'>
        Trending Movies
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
        {movies.map((movieObj)=>{
          return <MovieCard key={movieObj.id} poster_path={movieObj.poster_path} name = {movieObj.original_title} wl={wl} movieObj={movieObj} handleaddWl={handleaddWl} handleremWl={handleremWl} />
        })}
      </div>

      <Pagination pageNo={pageNo} handleNext={handleNext} handlePrev={handlePrev} />
    </div>
  )
}

export default Movies