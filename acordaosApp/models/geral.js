var mongoose = require('mongoose')

var acordaosSchema = new mongoose.Schema({
    Id: mongoose.Schema.Types.ObjectId,
    Processo: String,
    Descritores: [String],
    Data: String,
    Tribunal: String
},{versionKey: false})

module.exports = mongoose.model('geral',acordaosSchema)