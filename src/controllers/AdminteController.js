const jwt = require('jsonwebtoken')
const {sequelize,user} = require('../helper/connect')

class AdminteController {
    // Use /adminte
    index(req, res, next){
        res.render('adminte.hbs')
    }
    post(req, res, next) {
        var username = req.body.username
        var password =req.body.password
        
        user.findOne({
            where:{
                username: username,
                password: password
            }
        })
        .then(data =>{
            if(data){
                var token = jwt.sign({id: data.id}, 'mk')
              return  res.json({
                  message: 'Login successful',
                  token:  token
              })
            }else{
              return  res.json(' Login failed')
            }
        })
        .catch(error =>{
            res.status(500).json('Dieeeee')
        })
    }


    //check phân quyền
    check(req, res,next){
        var role = req.data.username
       
        if(role === 'Vugiamanh1997@gmail.com'){
            next()
        }else{
            res.redirect('/home')
        }
    }

    //GET /adminte
    index1 (req, res, next){
        var token = req.cookies.token
        var result = jwt.verify(token, 'mk')
        
      user.findOne({
          where:{
              id: result.id
          }
      })
      .then(data=>{
        if(data){
            req.data= data
           
            next()
            

        }else{
            res.redirect('/login')
        }
      })
      .catch(err=>{
        
        res.redirect('/login')
      })
    }
   async index2 (req ,res ,next){
          
        
            res.render('adminte.hbs',{
                picturelink: req.data.avatar,
                username: req.data.fullname        
            })
        
       
    }



}

module.exports = new AdminteController