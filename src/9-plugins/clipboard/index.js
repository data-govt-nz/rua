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
import tooltip from 'tooltip.js'

export default function () {
  $('[data-clipboard]').each(function(index, element){
    const tipInstance = new tooltip(element, {
      title: 'Copied!',
      placement: 'top',
      trigger: 'manual'
    })

    new ClipboardJS(element).on('success', function(event) {
      tipInstance.show()
      setTimeout(function(){
        tipInstance.hide();
      }, 3000);
    })
  })
}
