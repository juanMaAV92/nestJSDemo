
export const pokemonIds = [1,20,30,40,234];

pokemonIds.push(2)


interface Pokemon {
    id: number;
    name: string;
    age?: number;
}


export const bulbasaur: Pokemon = {
    id: 1,
    name: 'bulbasaur'
}

export const charmander: Pokemon = {
    id: 4,
    name: 'charmander'
}


export const pokemons: Pokemon[] = [];

pokemons.push( bulbasaur, charmander )