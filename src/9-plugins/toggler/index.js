// Toggler
//
// Provides options to toggle text, css classes, animations, visibilty etc between 2 states.
//
// Markup:
// <button class="button" data-click="text: Click, Replacement text">Click</button>
//
// Weight: 1
//
// Styleguide: Plugins.Toggler

// Event types
//
// Click toggles the state `data-click="..."`
//
// Click-true sets the state to true `data-click-true="..."`
//
// Click-false sets the state to false `data-click-false="..."`
//
// Focus sets the state to true `data-focus="..."`
//
// Blur sets the state to false `data-blur="..."`
//
// Weight: -11
//
// Styleguide: Plugins.Toggler.MultipleToggles

// Multiple toggles
//
// Use `;` to seperate multiple toggles
//
// Markup:
// <button class="button" data-click="text: Click, Replacement text; trigger: #multiple-toggles">Click</button>
// <div id="multiple-toggles" data-toggle="text: Hello World, Good bye; class: bg-primary, bg-secondary" class="bg-primary padding-sm margin-sm">Hello World</div>
//
// Weight: -10
//
// Styleguide: Plugins.Toggler.MultipleToggles

import $ from 'jQuery'

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
