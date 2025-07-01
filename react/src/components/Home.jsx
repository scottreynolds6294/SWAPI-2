import React, { useState } from 'react';
import CharacterList from './CharacterList';

const Home = (props) => {

    const [searchString, setSearchString] = useState('');
    const filterCharacters = (e) => {
        setSearchString(e.target.value);
    };

    const filteredCharacters = props.data.filter(character => {
        if (!searchString) return true;

        try {
            const regex = new RegExp(searchString, 'i');
            return regex.test(character.name);
        } catch (e) {
            return character.name.toLowerCase().includes(searchString.toLowerCase());
        }
    });

    return (
        <>
        <div>
            <h1>Star Wars Universe Lookup</h1>
            <label htmlFor="searchString">Who you looking for? <span className="small">(Regular expressions are cool
                 here)</span></label>
            <input id="searchString" onInput={filterCharacters} value={searchString} autoComplete="off" />
            </div>
            <section id="charactersList">
                {filteredCharacters.length > 0 ? (
                    filteredCharacters.map((character) => (
                        <CharacterList key={character.id} data={character} />
                    ))
                ) : (
                    <p>No characters found mathching your search.</p>
                )}
            </section>
        </>
    );
};

export default Home;