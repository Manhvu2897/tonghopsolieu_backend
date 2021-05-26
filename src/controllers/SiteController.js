

const  {sequelize ,user, report, uploadReport } = require('../helper/connect')
const jwt = require('jsonwebtoken')


class SiteController {
    // GET /home

 index(req, res, next) { 
        
   
    }

     
    // GET /home
    index2 (req, res, next){
        try {
            var token = req.cookies.token
            var result = jwt.verify(token, 'mk')
            user.findOne({
                where:{
                        id: result.id
                }
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
    //GET /home
    index3 (req ,res ,next){
   
        res.render('home.hbs', {
          username: req.result.fullname,
          picturelink: req.result.avatar,
          id: req.result.id
        })
       
    }


  

   
}

module.exports = new SiteController;