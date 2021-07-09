const jwt = require('jsonwebtoken')
const {sequelize, user, upReport, report} = require('../helper/connect')
const { Op } = require("sequelize");

class DetailController {
    index(req,res){ 
    }

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

    index2( req, res){
        report.findAll({
            include:{
                model: upReport,
                foreignKey: 'upReport_id',
                as: 'upReport',
                attributes:['week', 'month', 'year','reportName']
            },
            attributes:['upReport_id','type','mb_tradi','mb_onl','mb_shopee','mb_duan','mn_tradi','mn_tiki','mn_duan',
            'bl_bm','bl_canhan','mkt','mkt_bm','upReport.week','upReport.month','upReport.year','upReport.reportName'
        ]
        })
        .then(data =>{
            var data2;
            var data3;
            Promise.all([
               getVal(1, req.params.id)
               .then(data =>{
                   data2 = data
               }),
               getVal(2, req.params.id)
               .then(data =>{
                   data3 = data
               })
            ])
            .then( () =>{
                
                res.render('detail.hbs',{
                    username: req.result.fullname,
                    picturelink: req.result.avatar,
                    week: data[0].upReport.week,
                    month: data[0].upReport.month,
                    year: data[0].upReport.year,
                    reportName: data[0].upReport.reportName,

                    mb_tradi_1: data2.mb_tradi,
                    mb_onl_1: data2.mb_onl,
                    mb_shopee_1: data2.mb_shopee,
                    mb_duan_1: data2.mb_duan,
                    mn_tradi_1: data2.mn_tradi,
                    mn_tiki_1: data2.mn_tiki,
                    mn_duan_1: data2.mn_duan,
                    bl_bm_1: data2.bl_bm,
                    bl_canhan_1: data2.bl_canhan,
                    mkt_1:  data2.mkt, 
                    mkt_bm_1: data2.mkt_bm,
                    mb1: data2.mb_tradi + data2.mb_onl +data2.mb_shopee +data2.mb_duan,
                    mn1: data2.mn_tradi + data2.mn_tiki + data2.mn_duan, 

                    mb_tradi_2: data3.mb_tradi,
                    mb_onl_2: data3.mb_onl,
                    mb_shopee_2: data3.mb_shopee,
                    mb_duan_2: data3.mb_duan,
                    mn_tradi_2: data3.mn_tradi,
                    mn_tiki_2: data3.mn_tiki,
                    mn_duan_2: data3.mn_duan,
                    bl_bm_2: data3.bl_bm,
                    bl_canhan_2: data3.bl_canhan,
                    mkt_2:  data3.mkt, 
                    mkt_bm_2: data3.mkt_bm,
                    mb2: data3.mb_tradi + data3.mb_onl +data3.mb_shopee +data3.mb_duan,
                    mn2: data3.mn_tradi + data3.mn_tiki + data3.mn_duan,

                    mb_tradi_per: getPercent(data2.mb_tradi,data3.mb_tradi).toFixed(2),
                    mb_onl_per:  getPercent(data2.mb_onl,data3.mb_onl).toFixed(2),
                    mb_shopee_per: getPercent(data2.mb_shopee,data3.mb_shopee).toFixed(2),
                    mb_duan_per: getPercent(data2.mb_duan,data3.mb_duan).toFixed(2),
                    mn_tradi_per: getPercent(data2.mn_tradi,data3.mn_tradi).toFixed(2),
                    mn_tiki_per: getPercent(data2.mn_tiki,data3.mn_tiki).toFixed(2),
                    mn_duan_per: getPercent(data2.mn_duan,data3.mn_duan).toFixed(2),
                    bl_bm_per: getPercent(data2.bl_bm,data3.bl_bm).toFixed(2),
                    bl_canhan_per: getPercent(data2.bl_canhan,data3.bl_canhan).toFixed(2),
                    mkt_per:  getPercent(data2.mkt,data3.mkt).toFixed(2), 
                    mkt_bm_per: getPercent(data2.mkt_bm,data3.mkt_bm).toFixed(2),
                    mb_per: getPercent(data2.mb_tradi + data2.mb_onl +data2.mb_shopee +data2.mb_duan,
                        data3.mb_tradi + data3.mb_onl +data3.mb_shopee +data3.mb_duan).toFixed(2),
                    mn_per: getPercent(data2.mn_tradi + data2.mn_tiki + data2.mn_duan,
                        data3.mn_tradi + data3.mn_tiki + data3.mn_duan ).toFixed(2)
                })
            })
            
        }
        )
        .catch(err =>{
            res.redirect('/manh')
        })
        
     
    }
}
function getVal(type){
    return report.findOne({
        where: {
            type: type
        }
        
    })
}
function getPercent(num1,num2){
    if(num2 == 0 && num1 > num2){
        return 100;
    }
    if(num2 == 0 && num1 == 0){
        return 0;
    }
    return num1 / num2 * 100;
}

module.exports = new DetailController