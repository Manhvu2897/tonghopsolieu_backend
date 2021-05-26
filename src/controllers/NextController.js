
const { user, sequelize} = require('../helper/connect')
const jwt = require('jsonwebtoken')

class NextController {
    
    index(req, res, next){

    }
    index2 (req, res, next){
        try {
            var token = req.cookies.token
            var result = jwt.verify(token, 'mk')
            user.findOne({
                where: {
                    id: result.id
                }
            })
            .then(result =>{
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

    index3(req, res) {
            
        res.render('next.hbs',{
            picturelink: req.result.avatar,
            username: req.result.fullname
        })
    }
   
}

module.exports = new NextController;