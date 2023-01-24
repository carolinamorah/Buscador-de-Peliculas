import React, {useState, useEffect} from 'react';
import placeholder from "../placeholder.jpg"


const MovieDetails = ({movieId, title, overview, release_date, vote_average, poster_path}) => {
    const [genres, setGenres] = useState([]);
    const [director, setDirector] = useState(null);
    const API_KEY = '23d83d7d7cd4d153c1035ec520541b49';

    useEffect(() => {
        const getMovieDetails = async () => {
            const genreUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=es-ES`;
            const creditUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`;
            const [genreRes, creditRes] = await Promise.all([
                fetch(genreUrl).then((response) => response.json()),
                fetch(creditUrl).then((response) => response.json())
            ]);
            setGenres(genreRes.genres);
            setDirector(creditRes.crew.find((p) => p.job === "Director"));
            }
            getMovieDetails();
    }, [movieId]);
    

    return (
        <div className='movie-details'>
            <img id="modal-img" src={poster_path ? `https://image.tmdb.org/t/p/w400/${poster_path}` : placeholder} alt="movie.id" /> 
            <div id="overview" className='text-light ms-5 me-5'>
                <h1>{title}</h1>
                <p>{overview}</p>
                <p><strong>Géneros: </strong>{genres.map((genre) => genre.name).join(", ")}</p>
                <p><strong>Director: </strong>{director ? director.name : 'unknown'}</p>  
                <p><strong>Fecha de estreno: </strong>{release_date}</p>
                <p className='text-warning'><strong>Nota: {vote_average}</strong></p>
            </div>
        </div>           
    );
}

export default MovieDetails


