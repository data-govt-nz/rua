// Toggler
//
// Provides options to toggle text, css classes, animations, visibilty etc between 2 states.
//
// Markup:
// <button class="button" data-click="text: Click, Replacement text"></button>
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
// <button class="button" data-click='text: Click, "Replacement text"; trigger: #multiple-toggles'></button>
// <div id="multiple-toggles" data-toggle="text: Hello World, Good bye; class: bg-primary, bg-secondary" class="bg-primary padding-sm margin-sm"></div>
//
// Weight: -10
//
// Styleguide: Plugins.Toggler.MultipleToggles

import $ from 'jquery'

import parseData from './parseData'
import options from './options'

const events = [{
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

const attributes = [
  {
    name: 'toggle'
  }
].concat(events)

export default function () {

  attributes.forEach(function ({
    name,
    forceState
  }) {
    $('[data-' + name + ']').each(function() {
      const data = parseData(this, name, {
        forceState
      })

      data.functions.forEach(function(parameter) {
        options[parameter.option].init(parameter)
      })
    })
  })

  events.forEach(function ({
    name,
    type,
    forceState
  }) {
    $(document).on(type, '[data-' + name + ']', function (event) {
      event.preventDefault()
      const data = parseData(this, name, {
        forceState
      })
      data.functions.forEach(function(parameter) {
        options[parameter.option].run(parameter)
      })
    })
  })
}
