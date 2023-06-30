var mongoose = require('mongoose')

var sugestaoSchema = new mongoose.Schema({
    User: String,
    Aceite: Boolean
},{versionKey: false})

var acordaosSchema = new mongoose.Schema({
    Id: mongoose.Schema.Types.ObjectId,
    Processo: String,
    Descritores: [String],
    Data: String,
    Tribunal: String,
    Sugestao: sugestaoSchema
},{versionKey: false})

acordaosSchema.index({Processo: 'text', Descritores: 'text', Data: 'text', Tribunal: 'text'})

module.exports = mongoose.model('geral',acordaosSchema)