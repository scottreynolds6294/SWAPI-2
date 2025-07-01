import React from 'react';
import { useNavigate } from 'react-router-dom';

const CharacterList = (props) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/characters/${props.data.id}`);
    }
    return (
        <div onClick={handleClick} style={{ cursor: 'pointer' }}>
            {props.data.name}
        </div>
    )
}

export default CharacterList;