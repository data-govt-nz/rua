// Triggers
//
// Triggers other elements to update their state and run functions defined with `data-toggle`.
//
// @todo Complete
//
// Markup:
// <button class="button" data-click="trigger: #trigger-target">Click</button>
// <div id="trigger-target" data-toggle="text: Hello World, Good bye">Hello World</div>
//
// Styleguide: Plugins.Toggler.Trigger

// Multiple targets
//
// @todo
//
// Markup:
// <button class="button" data-click="trigger: .multiple-targets, #multiple-target-ID">Click</button>
// <div class="multiple-targets" data-toggle="text: These are targeted by..., class">These are targeted by...</div>
// <div class="multiple-targets" data-toggle="text: These are targeted by..., class">These are targeted by...</div>
// <div id="multiple-target-ID" data-toggle="text: This is targeted..., id">This is targeted...</div>
//
// Styleguide: Plugins.Toggler.Trigger.Multiple

import string2func from '../string2func'

const toggleSelector = 'toggle';

export default function (owner, state, variables) {
  variables.forEach(function (selector) {
    const o = selector.split('=>')
    const elements = $(o[0])
    state = (o[1]) ? o[1] : state
    elements.each(function (index, element) {
      let toggleOptions = $(element).data(toggleSelector)
      if (typeof toggleOptions !== typeof undefined && toggleOptions !== false) {
        string2func(element, state, toggleOptions)
      } else {
        console.log(
          'No toggles defined',
          element
        )
      }
    })
  })
}
