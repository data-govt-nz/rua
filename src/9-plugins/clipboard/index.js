// Clipboard
//
// Provides and option to copy text to clip board
//
// For more infomation check: https://clipboardjs.com/
//
// Markup:
// <input type="text" id="clipboard-copy" value="https://data.govt.nz/manage-data/step-by-step-guides/releasing-open-data-on" />
// <button class="button" data-clipboard data-clipboard-target="#clipboard-copy">Copy</button>
//
// Styleguide: Plugins.Clipboard

import ClipboardJS from 'clipboard'

export default function () {
  new ClipboardJS('[data-clipboard]')
}
