var express = require('express');
var router = express.Router();
var Geral = require('../controllers/geral');
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
const { mongo, default: mongoose } = require('mongoose');


/* GET home page. */
router.get('/', function(req, res, next) {
    //Check if page value was passed
    Geral.taxonomiaDescritores()
    .then(taxonomia => {
        taxonomia = taxonomia.map(d => d.Descritor)
        page = req.query.page
        descritores = req.query.descritores
        tribunais = req.query.tribunais
        if (page == undefined) {
            page = 1
        }
        else {
            page = parseInt(page)
        }
        filtros={}
        if (descritores != undefined){
            filtros.Descritores = {$in: descritores.split(",").map(s=>decodeURI(s))}
            descritores = descritores.split(",").map(s=>decodeURI(s))
        }
        else{
            descritores = []
        }
        if (tribunais != undefined){
            filtros.Tribunal = {$in: tribunais.split(",").map(s=>decodeURI(s))}
            tribunais = tribunais.split(",").map(s=>decodeURI(s))
        }
        else{
            tribunais = []
        }
        Geral.pageFilters(page, filtros)
        .then(dados => {
            Geral.MaxPage(filtros)
            .then(maxPage => {
                Geral.getTribunais()
                .then(tribunaisList => {
                    tribunaisList = tribunaisList.map(t => t.Tribunal)
                    res.render('index', { alista: dados, page: page, maxPage:maxPage, descritores: descritores, taxonomia: taxonomia, tribunais: tribunais, tribunaisList: tribunaisList});
                })
                .catch(e => res.render('error', {error: e}))
            })
            .catch(e => res.render('error', {error: e}))
        })
        .catch(e => res.render('error', {error: e}))
    })
    .catch(e => res.render('error', {error: e}))
});



router.get('/acordaos/registo', function(req, res, next) {
    res.render('geralForm');
});

router.get('/acordaos/registo/atco1', function(req, res, next) {
    res.render('atco1Form');
});

router.get('/acordaos/registo/jcons', function(req, res, next) {
    res.render('jconsForm');
});

router.get('/acordaos/registo/jdgpj', function(req, res, next) {
    res.render('jdgpjForm');
});

router.get('/acordaos/registo/jsta', function(req, res, next) {
    res.render('jstaForm');
});

router.get('/acordaos/registo/jstj', function(req, res, next) {
    res.render('jstjForm');
});

router.get('/acordaos/registo/jtca', function(req, res, next) {
    res.render('jtcaForm');
});

router.get('/acordaos/registo/jtcampca', function(req, res, next) {
    res.render('jtcampcaForm');
});

router.get('/acordaos/registo/jtcampct', function(req, res, next) {
    res.render('jtcampctForm');
});

router.get('/acordaos/registo/jtcn', function(req, res, next) {
    res.render('jtcnForm');
});

router.get('/acordaos/registo/jtrc', function(req, res, next) {
    res.render('jtrcForm');
});

router.get('/acordaos/registo/jtre', function(req, res, next) {
    res.render('jtreForm');
});

router.get('/acordaos/registo/jtrg', function(req, res, next) {
    res.render('jtrgForm');
});

router.get('/acordaos/registo/jtrl', function(req, res, next) {
    res.render('jtrlForm');
});

router.get('/acordaos/registo/jtrp', function(req, res, next) {
    res.render('jtrpForm');
});


router.post('/acordaos/registo/atco1', function(req, res, next) {
    
    Atco.inserir(req.body)
    .then(dados1 => {

        // Inserir na "gerals"
        Geral.inserirEntrada(req.body, dados1._id)
        .then(dados2 => {
            console.log(dados2)
            res.redirect('/acordaos/' + dados2.Id)
        })
        .catch(e => res.render('error', {error: e}))
    
    })
    .catch(e => res.render('error', {error: e}))
});

router.post('/acordaos/registo/jcons', function(req, res, next) {
    Jcons.inserir(req.body)
    .then(dados1 => {

        // Inserir na "gerals"
        Geral.inserirEntrada(req.body, dados1._id)
        .then(dados2 => {
            console.log(dados2)
            res.redirect('/acordaos/' + dados2.Id)
        })
        .catch(e => res.render('error', {error: e}))
    
    })
    .catch(e => res.render('error', {error: e}))
});

router.post('/acordaos/registo/jdgpj', function(req, res, next) {
    Jdgpj.inserir(req.body)
    .then(dados1 => {

        // Inserir na "gerals"
        Geral.inserirEntrada(req.body, dados1._id)
        .then(dados2 => {
            console.log(dados2)
            res.redirect('/acordaos/' + dados2.Id)
        })
        .catch(e => res.render('error', {error: e}))
    
    })
    .catch(e => res.render('error', {error: e}))
});

router.post('/acordaos/registo/jsta', function(req, res, next) {
    Jsta.inserir(req.body)
    .then(dados1 => {

        // Inserir na "gerals"
        Geral.inserirEntrada(req.body, dados1._id)
        .then(dados2 => {
            console.log(dados2)
            res.redirect('/acordaos/' + dados2.Id)
        })
        .catch(e => res.render('error', {error: e}))
    
    })
    .catch(e => res.render('error', {error: e}))
});

router.post('/acordaos/registo/jstj', function(req, res, next) {
    Jstj.inserir(req.body)
    .then(dados1 => {

        // Inserir na "gerals"
        Geral.inserirEntrada(req.body, dados1._id)
        .then(dados2 => {
            console.log(dados2)
            res.redirect('/acordaos/' + dados2.Id)
        })
        .catch(e => res.render('error', {error: e}))
    
    })
    .catch(e => res.render('error', {error: e}))
});

