import React, { useEffect, useState } from 'react'
import genreids from '../Utility/genre'

function WatchList({wl,setWl,handleremWl}) {

  const [search,setSearch] = useState('')
  const [genrelist,setGl] = useState(['All Genres'])
  const [curG,setCg] = useState('All Genres')

  let handleSearch = (e)=>{
    setSearch(e.target.value)
  }

  let handleFilter = (genre)=>{
    setCg(genre)
  }

  let sortInc = ()=>{
    let sotedInc = wl.sort((movieA,movieB)=>{
      return movieA.vote_average - movieB.vote_average 
    })
    setWl([...sotedInc])
  }

  let sortDec = ()=>{
    let sortedDec = wl.sort((movieA,movieB)=>{
      return movieB.vote_average - movieA.vote_average
    })
    setWl([...sortedDec])
  }

  useEffect(()=>{
    let temp = wl.map((movieObj)=>{
      return genreids[movieObj.genre_ids[0]]
    })
    temp = new Set(temp)
    setGl(['All Genres',...temp])
  },[wl])

  return (
    <>

      <div className='flex justify-center flex-wrap m-4'>
        {genrelist.map((genre)=>{
          return <div onClick={()=>handleFilter(genre)} className={curG==genre?'bg-blue-400 flex justify-center h-[3rem] w-[9rem] rounded-xl text-white text-center items-center font-bold m-4':'bg-gray-400/50 flex justify-center h-[3rem] w-[9rem] rounded-xl text-white text-center items-center font-bold m-4'}>{genre}</div>
        })}

      </div>

      <div className='flex justify-center my-4'>
          <input type="text" onChange={handleSearch} value={search} placeholder='Search movies' className='h-[3rem] w-[18rem] px-4 bg-gray-200 outline-none'/>
      </div>

      <div className='rounded-lg overflow-hidden border border-gray-200 m-8'>
        <table className='w-full text-gray-500 text-center'>
          <thead className='border-b-2'>
            <tr>
              <th>Name</th>
              <th className='flex justify-center'>
                <div onClick={sortInc} className='p-2'><i class="fa-solid fa-arrow-up"></i></div>
                <div className='p-2'>Ratings</div>
                <div onClick={sortDec} className='p-2'><i class="fa-solid fa-arrow-down"></i></div>
              </th>
              <th>Popularity</th>
              <th>Genre</th>
            </tr>
          </thead>
          <tbody>

            {wl.filter((movieObj)=>{
              if(curG=='All Genres')
                return true
              else{
                return genreids[movieObj.genre_ids[0]]==curG
              }
            }).filter((movieObj)=>{
              return movieObj.title.toLowerCase().includes(search.toLowerCase())
            }).map((movieObj)=>{
              return <tr className='border-b-2' key={movieObj.id}>
                    <td className='flex items-center px-5 py-5'>
                      <img className='h-[6rem] w-[10rem]' src={`https://image.tmdb.org/t/p/original/${movieObj.backdrop_path}`} />
                      <div className='mx-10'>{movieObj.title}</div>
                    </td>
                    <td>{movieObj.vote_average}</td>
                    <td>{movieObj.popularity}</td>
                    <td>{genreids[movieObj.genre_ids[0]]}</td>
                    <td onClick={()=>handleremWl(movieObj)} className='text-red-800 hover:cursor-pointer'>Delete</td>
                  </tr>
            })}

          </tbody>
        </table>
      </div>

    </>
  )
}

export default WatchList