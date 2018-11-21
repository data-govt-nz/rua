export default function(owner, state, variables) {
    if (state) {
        $(owner).removeClass(variables[0]).addClass(variables[1]);
    } else {
        $(owner).removeClass(variables[1]).addClass(variables[0]);
    }
}
