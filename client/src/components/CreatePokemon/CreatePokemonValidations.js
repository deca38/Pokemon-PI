export default function validations(input, pokemonNames) {
    let errors = [];
    let RegExpression = /^[a-zA-Z\s]*$/;

    if(!input.name) {
        errors.name = 'El nombre es requerido...'
    } else if(pokemonNames.includes(input.name)) {
        errors.name = 'Ese pokemon ya existe...'
    } else if(input.name.length < 4 || input.name.length > 15) {
        errors.name = 'El nombre debe tener un minimo de 3 caracteres o un maximo de 15...'
    } else if(!RegExpression.test(input.name)) {
        errors.name = 'No son permitidos numeros o caracteres especiales'
    }

    if(input.hp === 0 || input.attack === 0 || input.defense === 0 || input.speed === 0 || input.height === 0 || input.weight === 0) {
        errors.hp = 'Completa todas las estadisticas'
    }

    return errors
}