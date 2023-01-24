import React, {useState, useEffect} from 'react'
import {Card, Col, Row, Button, Modal, Form} from 'react-bootstrap';
import MovieDetails from './MovieDetails';
import placeholder from '../placeholder.jpg';


const MiApi = ({searchResults,setSearchResults,setSelectedGenre,selectedGenre}) => {
    const [movies, setMovies] = useState(null);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [originalMovies, setOriginalMovies] = useState(null);
    
    
    useEffect(() => {
        getMoviesData();
    }, []);

    const getMoviesData= async () => {
        const API_KEY = '23d83d7d7cd4d153c1035ec520541b49';
        const movieUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=es-ES&include_adult=false&include_video=false&primary_release_date.gte=2022-07-01&page=1`;
        const response = await fetch(movieUrl);
        const data = await response.json();
        setMovies(data.results);
        setOriginalMovies(data.results);
    }

    useEffect(() => {
        const getGenres = async () => {
            const API_KEY = '23d83d7d7cd4d153c1035ec520541b49';
            let genreUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=es-ES&sort_by=popularity.desc&primary_release_year=2022&include_adult=false&include_video=false&page=1&with_genres=${selectedGenre}&with_watch_monetization_types=flatrate`;
            const response = await fetch(genreUrl);
            const data = await response.json();
            setSearchResults(null);
            setMovies(data.results);
        }
        if (selectedGenre) {
            getGenres();
        }
    }, [selectedGenre, setSearchResults]);

    
    if (!movies && !searchResults) {
        return <div>Loading...</div>;
    }

    const openModal = (movie) => {
        setSelectedMovie(movie);
        setModalIsOpen(true);
    }

    const closeModal = () => {
        setSelectedMovie(null);
        setModalIsOpen(false);
    };


    // Función para ordenar array
    let sortBy = (e)=>{
        let arrayOrdenado
        if ((e.target.value) === "empty"){
            setMovies(originalMovies);
        }
        else if ((e.target.value) === "az"){
            console.log("array de la a a la z")
            arrayOrdenado=[...movies].sort((a,b)=>a.title > b.title ? 1 : -1,);
            console.log(arrayOrdenado);
            setMovies(arrayOrdenado);
        }
        else if ((e.target.value) === "za"){
            arrayOrdenado=[...movies].sort((a,b)=>a.title > b.title ? -1 : 1,);
            setMovies(arrayOrdenado);
        }
        else if ((e.target.value) === "promedio") {
            arrayOrdenado=[...movies].sort((a, b) => b.vote_average - a.vote_average);
            setMovies(arrayOrdenado);
            console.log(arrayOrdenado)
        }
        
    }

    console.log(selectedGenre)


    return (
        <div> 
            <div className='container'> 
            <div className="sort-container col-3">
                    <Form.Select className='ordenador text-light' defaultValue={""} onChange={sortBy} aria-label="Default select example" placeholder="Ordenar por:">
                    <option value="empty">Ordenar por:</option>
                    <option value="az">Título (A-Z)</option>
                    <option value="za">Título (Z-A)</option>
                    <option value="promedio">Mejor valoradas</option>
                    </Form.Select>
            </div>
            </div>

            <Row  xs={1} md={3} lg={4} className="movies g-4 my-5">
            {searchResults ? 
                searchResults.map((movie) => (movie.release_date &&(
                    
                    <Col key={movie.id}>
                        <Card border='border border-0 h-100' className='card-movie'>
                        <Card.Img className="img" variant="top" src={movie.poster_path ? `https://image.tmdb.org/t/p/w300/${movie.poster_path}` : placeholder}/>
                        <Card.Body className='text-center card-body' >
                            <Card.Title className='text-light'>{movie.title + " (" + movie.release_date.substring(0,4) + ")"}</Card.Title>
                            <Card.Title className='text-warning'>{movie.vote_average}</Card.Title>
                            <Button className="btn btn-outline-light mt-3 bg-transparent" onClick={() => openModal(movie)}>Ver más</Button>
                        </Card.Body>   
                        </Card>  
                    </Col>
                
                )     
                )
                ) : (!movies ? <p>Loading...</p>  : movies.map((movie) => (
                    movie.release_date && (
            
                    <Col key={movie.id}>
                        <Card border='border border-0 h-100' className='card-movie'>
                        <Card.Img className="img" variant="top" src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}/>
                        <Card.Body className='text-center card-body' >
                            <Card.Title className='text-light'>{movie.title + " (" + (movie.release_date ? movie.release_date.substring(0,4) : "") + ")"}</Card.Title>
                            <Card.Title className='text-warning'>{movie.vote_average}</Card.Title>
                            <Button className="btn btn-outline-light mt-3 bg-transparent" onClick={() => openModal(movie)}>Ver más</Button>
                        </Card.Body>   
                        </Card>  
                    </Col>
                    )
                ))
            )};
            </Row>

                <Modal
                    className='myModal modal-dialog-scrollable'
                    size="xl"
                    show={modalIsOpen}
                    onHide={() => closeModal()}
                    aria-labelledby="example-modal-sizes-title-lg">
                    
                    {selectedMovie ? (
                        <div className='modal-data' key={selectedMovie.id}>
                            <Button type="button" className="btn-close" onClick={closeModal} data-bs-dismiss="modal" aria-label="Close"></Button>
                            <MovieDetails key={selectedMovie.id} movieId={selectedMovie.id} title={selectedMovie.title} overview={selectedMovie.overview} poster_path={selectedMovie.poster_path} genres={selectedMovie.genres} director={selectedMovie.director} release_date={selectedMovie.release_date} vote_average={selectedMovie.vote_average} />   
                            <Button type="button" className="button-modal btn btn-light" data-bs-dismiss="modal" onClick={closeModal}>Close</Button>
                        </div>
                    ) : (
                        <p>Cargando...</p>
                    )}
                </Modal>

        </div>
    );
}


export default MiApi;
