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
  Acordaos.page(1)
    .then(dados => {
      console.log(dados)
      res.render('index', { alista: dados }
    )})
    .catch(e => res.render('error', {error: e}))
});

router.get('/acordaos/:Processo', function(req, res, next) {
  Acordaos.consultarProcesso(req.params.Processo)
    .then(acordao => {
      tribunal = acordao.Tribunal
      cat = getCategoria(tribunal)
      view = 'acordao' + tribunal
      console.log(cat)
      console.log(view)
      cat.findProcesso(req.params.Processo)
        .then(acordao => {
          res.render(view, { a: acordao});
        })
        .catch(erro => {
          res.render('error', {error: erro, message: "Erro na obtenção do registo de pessoa"})
        })
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção do registo de pessoa"})
    })
});






/* auxiliar para a categoria */
function getCategoria(categoria) {
  if (categoria == "atco1") {
    return Atco
  }
  else if (categoria == "jcons") {
    return Jcons
  }
  else if (categoria == "jdgpj") {
    return Jdgpj
  }
  else if (categoria == "jsta") {
    return Jsta
  }
  else if (categoria == "jstj") {
    return Jstj
  }
  else if (categoria == "jtca") {
    return Jtca
  }
  else if (categoria == "jtcampca") {
    return Jtcampca
  }
  else if (categoria == "jtcampct") {
    return Jtcampct
  }
  else if (categoria == "jtcn") {
    return Jtcn
  }
  else if (categoria == "jtrc") {
    return Jtrc
  }
  else if (categoria == "jtre") {
    return Jtre
  }
  else if (categoria == "jtrg") {
    return Jtrg
  }
  else if (categoria == "jtrl") {
    return Jtrl
  }
  else if (categoria == "jtrp") {
    return Jtrp
  } 
}


module.exports = router;
