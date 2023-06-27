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
var axios = require('axios');
var jwt = require('jsonwebtoken');
const { mongo, default: mongoose } = require('mongoose');

function verificaAcesso(req, res, next){
    var myToken = req.query.token || req.body.token || req.cookies.token
    if(myToken){
        jwt.verify(myToken, "rpcw2023", function(e, payload){
            if(e){
                res.status(401).jsonp({error: e})
            }
            else{
                next()
            }
        })
    }
    else{
        res.status(401).jsonp({error: "Token inexistente!"})
    }
}

function verificaLoggedIn(req, res, next){
    var myToken = req.query.token || req.body.token || req.cookies.token
    if(myToken){
        jwt.verify(myToken, "rpcw2023", function(e, payload){
            if(e){
                next()
            }
            else{
                req.user = payload.username
                req.nivel = payload.level
                next()
            }
        })
    }
    else{
        next()
    }
}

/* GET home page. */
router.get('/', verificaLoggedIn, function(req, res, next) {
    //Check if page value was passed
    Acordaos.taxonomiaDescritores()
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
        Acordaos.pageFilters(page, filtros)
        .then(dados => {
            Acordaos.MaxPage(filtros)
            .then(maxPage => {
                Acordaos.getTribunais()
                .then(tribunaisList => {
                    tribunaisList = tribunaisList.map(t => t.Tribunal)
                    res.render('index', { alista: dados, page: page, maxPage:maxPage, descritores: descritores, taxonomia: taxonomia, tribunais: tribunais, tribunaisList: tribunaisList, user: req.user, nivel: req.nivel});
                })
                .catch(e => res.render('error', {error: e}))
            })
            .catch(e => res.render('error', {error: e}))
        })
        .catch(e => res.render('error', {error: e}))
    })
    .catch(e => res.render('error', {error: e}))
});

router.get('/login', function(req, res, next) {
    res.render('login');
});

router.post('/login', function(req, res, next) {
    axios.post('http://localhost:7013/users/login', req.body)
    .then(dados => {
        res.cookie('token', dados.data.token, {
            expires: new Date(Date.now() + '1d'),
            secure: false, // set to true if your using https
            httpOnly: true,
        });
        res.status(200).redirect('/')
    })
    .catch(e => res.render('error', {error: e}))
});

router.get('/logout', verificaAcesso, function(req, res, next) {
    res.clearCookie('token')
    res.redirect('/')
});

router.get('/register', function(req, res, next) {
    res.render('register');
});

router.post('/register', function(req, res, next) {
    req.body.nivel = "user"
    axios.post('http://localhost:7013/users/register', req.body)
    .then(dados => {
        res.redirect('/')
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
    .then(dadosAtco => {

        // Dados para a "gerals"
        var subReqBody = {Id: dadosAtco._id, 
                        Processo : req.body.Processo, 
                        Data : req.body["Data do Acordão"], 
                        Tribunal : req.body.tribunal, 
                        Descritores : req.body.Descritores}
                        
        // Inserir na "gerals"
        Acordaos.inserir(subReqBody)
        .then(dadosGeral => {
            res.redirect('/acordaos/' + dadosGeral.Id)
        })
        .catch(e => res.render('error', {error: e}))
    
    })
    .catch(e => res.render('error', {error: e}))
});

router.post('/acordaos/registo/jcons', function(req, res, next) {
    Jcons.inserir(req.body)
    .then(dados => {
        res.redirect('/' + dados.Processo)
    })
    .catch(e => res.render('error', {error: e}))
});

router.post('/acordaos/registo/jdgpj', function(req, res, next) {
    Jdgpj.inserir(req.body)
    .then(dados => {
        res.redirect('/' + dados.Processo)
    })
    .catch(e => res.render('error', {error: e}))
});

router.post('/acordaos/registo/jsta', function(req, res, next) {
    Jsta.inserir(req.body)
    .then(dados => {
        res.redirect('/' + dados.Processo)
    })
    .catch(e => res.render('error', {error: e}))
});

router.post('/acordaos/registo/jstj', function(req, res, next) {
    Jstj.inserir(req.body)
    .then(dados => {
        res.redirect('/' + dados.Processo)
    })
    .catch(e => res.render('error', {error: e}))
});

router.post('/acordaos/registo/jtca', function(req, res, next) {
    Jtca.inserir(req.body)
    .then(dados => {
        res.redirect('/' + dados.Processo)
    })
    .catch(e => res.render('error', {error: e}))
});

router.post('/acordaos/registo/jtcampca', function(req, res, next) {
    Jtcampca.inserir(req.body)
    .then(dados => {
        res.redirect('/' + dados.Processo)
    })
    .catch(e => res.render('error', {error: e}))
});

router.post('/acordaos/registo/jtcampct', function(req, res, next) {
    Jtcampct.inserir(req.body)
    .then(dados => {
        res.redirect('/' + dados.Processo)
    })
    .catch(e => res.render('error', {error: e}))
});

router.post('/acordaos/registo/jtcn', function(req, res, next) {
    Jtcn.inserir(req.body)
    .then(dados => {
        res.redirect('/' + dados.Processo)
    })
    .catch(e => res.render('error', {error: e}))
});

router.post('/acordaos/registo/jtrc', function(req, res, next) {
    Jtrc.inserir(req.body)
    .then(dados => {
        res.redirect('/' + dados.Processo)
    })
    .catch(e => res.render('error', {error: e}));
});

router.post('/acordaos/registo/jtre', function(req, res, next) {
    Jtre.inserir(req.body)
    .then(dados => {
        res.redirect('/' + dados.Processo)
    })
    .catch(e => res.render('error', {error: e}));
});

router.post('/acordaos/registo/jtrg', function(req, res, next) {
    Jtrg.inserir(req.body)
    .then(dados => {
        res.redirect('/' + dados.Processo)
    })
    .catch(e => res.render('error', {error: e}));
});

router.post('/acordaos/registo/jtrl', function(req, res, next) {
    Jtrl.inserir(req.body)
    .then(dados => {
        res.redirect('/' + dados.Processo)
    })
    .catch(e => res.render('error', {error: e}));
});

router.post('/acordaos/registo/jtrp', function(req, res, next) {
    Jtrp.inserir(req.body)
    .then(dados => {
        res.redirect('/' + dados.Processo)
    })
    .catch(e => res.render('error', {error: e}));
});

router.get('/acordaos/:IdAcordao', function(req, res, next) {
    const acordaoId = new mongoose.Types.ObjectId(req.params.IdAcordao)
    Acordaos.consultarId(acordaoId)
    .then(acordao => {
        tribunal = acordao.Tribunal
        controller = getTribunal(tribunal)
        controller.findById(acordao.Id)
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
