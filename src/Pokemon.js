import React, { useState } from 'react';
import axios from 'axios';
import ball from './ball.png';
import './Pokemon.css';

const Pokemon = () => {

    const [inputValue, setInputValue] = useState('');
    const [pokeName, setPokeName] = useState('');
    const [pokeImg, setPokeImg] = useState(ball);

    const inputChange = (e) => setInputValue( e.target.value );

    const pokemonSearch = () => {

        const peticion = axios.get(`https://pokeapi.co/api/v2/pokemon/${inputValue}/`);

        peticion
        .then( ({data}) => {
            const { name } = data;
            const { front_default } = data.sprites.other.dream_world;
            setPokeImg(front_default);
            setPokeName(name);
        })
        .catch( error => {
            console.error('Ocurrio un error', error);
            setPokeImg(ball);
            setPokeName('Pokémon NO encontrado');
        });
    }

    return (
        <div className="Pokemon">
            <label>¡Busca tu Pokémon aquí!</label>
            <div>
                <input
                    type="text" 
                    placeholder="Buscar por ID o Nombre" 
                    value={ inputValue } 
                    onChange={ inputChange }
                />
                <button onClick={ pokemonSearch }>BUSCAR</button>
            </div>
            <img src={ pokeImg } alt="imagen Pokemon" />
            <p><strong>{ pokeName }</strong></p>
        </div>
    );
}

export default Pokemon