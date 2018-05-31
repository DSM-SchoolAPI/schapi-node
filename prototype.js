String.prototype.format = function (...params) {
    let text = this
    
    params.forEach((item, index) => {
        text = text.replace(new RegExp("\\{" + index + "\\}", 'g'), item)
    })

    return text
};

Number.prototype.pad = function () {
    let value = this;
    return (value < 10) ? '0' + value.toString() : value.toString()
}