var express = require('express');
var router = express.Router();
var Acordaos = require('../controllers/geral');
var Atco = require('../controllers/atco1');
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
  //Check if page value was passed
  page = req.query.page
  if (page == undefined) {
    page = 1
  }
  Acordaos.page(page)
    .then(dados => {
      console.log(dados)
      res.render('index', { alista: dados }
    )})
    .catch(e => res.render('error', {error: e}))
});

router.get('/acordaos/:IdProcesso', function(req, res, next) {
  processoId = parseInt(req.params.IdProcesso)
  Acordaos.consultarProcesso(processoId)
    .then(processo => {
      tribunal = processo.Tribunal
      controller = getTribunal(tribunal)
      controller.findProcesso(processo.Processo)
        .then(acordao => {
          res.render(tribunal, { a: acordao});
        })
        .catch(erro => {
          res.render('error', {error: erro, message: "Erro 1"})
        })
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro 2"})
    })
});

/* auxiliar para a tribunal */
function getTribunal(tribunal) {
  if (tribunal == "atco1") {
    return Atco
  }
  else if (tribunal == "jcons") {
    return Jcons
  }
  else if (tribunal == "jdgpj") {
    return Jdgpj
  }
  else if (tribunal == "jsta") {
    return Jsta
  }
  else if (tribunal == "jstj") {
    return Jstj
  }
  else if (tribunal == "jtca") {
    return Jtca
  }
  else if (tribunal == "jtcampca") {
    return Jtcampca
  }
  else if (tribunal == "jtcampct") {
    return Jtcampct
  }
  else if (tribunal == "jtcn") {
    return Jtcn
  }
  else if (tribunal == "jtrc") {
    return Jtrc
  }
  else if (tribunal == "jtre") {
    return Jtre
  }
  else if (tribunal == "jtrg") {
    return Jtrg
  }
  else if (tribunal == "jtrl") {
    return Jtrl
  }
  else if (tribunal == "jtrp") {
    return Jtrp
  } 
}


module.exports = router;
