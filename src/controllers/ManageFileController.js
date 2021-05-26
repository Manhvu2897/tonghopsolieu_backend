
const jwt = require('jsonwebtoken')
const {sequelize, user, upReport, report} = require('../helper/connect')
const formidable = require('formidable');
const getXlsx = require('../../config/sheet')
const { Op } = require("sequelize");
class manageFileController {

        index(req, res){

        }
        // check
        check(req, res, next){
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
       // GET manageFile
        index2(req, res){
            upReport.findAll({
                include:{
                    model: user,
                    foreignKey: 'user_id',
                    as: 'user',
                    attributes:['fullname']
                },
                attributes:['id','reportName','user.fullname','week','month','year']
            })
            .then(data=>{
                res.render('manageFile.hbs',{
                    data: data,
                    username: req.result.fullname,
                    picturelink: req.result.avatar,

                })
            })
            .catch(err =>{
                res.json(err)
            })

            
        }



       //POST manageFile/store 
        store(req, res, next){
            const form = formidable({ multiples: false });
            // console.log(req.result);
            form.parse(req, (err, fields, files) =>{
                if(files.rp_path.name = ''){
                    error = 'Erorr: Chưa chọn file báo cáo !!',
                    res.redirect('/manh');
                }else{
                    var path = files.rp_path.path; 
                    upReport.create({reportName: fields.reportName, user_id: req.result.id, week: fields.week, month: fields.month, year: fields.year, link: 'null'})
                    .then(rp =>{
                        getXlsx.getKeHoachBanRaMcBooks(path, rp.id)
                        getXlsx.getThucTeBanRaMcBooks(path, rp.id)
                    })
                    .then(
                        () => res.redirect('/manh')
                    )
                    .catch(err =>{
                        res.json(err)
                    })
                }
            })
        }
        
        //DELETE /manageFile
        delete(req, res){
                upReport.destroy({
                    where:{ id : { [Op.gte]: 1} }
                })
                .then(data=>{
                    res.json('thanhcong')
                })
                .catch(err =>{
                    res.json(err)
                })
        }

    //     delete(req, res){
    //         report.destroy({
    //             where:{ id : { [Op.gte]: 1} }
    //         })
    //         .then(data=>{
    //             res.json('thanhcong')
    //         })
    //         .catch(err =>{
    //             res.json(err)
    //         })
    // }



}

module.exports = new manageFileController;