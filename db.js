const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost:27017/bakery", {
    useNewUrlParser: true
});

const bakerySchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 2
    },
    dietary: {
        type: String,
        required: true,
        minlength: 2
    },
    product: {
        type: String,
        required: true,
        minlength: 2
    }
});

module.exports = mongoose.model("Bakery", bakerySchema);