import { useEffect, useState } from 'react'

import './App.css'

function App() {

  const [movie, setMovie] = useState({});
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  let API_KEY = import.meta.env.VITE_API_KEY

  let URL = `http://www.omdbapi.com/?apikey=${API_KEY}&`


  const fetchMovie = async () => {
        if (!title) return;
        setLoading(true);
        const response = await fetch(`${URL}t=${title}`)
        const data = await response.json();
        setMovie(data);
        setLoading(false);
    }

  useEffect(() => {
    fetchMovie();
  }, []) 

  return (
    <div className='flex flex-col justify-center items-center h-screen p-6 text-xl'>
      <h1 className='text-4xl mb-4'>Movie Search</h1>

      {/* Search Bar */}
      <div className='flex  flex-col md:flex-row gap-2 mb-6'>
        <input
          className='border border-gray-400 p-2 text-black'
          type="text"
          placeholder="Enter movie title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button
          className='bg-blue-500 px-4 py-2 rounded text-white hover:cursor-pointer'
          onClick={fetchMovie}
        >
          Search
        </button>
      </div>

      {/* Movie Result */}
      {!loading ? 
       movie && movie.Response !== "False" && (
        <div className='text-center md:text-left mt-6'>
          <h1 className='text-3xl font-bold'>{movie.Title}</h1>
          <h2 className='text-lg mt-2'>{movie.Released}</h2>

          <p className='max-w-xl'>{movie.Plot}</p>
        </div>
        ) : <div>Loading...</div>
      }

      {/* Not Found Message */}
      {movie && movie.Response === "False" && (
        <p className='text-red-500 mt-4 text-lg'>
          Movie not found.
        </p>
      )}
    </div>
  );
}

export default App
