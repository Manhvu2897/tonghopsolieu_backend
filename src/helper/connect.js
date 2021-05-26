const { Sequelize } = require('sequelize')

const userModel = require('../../models/user')
const upReportModel = require('../../models/upReport')
const reportModel =require('../../models/report')



const sequelize = new Sequelize('VuManh123', 'postgres', 'manh12345', {
    host: '127.0.0.1', //127.0.0.1
    dialect: 'postgres',
    logging: false,
    // define:{
    //   timestamps: false
    // }
})

const user = userModel(sequelize,Sequelize);
const upReport = upReportModel(sequelize,Sequelize)
const report = reportModel(sequelize,Sequelize);



// associate
user.hasMany(upReport, {foreignKey: 'user_id'})
upReport.belongsTo(user, {foreignKey: 'user_id'})

upReport.hasMany(report, {foreignKey: 'upReport_id'})
report.belongsTo(upReport, {foreignKey: 'upReport_id'})

sequelize.sync({force: false})
.then(console.log('Successful !!'));

module.exports = {
    sequelize,
    user,
    report,
    upReport
  
}