router.post('/acordaos/registo/jtca', function(req, res, next) {
    Jtca.inserir(req.body)
    .then(dados1 => {

        // Inserir na "gerals"
        Geral.inserirEntrada(req.body, dados1._id)
        .then(dados2 => {
            console.log(dados2)
            res.redirect('/acordaos/' + dados2.Id)
        })
        .catch(e => res.render('error', {error: e}))
    
    })
    .catch(e => res.render('error', {error: e}))
});

router.post('/acordaos/registo/jtcampca', function(req, res, next) {
    Jtcampca.inserir(req.body)
    .then(dados1 => {

        // Inserir na "gerals"
        Geral.inserirEntrada(req.body, dados1._id)
        .then(dados2 => {
            console.log(dados2)
            res.redirect('/acordaos/' + dados2.Id)
        })
        .catch(e => res.render('error', {error: e}))
    
    })
    .catch(e => res.render('error', {error: e}))
});

router.post('/acordaos/registo/jtcampct', function(req, res, next) {
    Jtcampct.inserir(req.body)
    .then(dados1 => {

        // Inserir na "gerals"
        Geral.inserirEntrada(req.body, dados1._id)
        .then(dados2 => {
            console.log(dados2)
            res.redirect('/acordaos/' + dados2.Id)
        })
        .catch(e => res.render('error', {error: e}))
    
    })
    .catch(e => res.render('error', {error: e}))
});
router.post('/acordaos/registo/jtcn', function(req, res, next) {
    Jtcn.inserir(req.body)
    .then(dados1 => {

        // Inserir na "gerals"
        Geral.inserirEntrada(req.body, dados1._id)
        .then(dados2 => {
            console.log(dados2)
            res.redirect('/acordaos/' + dados2.Id)
        })
        .catch(e => res.render('error', {error: e}))
    
    })
    .catch(e => res.render('error', {error: e}))
});

router.post('/acordaos/registo/jtrc', function(req, res, next) {
    Jtrc.inserir(req.body)
    .then(dados1 => {

        // Inserir na "gerals"
        Geral.inserirEntrada(req.body, dados1._id)
        .then(dados2 => {
            console.log(dados2)
            res.redirect('/acordaos/' + dados2.Id)
        })
        .catch(e => res.render('error', {error: e}))
    
    })
    .catch(e => res.render('error', {error: e}))
});

router.post('/acordaos/registo/jtre', function(req, res, next) {
    Jtre.inserir(req.body)
    .then(dados1 => {

        // Inserir na "gerals"
        Geral.inserirEntrada(req.body, dados1._id)
        .then(dados2 => {
            console.log(dados2)
            res.redirect('/acordaos/' + dados2.Id)
        })
        .catch(e => res.render('error', {error: e}))
    
    })
    .catch(e => res.render('error', {error: e}))
});

router.post('/acordaos/registo/jtrg', function(req, res, next) {
    Jtrg.inserir(req.body)
    .then(dados1 => {

        // Inserir na "gerals"
        Geral.inserirEntrada(req.body, dados1._id)
        .then(dados2 => {
            console.log(dados2)
            res.redirect('/acordaos/' + dados2.Id)
        })
        .catch(e => res.render('error', {error: e}))
    
    })
    .catch(e => res.render('error', {error: e}))
});
router.post('/acordaos/registo/jtrl', function(req, res, next) {
    Jtrl.inserir(req.body)
    .then(dados1 => {

        // Inserir na "gerals"
        Geral.inserirEntrada(req.body, dados1._id)
        .then(dados2 => {
            console.log(dados2)
            res.redirect('/acordaos/' + dados2.Id)
        })
        .catch(e => res.render('error', {error: e}))
    
    })
    .catch(e => res.render('error', {error: e}))
});

router.post('/acordaos/registo/jtrp', function(req, res, next) {
    Jtrp.inserir(req.body)
    .then(dados1 => {

        // Inserir na "gerals"
        Geral.inserirEntrada(req.body, dados1._id)
        .then(dados2 => {
            console.log(dados2)
            res.redirect('/acordaos/' + dados2.Id)
        })
        .catch(e => res.render('error', {error: e}))
    
    })
    .catch(e => res.render('error', {error: e}))
});

router.get('/acordaos/editar/:IdAcordao', function(req, res) {
    const acordaoId = new mongoose.Types.ObjectId(req.params.IdAcordao)
    Geral.consultarId(acordaoId)
    .then(acordao => {
        controller = getTribunal(acordao.Tribunal)
        controller.findById(acordaoId)
        .then(dados => {
            console.dir(dados._doc)
            res.render('editar', {dados: dados._doc})
        })
        .catch(e => res.render('error', {error: e}))
    })
    .catch(e => res.render('error', {error: e}))
});

router.post('/acordaos/editar/:IdAcordao', function(req, res) {
    const acordaoId = new mongoose.Types.ObjectId(req.params.IdAcordao)
    Geral.consultarId(acordaoId)
    .then(acordao => {
        controller = getTribunal(acordao.Tribunal)
        controller.editar(acordaoId, req.body)
        .then(dados => {

            // Inserir na "gerals"
            Geral.editarEntrada(req.body, acordaoId)
            .then(dados2 => {
                res.redirect('/acordaos/' + acordaoId)
            })
            .catch(e => res.render('error', {error: e}))

        })
        .catch(e => res.render('error', {error: e}))
    })
    .catch(e => res.render('error', {error: e}))
});

router.get('/acordaos/:IdAcordao', function(req, res, next) {
    const acordaoId = new mongoose.Types.ObjectId(req.params.IdAcordao)
    Geral.consultarId(acordaoId)
    .then(acordao => {
        tribunal = acordao.Tribunal
        controller = getTribunal(tribunal)
        controller.findById(acordaoId)
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
