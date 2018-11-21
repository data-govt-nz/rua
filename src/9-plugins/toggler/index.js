import $ from 'jquery'

import string2func from './string2func'

const events = [
    {
        name: 'click',
        type: 'click'
    },
    {
        name: 'click-true',
        type: 'click',
        forceState: true
    },
    {
        name: 'click-false',
        type: 'click',
        forceState: false
    },
    {
        name: 'focus',
        type: 'focus',
        forceState: true
    },
    {
        name: 'blur',
        type: 'blur',
        forceState: false
    }
]

export default function() {
    events.forEach(function({name, type, forceState}) {
        $(document).on(type, '[data-' + name + ']', function(event) {
            event.preventDefault()

            const eventOptions = $(this).data(name)
            let state = true
            if (typeof forceState !== typeof undefined) {
                state = forceState
            } else if (typeof $(this).data('toggler-state') !== typeof undefined) {
                state = $(this).data('toggler-state')
            }

            if (typeof eventOptions !== typeof undefined && eventOptions !== false) {
                state = string2func(this, state, eventOptions)
                $(this).data('toggler-state', state)
            } else {
                console.log(
                    'No toggles defined',
                    this
                )
            }
        })
    })
}
