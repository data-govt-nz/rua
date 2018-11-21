// Processes a given string and calls its functions

import options from './options'

export default function(element, state, toggleOptions) {
    const functions = toggleOptions.split(';')
    functions.forEach(function(value) {
        const o = value.trim().split(':'),
            func = o[0]
        let variables = null
        if (o[1]) {
            variables = o[1].split(',').map(function(item) {
                return item.trim();
            })
        }

        // call function
        options[func](element, state, variables)
        console.log(func, state, variables)
    })

    return !state
}
