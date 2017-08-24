export default function view(name) {
    return resolve => {
        require([`../views/${name}.vue`], resolve)
    }
}
