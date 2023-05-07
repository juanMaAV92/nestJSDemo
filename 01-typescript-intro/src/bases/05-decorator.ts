

class NewPokemon{

    constructor(
        public readonly id: number,
        public name: string,
    ){ }

    screm(){
        console.log(`No quiero`)
    }

    speak(){
        console.log(`No quiero hablar`)
    }  
}



const MyDecorator = () => {
    return ( target: Function ) => {
        console.log( target )
        return NewPokemon;
    }
}


// in tsconfig add experimentalDecorators in true
@MyDecorator()
export class Pokemon{

    constructor(
        public readonly id: number,
        public name: string,
    ){ }

    screm(){
        console.log(`${ this.name.toUpperCase() }!!!`)
    }

    speak(){
        console.log(`${ this.name }, ${ this.name }!`)
    }  
}

export const charmander = new Pokemon( 4, 'charmander' );

charmander.screm()
charmander.speak()