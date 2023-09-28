// Fetch
// Post

const BASE_URL= 'https://pokeapi.co/api/v2/';

// Fetch no async
// fetch(BASE_URL + 'pokemon/ditto')
//     .then(res => res.json())
//     .then((data) => console.log(data));

// Fetch async

const fetchPokemon= async (pokemon) => {
    try{
        const response= await fetch(`${BASE_URL}pokemon/${pokemon}`);
        const parsedResponse = await response.json();
        localStorage.setItem('currentPokeId', parsedResponse.id)
        return parsedResponse;
    } catch (err){
        console.error(err);
    }
}

//Obtener pokemon --Arreglar local Storage
document.getElementById('get-btn')
    .addEventListener('click', async () => {
        const text= document.getElementById('poke-name').value.toLowerCase();
        const pokemon= await fetchPokemon(text);
        console.log(pokemon.name);
        joinProcess(pokemon);
        // localStorage.setItem('currentPokeId', pokemon.id);
})

// Creacion de Tarjeta

const CARD_SECTION= document.getElementById('pokecard');
const createCard=() => {
    const card=document.createElement('div');
    return card
}

// Creacion de elementos
const createDescription =() => {
    const PokeElements={
        pokeName: document.createElement('h3'),
        pokeId: document.createElement('h2'),
        image: document.createElement('img'),
        pokeWeight: document.createElement('h2')
    }
    return PokeElements;
}
//Rellenar tarjetas con elementos
const populateElements= (pokemon, pokeElements) => {
    pokeElements.pokeName.textContent= pokemon.name;
    pokeElements.pokeId.textContent= pokemon.id;
    pokeElements.image.src= pokemon.sprites.front_default;
    pokeElements.pokeWeight.textContent= pokemon.weight;

    return pokeElements;
}

// Mostrar las tarjetas con los elementos
const renderElements= (pokemon, pokeElements) => {
    pokemon.append(pokeElements.pokeName, pokeElements.pokeId, pokeElements.image, pokeElements.pokeWeight);
}

const joinProcess=(pokemon) => {
    CARD_SECTION.innerHTML="";
    const card= createCard(); 
    const pokeElements= createDescription();

    const elementsWithData= populateElements(pokemon, pokeElements);
    renderElements(card, elementsWithData);
    CARD_SECTION.append(card);
}

document.addEventListener('DOMContentLoaded', async () => {
    const storeId= localStoraage.getItem('currentPokeId');
    const initialId= storeId ? parseInt(storeId) : 1;
    const pokemon= await fetchPokemon(initialId);
    console.log (pokemon);
    joinProcess(pokemon);
})

//Obtener el anterior
document.getElementById('previous-btn')
    .addEventListener('click', async () => {
        const currentPokeId= parseInt(localStorage.getItem('currentPokeId'));
        const newId= Math.max(1, currentPokeId-1);
        const pokemon= await fetchPokemon(newId);
        console.log(pokemon.name);
        joinProcess(pokemon);
    })

//Obtener el siguiente
document.getElementById('next-btn')
    .addEventListener('click', async () => {
        const currentPokeId= parseInt(localStorage.getItem('currentPokeId'));
        const newId= currentPokeId+1;
        const pokemon= await fetchPokemon(newId);
        console.log(pokemon.name);
        joinProcess(pokemon);

})

// Post

fetch('https://jsonplaceholder.typicode.com/posts',{
    method: 'POST',
    body: JSON.stringify({
        title: 'title1',
        body: 'Lorem ipsum dolor sit amet',
        userId: 1,
    }),
    headers: {
        'Content-type':'application/json; charset=UTF-8',
    }
}).then(res=>res.json()).then(json=>console.log(json));