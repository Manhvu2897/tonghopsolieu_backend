const { sequelize, user, report, uploadReport} = require('../helper/connect')
const { Op } = require("sequelize")

const PAGE_SIZE = 2
const jwt = require('jsonwebtoken') 

class ManhController {
 
   index(req, res) {
    //  res.render('manh.hbs')
    }

    //post /manh/register
    register(req, res, next) {
      var username = req.body.username
      var password = req.body.password


      user.findOne({
       where: { username: username}
      })
      .then( data => {
        //console.log(data);
        if(data){
          res.json('This user already exists')
        }else{
         return  user.create({
            username : username,
            password : password
          
          })
        }
      })
      .then(data =>{
        if(data){
          return res.json('Account successful created')
        }
      })
      .catch(error => {
          res.json('loi server')
      })
    }
    

  //POST /manh/login
    login(req, res, next) {
      var username = req.body.username
      var password = req.body.password

  user.findOne({
    where:{
      username: username,
      password: password
    }
  })
  .then(data=>{
    if(data){
      return res.json('Login successfully')
    }
  })
  .then(data=>{
    if(!data){
     return res.json('Noooo')
    }
  })
  .catch(error=>{
    res.writeHead(500).json('Failed')
  }) 
  
      
    }


    //GET /manh/log
    log(req, res, next) {
      user.findAll({ offset : 3, limit : 2})
      .then(data=>{
        res.json(data)
      })
      .catch(error=>{
        res.json(error)
      })
    }

    //DELETE /manh/delete
    del(req, res){
      try {
        var token = req.cookies.token
        var result = jwt.verify(token, 'mk')
        user.destroy({
          where: { id : result.id}
        })
        .then(data=>{
          res.json('Success')
        })
        .catch(error=>{
          res.json(error)
        })
      } catch (error) {
        res.json(error)
      }
    }


    // PUT /manh/put    
    pul(req, res){
      var token = req.cookies.token
      var result = jwt.verify(token, 'mk')

      var newPassword = req.body.newPassword
      var newFullname = req.body.newFullname
      user.update({password: newPassword, fullname: newFullname}, {
        where :{ id : result.id }
      })
      .then(data =>{
      
        if(data){
          return res.json('thanh cong')
        }else{
          res.json('sai')
        }
      })
      .catch(error =>{
        res.status(500).json('loi')
      })
    }

    // GET /manh/page

    page(req, res){
      var page = req.query.page
    
        if(page) {
              if(page < 1){
                page = 1
              }
            page = parseInt(page)
            var amountOmit = (page -1)*PAGE_SIZE
           
            user.findAll({offset: amountOmit, limit : PAGE_SIZE})
            .then(data=>{ 
                
               user.findAndCountAll({}).then((total)=>{
                var load = total.count 
                var totalPage = Math.ceil(load/PAGE_SIZE)             
                  res.json({
                  load: load,               
                  data : data
                })
                
              })         
            })
            .catch(error=>{
              res.status(500).json('123')
            })
        }else{
          user.findAll({})
          .then(data=>{
            res.json(data)
          })
          .catch(error=>{
            res.status(500).json(error)
          })
        }
      
    }
    
    // GET /manh
    baocao1 (req, res, next){
      try {
          var token = req.cookies.token
          var result = jwt.verify(token, 'mk')
          
          user.findOne({
            where:{ id : result.id }
          })
          .then(result=>{
              
                if(result){
                  req.result = result
                  next()
              }
            
          })
          .catch(err =>{
            res.json(err)
          })
          
      } catch (error) {
          return res.redirect('/login')
      }   
  }
    baocao2 (req ,res ,next){
     
      res.render('manh.hbs', {
        picturelink: req.result.avatar,
          username : req.result.fullname
      })
  }
}

module.exports = new ManhController;