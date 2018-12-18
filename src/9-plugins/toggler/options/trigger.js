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
// <div class="multiple-targets" data-toggle="text: These are targeted by..., class"></div>
// <div class="multiple-targets" data-toggle="text: These are targeted by..., class"></div>
// <div id="multiple-target-ID" data-toggle="text: This is targeted..., id"></div>
//
// Styleguide: Plugins.Toggler.Trigger.Multiple

import parseData from '../parseData'
import options from '../options'

export function init() {

}

export function run({
  state,
  variables
}) {
  const namespace = typeof window.dataTargetNamespace === 'undefined' ? '' : window.dataTargetNamespace.toString()

  variables.forEach(function (selector) {
    const o = selector.split('=>')
    const elements = $(o[0])
    state = (o[1]) ? (o[1] == 'true') : state

    elements.each(function (index, element) {
      const data = parseData(element, namespace + 'toggle', {
        forceState: state
      })
      data.functions.forEach(function(parameter) {
        options[parameter.option].run(parameter)
      })
    })
  })
}

export default {
  init,
  run
}
