var mongoose = require('mongoose')

var acordaosSchema = new mongoose.Schema({
    Id: mongoose.Schema.Types.ObjectId,
    Processo: String,
    Descritores: [String],
    Data: String,
    Tribunal: String
},{versionKey: false})

acordaosSchema.index({Processo: 'text', Descritores: 'text', Data: 'text', Tribunal: 'text'})

const model = mongoose.model('geral',acordaosSchema)

model.createIndexes()

module.exports = model