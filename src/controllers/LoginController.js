
const {sequelize,user} = require('../helper/connect')
const jwt = require('jsonwebtoken')



class LoginController {
    
    index(req, res) {
        res.render('login.hbs')
    }
   
    //POST /login
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
            
                var token = jwt.sign({id :data.id },'mk')
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

    // checkrole
    // role(req, res, next) {
    //     var role= req.data.username
    //     if(role === 'Vugiamanh1997@gmail.com'){
    //         next()
    //     }else{
    //         res.json('khong co')
    //     }
    //     next()
    // }

    //GET login/private
    // check1(req, res,next){
    //     try {
    //         var token = req.cookies.token
    //         var result = jwt.verify(token, 'mk')
    //         user.findOne({
    //             where: {
    //                 id: result
    //             }
    //         })
    //         .then(data =>{
    //             if(data){
    //                 req.data = data
    //                 next()
                  
    //             }
    //         })
    //         .catch(err => {
    //             res.json('khong có token')
    //         })
    //     } catch (error) {
    //         return res.redirect('/login')
    //     }
    // }
    // check2(req, res, next){
    //     console.log(req.data);
    //     res.json(`<h2>HELLO</h2>`)
    // }


    

}  

module.exports = new LoginController;