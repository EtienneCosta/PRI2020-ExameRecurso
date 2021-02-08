var express = require('express');
var router = express.Router();
var Equipe = require('../controllers/equipe');
var jwt = require('jsonwebtoken');


/* GET home page. */
router.get('/api/teams', (req, res, next)=> {
  Equipe.list()
      .then(dados => res.status(201).jsonp(dados))
      .catch(e => res.status(500).jsonp({error:e}))  
});

router.get('/api/token',(req,res,next)=>{
  var sub="Exame";
  var data ="dataDosistema";
  const token = jwt.sign({sub,data},"DAW-PRI-2020-recurso",{
    expiresIn:3600
  });
return res.status(200).jsonp({token:token});

})

router.get('/api/teams/:id', (req, res, next)=> {
  Equipe.lookup(req.params.id)
      .then(dados => res.status(201).jsonp(dados))
      .catch(e => res.status(500).jsonp({error:e}))  
});


router.get('/api/teams/:id/members/:idMember',(req,res,next)=>{
  Equipe.lookupmember(req.params.id,req.params.idMember)
  .then(dados => res.status(201).jsonp(dados))
  .catch(e => res.status(500).jsonp({error:e}))  

})

/* --------------- */

router.post('/api/teams',(req,res,next)=>{
  Equipe.insertequipe(req.body)
  .then(dados => res.status(201).jsonp(dados))
  .catch(e => res.status(500).jsonp({error:e}))
})

router.post('/api/teams/:id/members',(req,res,next)=>{
  Equipe.insertmember(req.params.id,req.body)
      .then(dados => res.status(201).jsonp(dados))
      .catch(e => res.status(500).jsonp({error:e}))
})

router.delete('/api/teams/:id',(req,res,next)=>{
  Equipe.deleteequipe(req.params.id)
    .then(dados=> {
       res.status(200).json({message: true})
    })
    .catch(e => res.status(404).jsonp({message: false}))
  });

  
router.delete('/api/teams/:id/members/:idMember',(req,res,next)=>{
  Lista.deletemember(req.params.id,req.params.idMember)
    .then(dados=> {
        res.status(200).json({message: true})
    })
    .catch(e => res.status(404).jsonp({message: false}))
  });

module.exports = router;