// Clipboard
//
// Provides and option to copy text to clip board
//
// For more infomation check: https://clipboardjs.com/
//
// Markup:
// <input type="text" id="clipboard-copy" value="https://data.govt.nz/manage-data/step-by-step-guides/releasing-open-data-on-data-govt-nz/" />
// <button class="button" data-clipboard data-clipboard-target="#clipboard-copy">Copy</button>
//
// Styleguide: Plugins.Clipboard

import ClipboardJS from 'clipboard'
import { createPopper } from '@popperjs/core'

export default function () {
  const elements = document.querySelectorAll('[data-clipboard]')

  elements.forEach(function (element, index) {
    new ClipboardJS(element).on('success', function (event) {
      // Create and show tooltip
      var tooltipEl = document.createElement('div')
      var tooltipId = 'clipboard-tooltip-' + index
      tooltipEl.className = 'tooltip'
      tooltipEl.id = tooltipId
      tooltipEl.setAttribute('role', 'tooltip')
      tooltipEl.innerHTML = '<div class="tooltip-arrow" data-popper-arrow></div><div class="tooltip-inner">Copied!</div>'
      document.body.appendChild(tooltipEl)

      var popperInstance = createPopper(element, tooltipEl, {
        placement: 'top',
        modifiers: [
          { name: 'offset', options: { offset: [0, 8] } }
        ]
      })
      tooltipEl.setAttribute('data-show', '')
      tooltipEl.classList.add('show')
      element.setAttribute('aria-describedby', tooltipId)

      setTimeout(function () {
        tooltipEl.removeAttribute('data-show')
        tooltipEl.classList.remove('show')
        element.removeAttribute('aria-describedby')
        popperInstance.destroy()
        if (tooltipEl.parentNode) {
          tooltipEl.parentNode.removeChild(tooltipEl)
        }
      }, 3000)
    })
  })
}
