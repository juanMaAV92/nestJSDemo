import axios from "axios";
import { Move, PokeapiResponse } from "../interface/pokeapi-response.interface";



export class Pokemon {

    public id: number;
    public name: string;

    constructor(id: number , name: string ){
        this.id = id;
        this.name = name;
    }

}

export class Pokemon2 {

    get imageUrl(): string {
        return `https://pokemon,com/${ this.id }.jpg`;
    }

    constructor(
        public readonly id: number,
        public name: string,
        // public imageUrl : string,
    ){}

    scream(){
        console.log( `${ this.name.toUpperCase() }!!!!`)
    }
    
    
    speak(){
        console.log( `${ this.name }, ${ this.name }`)
    }

    async getMoves(): Promise<Move[]>{
        const { data } = await axios.get<PokeapiResponse>('https://pokeapi.co/api/v2/pokemon/5')
        return data.moves;
    }
}


export const charmander = new Pokemon( 4, 'charmander' )
export const charmeleon = new Pokemon2( 5, 'charmeleon' )


charmeleon.scream()
charmeleon.speak()

console.log( charmeleon.getMoves() )