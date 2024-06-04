function crop(value) {
    if (value.indexOf('*')) {
        return value.split('*').join('')
    } else {
        return value
    }
}
export default crop