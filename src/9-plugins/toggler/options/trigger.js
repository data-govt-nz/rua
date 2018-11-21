import string2func from '../string2func'

const toggleSelector = 'toggle';

export default function(owner, state, variables) {
    variables.forEach(function(element) {
        const toggleOptions = $(element).data(toggleSelector)
        if (typeof toggleOptions !== typeof undefined && toggleOptions !== false) {
            string2func(element, state, toggleOptions)
        } else {
            console.log(
                'No toggles defined',
                element
            )
        }
    })
}
