export default function (owner, state, variables) {
  if (state) {
    $(owner).data('template', variables[1])
    $(owner).html($(variables[1]).html())
  } else {
    $(owner).data('template', variables[0])
    $(owner).html($(variables[0]).html())
  }
}
