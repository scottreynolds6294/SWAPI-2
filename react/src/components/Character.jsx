import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';

const Character = () => {
    const { id } = useParams();
    const [character, setCharacter] = useState(null);
    const [planet, setPlanet] = useState(null);
    const [films, setFilms] = useState([]);
    const navigate = useNavigate();
    
    const handleClickHomeworld = () => {
        if (character && character.homeworld) {
            navigate(`/planets/${character.homeworld}`);
        }
    }
    
    const handleClickFilm = (filmId) => {
        navigate(`/films/${filmId}`);
    }

    useEffect(() => {
        const fetchCharacter = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/characters/${id}`);
                const data = await response.json();
                setCharacter(data);
            
                if (data && data.homeworld) {
                    fetchPlanet(data.homeworld);
                }
            } catch (error) {
                console.error('Error fetching character:', error);
            }
        };
        fetchCharacter();
    }, [id]);

    const fetchPlanet = async (planetId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/planets/${planetId}`);
            const data = await response.json();
            setPlanet(data);
        } catch (error) {
            console.error('Error fetching homeworld:', error);
        }
    };

    useEffect(() => {
        const fetchFilms = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/characters/${id}/films`);
                const data = await response.json();
                setFilms(data);
            } catch (error) {
                console.error('Error fetching films:', error);
            }
        };
        fetchFilms();
    }, [id]);

    return (
        <div>
            <h1 id="name">{character?.name}</h1>
            <section id="generalInfo">
                <p>Height: <span id="height"></span>{character?.height} cm</p>
                <p>Mass: <span id="mass"></span>{character?.mass} kg</p>
                <p>Born: <span id="birth_year">{character?.birth_year}</span></p>
            </section>
            <div id='links'>
            <section id="planets">
                <h2>Homeworld</h2>
                <p onClick={handleClickHomeworld} style={{cursor: 'pointer'}}>
                    <span id="homeworld">{planet?.name}</span>
                </p>
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
            </section></div>
        </div>
    );
};

export default Character;
