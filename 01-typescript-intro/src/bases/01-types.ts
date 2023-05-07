

export let name = 'Juan Manuel AV';
export const age: number = 35;
export const isValid: boolean = true;

name = 'juanMaAV92'

export const templateString = `Esto es un string
mulinea
que puede tener
"" dobles
'' simples
inyectar valores \$ ${ name }
expresiones ${1 + 1}
`

console.log( templateString );
