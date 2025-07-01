import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Planet = () => {
    const { id } = useParams();
    const [planet, setPlanet] = useState(null);
    const [characters, setCharacters] = useState([]);
    const [films, setFilms] = useState([]);
    const navigate = useNavigate();

    const handleClickCharacter = (characterId) => {
        navigate(`/characters/${characterId}`);
    }

    const handleClickFilm = (filmId) => {
        navigate(`/films/${filmId}`);
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const [planetRes, charactersRes, filmsRes] = await Promise.all([
                    fetch(`http://localhost:3000/api/planets/${id}`),
                    fetch(`http://localhost:3000/api/planets/${id}/characters`),
                    fetch(`http://localhost:3000/api/planets/${id}/films`)
                ]);

                if (planetRes.ok) {
                    const planetData = await planetRes.json();
                    setPlanet(planetData);
                }

                if (charactersRes.ok) {
                    const charactersData = await charactersRes.json();
                    setCharacters(charactersData);
                }

                if (filmsRes.ok) {
                    const filmsData = await filmsRes.json();
                    setFilms(filmsData);
                }
            } catch (error) {
                console.error("Error fetching planet data:", error);
            }
        }
        fetchData();
    }, [id]);

    return (
        <div>
            <h1 id="name">{planet?.name}</h1>
            <section id="generalInfo">
                <p>Climate: <span id="climate">{planet?.climate}</span></p>
                <p>Population: <span id="population">{planet?.population}</span></p>
                <p>Diameter: <span id="diameter">{planet?.diameter}</span></p>
                <p>Gravity: <span id="gravity">{planet?.gravity}</span></p>
                <p>Orbital Period: <span id="orbital-period">{planet?.orbital_period}</span></p>
                <p>Rotation Period: <span id="rotation-period">{planet?.rotation_period}</span></p>
                <p>Terrain: <span id="terrain">{planet?.terrain}</span></p>
            </section>
            <section id="characters">
                <h2>Characters</h2>
                {characters && characters.length > 0 ? (
                    <ul>
                        {characters.map((character) => (
                            <li 
                                key={character.id} 
                                onClick={() => handleClickCharacter(character.id)}
                                style={{cursor: 'pointer'}}
                            >
                                {character.name}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No characters found</p>
                )}
            </section>
            <section id="films">
                <h2>Films appeared in</h2>
                {films && films.length > 0 ? (
                    <ul>
                        {films.map((film) => (
                            <li 
                                key={film.id} 
                                onClick={() => handleClickFilm(film.id)}
                                style={{cursor: 'pointer'}}
                            >
                                {film.title}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No films found</p>
                )}
            </section>
        </div>
    );
};

export default Planet;
