var express = require('express');
var router = express.Router();
var axios = require('axios');

router.get('/registar', function(req, res, next) {
  res.render('registerTeam');
});


router.get('/:id', function(req, res, next) {
  axios.get('http://localhost:8000/api/teams/'+req.params.id)
    .then(dados=>{
      var team = dados.data[0];
      var members =team.members;
      res.render('equipe',{team:team,members:members})
    })
    .catch(e => res.render('error',{error:e}))
  });  

/* GET home page. */
router.get('/', function(req, res, next) {
  axios.get('http://localhost:8000/api/teams')
    .then(dados=>{
      res.render('index',{teams:dados.data})
    })
    .catch(e => res.render('error',{error:e}))
  });



router.post('/',(req,res,next)=>{
  axios.post('http://localhost:8000/api/teams',req.body)
  .then(dados => {
    res.redirect('http://localhost:8001');
  })
  .catch(e => res.render('error',{error:e}))  

})
 


module.exports = router;