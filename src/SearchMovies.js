
import React, {useState} from "react";
import MovieCard from "./MovieCard";

export default function SearchMovies(props){
    
    //states- input query, movies
    const [query, setQuery] = useState('');
    //create the state for movies, and update that state appropriate
    const [movies, setMovies] = useState([]);
    
    const searchMovies = async (e) => {
        // prevent the page to refresh automatically
        e.preventDefault();
                
        const url = `https://api.themoviedb.org/3/search/movie?api_key=cf7ab9bb1fc57950518732d22c4047c8&language=en-US&query=${query}&page=1&include_adult=false`;
        
        try {
            const res = await fetch(url);
            const data  = await res.json();
            setMovies(data.results);
        }catch(err){
            console.error(err);
        }
    }
    
    return (
        <>
            <form className="form" onSubmit={searchMovies}>
                <label className="label" htmlFor="query">Movie Name</label>
                <input className="input" type="text" name="query"
                    placeholder="i.e. Jurassic Park"
                    value={query} onChange={(e) => setQuery(e.target.value)}
                    />
                <button className="button" type="submit">Search</button>
            </form>
            <div className="card-list">
                {/* map - displays movies, filter - filters movies with the photo */}
               {movies.filter(movie => movie.poster_path).map(movie => (
                  <MovieCard movie={movie} key={movie.id} /> 
               ))}
            </div>    
        </>
    )
}