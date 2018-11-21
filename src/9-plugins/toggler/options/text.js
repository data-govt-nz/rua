export default function(owner, state, variables) {
    if (state) {
        $(owner).text(variables[1])
    } else {
        $(owner).text(variables[0])
    }
}
