// Tooltip
//
// Provides tooltips using @popperjs/core for positioning
//
// For more information check: https://popper.js.org/docs/v2/
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

import { createPopper } from '@popperjs/core'

export default function () {
  const namespace = typeof window.dataTargetNamespace === 'undefined' ? '' : window.dataTargetNamespace.toString()
  const placementAttr = namespace + 'tooltip-placement',
    triggerAttr = namespace + 'tooltip-trigger',
    defaultPlacement = 'top',
    defaultTrigger = 'hover focus'

  const elements = document.querySelectorAll('[data-' + namespace + 'tooltip]')

  elements.forEach(function (element, index) {
    const title = element.getAttribute('data-' + namespace + 'tooltip') || element.dataset[namespace + 'tooltip']
    const placement = element.getAttribute('data-' + placementAttr) || defaultPlacement
    const trigger = element.getAttribute('data-' + triggerAttr) || defaultTrigger

    // Create tooltip element
    const tooltipEl = document.createElement('div')
    const tooltipId = 'tooltip-' + index
    tooltipEl.className = 'tooltip'
    tooltipEl.id = tooltipId
    tooltipEl.setAttribute('role', 'tooltip')
    tooltipEl.innerHTML = '<div class="tooltip-arrow" data-popper-arrow></div><div class="tooltip-inner">' + escapeHtml(title) + '</div>'

    let popperInstance = null

    function show () {
      document.body.appendChild(tooltipEl)
      popperInstance = createPopper(element, tooltipEl, {
        placement: placement,
        modifiers: [
          { name: 'offset', options: { offset: [0, 8] } }
        ]
      })
      tooltipEl.setAttribute('data-show', '')
      tooltipEl.classList.add('show')
      element.setAttribute('aria-describedby', tooltipId)
    }

    function hide () {
      tooltipEl.removeAttribute('data-show')
      tooltipEl.classList.remove('show')
      element.removeAttribute('aria-describedby')
      if (popperInstance) {
        popperInstance.destroy()
        popperInstance = null
      }
      if (tooltipEl.parentNode) {
        tooltipEl.parentNode.removeChild(tooltipEl)
      }
    }

    const triggers = trigger.split(' ')

    if (triggers.indexOf('hover') !== -1) {
      element.addEventListener('mouseenter', show)
      element.addEventListener('mouseleave', hide)
    }

    if (triggers.indexOf('focus') !== -1) {
      element.addEventListener('focus', show)
      element.addEventListener('blur', hide)
    }

    if (triggers.indexOf('click') !== -1) {
      element.addEventListener('click', function () {
        if (tooltipEl.hasAttribute('data-show')) {
          hide()
        } else {
          show()
        }
      })

      // Close on click outside
      document.addEventListener('click', function (event) {
        if (tooltipEl.hasAttribute('data-show') && !element.contains(event.target) && !tooltipEl.contains(event.target)) {
          hide()
        }
      })
    }
  })
}

function escapeHtml (text) {
  const div = document.createElement('div')
  div.appendChild(document.createTextNode(text))
  return div.innerHTML
}
