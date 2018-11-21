const hiddenClass = 'hidden',
      visibleClass = 'visible'

export default function(owner, state, variables) {
    if (state) {
      $(owner).slideDown(function(){
        $(owner).removeClass(hiddenClass).addClass(visibleClass)
      })
    } else {
      $(owner).slideUp(function(){
        $(owner).addClass(hiddenClass).removeClass(visibleClass)
      })
    }
}
