function StringBuilder() {
    var resultArray = [];

    return {
        append: function () {
            resultArray.push(Array.apply(null, arguments).join(''));
        },
        toString: function () {
            return resultArray.join("\n");
        }
    }
}

module.exports = {
    StringBuilder: StringBuilder
};
