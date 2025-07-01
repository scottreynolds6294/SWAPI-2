import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Planet = () => {
    const { id } = useParams();
    const [planet, setPlanet] = useState(null);
    const [characters, setCharacters] = useState([]);
    const [films, setFilms] = useState([]);
    const navigate = useNavigate();

    const handleClickCharacters = () => {
        navigate(`/characters`)
    }
}