import CharacterList from './CharacterList';

const Home = (props) => {
    return (
        <>
        <div>
            <h1>Star Wars Universe Lookup</h1>
            <label htmlFor="searchString">Who you looking for? <span className="small">(Regular expressions are cool
                 here)</span></label>
            <input id="searchString" onInput="filterCharacters()" autoComplete="off" />
            </div>
            <section id="charactersList">
                {
                    props.data.map((character) => (
                        <CharacterList key={character.id} data={character} />
                    ))
                }

            </section>
        </>
    )
}

export default Home;