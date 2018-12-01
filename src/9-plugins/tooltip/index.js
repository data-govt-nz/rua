// Tooltip
//
// Provides and option to copy text to clip board
//
// For more infomation check: https://popper.js.org/tooltip-documentation.html
//
// Markup:
// <button class="button" data-tooltip="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sagittis mauris augue." data-tooltip-placement="right">Hover/Focus</button>
// <button class="button" data-tooltip="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sagittis mauris augue.">Hover/Focus</button>
// <button class="button" data-tooltip="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sagittis mauris augue." data-tooltip-placement="bottom">Hover/Focus</button>
// <button class="button" data-tooltip="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sagittis mauris augue." data-tooltip-placement="left">Hover/Focus</button>
// <button class="button" data-tooltip="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sagittis mauris augue." data-tooltip-trigger="click" data-tooltip-placement="right">Click</button>
// <button class="button" data-tooltip="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sagittis mauris augue." data-tooltip-trigger="click">Click</button>
// <button class="button" data-tooltip="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sagittis mauris augue." data-tooltip-trigger="click" data-tooltip-placement="bottom">Click</button>
// <button class="button" data-tooltip="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sagittis mauris augue." data-tooltip-trigger="click" data-tooltip-placement="left">Click</button>
//
// Styleguide: Plugins.Tooltip

import tooltip from 'tooltip.js'

const placementAttr = 'tooltip-placement',
  triggerAttr = 'tooltip-trigger',
  defaultplacement = 'top', // End refers to right or bottom
  defaultTrigger = 'hover focus'

export default function () {
  $('[data-tooltip]').each(function(index, element){
    const $element = $(element),
      title = $element.data('tooltip'),
      placement = ($element.data(placementAttr)) ? $element.data(placementAttr) : defaultplacement,
      trigger = ($element.data(triggerAttr)) ? $element.data(triggerAttr) : defaultTrigger

    new tooltip(element, {
      title,
      placement,
      trigger,
      closeOnClickOutside: true
    })
  })
}
