import React, { useState} from "react";
import MiApi from "./components/MiApi";
import Search from "./components/Search";

function App() {
  const [searchResults, setSearchResults] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);

  return (
    <div className="App">
      <Search setSearchResults={setSearchResults} setSelectedGenre={setSelectedGenre} selectedGenre={selectedGenre}></Search>
      <MiApi setSearchResults={setSearchResults} searchResults={searchResults} selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre}></MiApi>
    </div>
  );
}


export default App;
