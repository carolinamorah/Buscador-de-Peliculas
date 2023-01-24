import React, {useState} from 'react';
import {Container, Form, Navbar, Button} from 'react-bootstrap';


const Search = ({setSearchResults, setSelectedGenre}) => {
    const [valorInput, setValorInput] = useState('');

    const getSearch = async () => {
        const API_KEY = '23d83d7d7cd4d153c1035ec520541b49';
        const query = valorInput;
        let searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`;

        const response = await fetch(searchUrl);
        const data = await response.json();
        setSelectedGenre(null);
        setSearchResults(data.results);
        console.log(data.results)
    }
    //captura valor del option
    const getGenre = async (e) =>{
        setSelectedGenre(e.target.value);
    }

    const handleSearch = (e) => {
        setValorInput(e.target.value)
        
        if ( e.target.value === "") {
            setValorInput("");
            setSearchResults(null)         
        }
    }
    
    return (
        <>
        <Navbar expand="lg" className='border-rounded navbar-dark mx-auto'>
        <Container className='container-navbar'>
            <Navbar.Brand className="brand mx-auto fs-1" href="/">Movies App</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            
        </Container>
        
        </Navbar>
        <Form className="d-flex mt-5 mb-3 col-lg-5 col-sm-6 col-xs-6 mx-auto">
                <Form.Control
                type="search"
                placeholder="Búsqueda por título"
                className="me-1 ms-5"
                aria-label="Search"
                onChange={handleSearch}
                />
                <Button onClick={() => valorInput !== "" ? getSearch() : null} className='btn-search' aria-label='Close'>Search</Button>
        </Form>
        <Form className='d-grid mx-auto'> 
        <Form.Label className='label text-light fw-bolder'>Filtrar por género</Form.Label>
            <Form.Control className="select-genres mx-auto" as="select" onChange={(e) => getGenre(e)}>
                        <option value={null}>Todos los géneros</option>
                        <option value={28}>Acción</option>
                        <option value={12}>Aventura</option>
                        <option value={16}>Animación</option>
                        <option value={35}>Comedia</option>
                        <option value={80}>Crimen</option>
                        <option value={99}>Documental</option>
                        <option value={18}>Drama</option>
                        <option value={10751}>Familia</option>
                        <option value={14}>Fantasía</option>
                        <option value={36}>Historia</option>
                        <option value={27}>Terror</option>
                        <option value={10402}>Música</option>
                        <option value={9648}>Misterio</option>
                        <option value={10749}>Romance</option>
                        <option value={878}>Ciencia ficción</option>
                        <option value={10770}>Película de TV</option>
                        <option value={53}>Suspense</option>
                        <option value={10752}>Bélica</option>
                        <option value={37}>Western</option>
                </Form.Control>
            </Form>
        </>
    );
}

export default Search
