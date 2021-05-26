const jwt = require('jsonwebtoken')

const {sequelize,user} = require('../helper/connect')
class RegisterController {

    index2(req, res, next){
        res.render('register.hbs')
    }

    register(req, res, next) {
        var username = req.body.username
        var password = req.body.password
        var fullname = req.body.fullname
        var avatar = req.body.avatar
        var mcBooks_id = req.body.mcBooks_id
       
  
        user.findOne({
         where: { username: username },

        })
        .then( data => {
          if(data){            
            res.json('This user already exists')
          }else{
           return  user.create({
              username : username,
              password : password,
              fullname: fullname,
              avatar: avatar,
              mcBooks_id: mcBooks_id
            })
          }
        })
        .then(data =>{
         
          if(data){
            return res.json('Account successful created')
          }
        })
        .catch(error => {
         return console.log(error);
        })
      }

}

module.exports = new RegisterController;