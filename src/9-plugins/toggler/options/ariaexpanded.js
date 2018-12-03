export function init({
  element,
  state
}) {
  $(element).attr('aria-expanded', state)
}

export function run({
  element,
  state
}) {
  $(element).attr('aria-expanded', state)
}

export default {
  init,
  run
}
