var express = require('express');
var router = express.Router();
var Acordaos = require('../controllers/geral');
var Atco = require('../controllers/atco');
var Jcons = require('../controllers/jcons');
var Jdgpj = require('../controllers/jdgpj');
var Jsta = require('../controllers/jsta');
var Jstj = require('../controllers/jstj');
var Jtca = require('../controllers/jtca');
var Jtcampca = require('../controllers/jtcampca');
var Jtcampct = require('../controllers/jtcampct');
var Jtcn  = require('../controllers/jtcn');
var Jtrc = require('../controllers/jtrc');
var Jtre = require('../controllers/jtre');
var Jtrg = require('../controllers/jtrg');
var Jtrl = require('../controllers/jtrl');
var Jtrp = require('../controllers/jtrp');


/* GET home page. */
router.get('/', function(req, res, next) {
  Acordaos.page(1)
    .then(dados => {
      console.log(dados)
      res.render('index', { alista: dados }
    )})
    .catch(e => res.render('error', {error: e}))
});

module.exports = router;
