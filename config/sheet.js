
const XLSX = require('xlsx');
const { sequelize, report , } = require('../src/helper/connect')

function getValue(file, cell){
    var workbook = XLSX.readFile(file);
    var worksheet = workbook.Sheets[workbook.SheetNames[0]];

    var desired_cell = worksheet[cell];
    var desired_value = (desired_cell ? desired_cell.v : undefined);
    return desired_value;
}


function getKeHoachBanRaMcBooks (file, upReport_id){

    var mb_tradi = getValue(file, 'B4');
    var mb_onl = getValue(file, 'B5');
    var mb_shopee = getValue(file, 'B6');
    var mb_duan = getValue(file, 'B7');
    var mn_tradi = getValue(file, 'B9');
    var mn_tiki = getValue(file, 'B10');
    var mn_duan = getValue(file, 'B11');
    var bl_bm = getValue(file, 'B13');
    var bl_canhan = getValue(file, 'B14');
    var mkt = getValue(file, 'B19');
    var mkt_bm = getValue(file, 'B20');
        
    try {
        report.create(
            {   
                upReport_id:upReport_id,
                type: 1,
                mb_tradi: mb_tradi,
                mb_onl:mb_onl,
                mb_shopee:mb_shopee,
                mb_duan:mb_duan,
                mn_tradi:mn_tradi,
                mn_tiki:mn_tiki,
                mn_duan:mn_duan,
                bl_bm:bl_bm,
                bl_canhan:bl_canhan,
                mkt:mkt,
                mkt_bm:mkt_bm,
            }
        )
    } catch (error) {
        console.log(error);
    }
}

function getThucTeBanRaMcBooks (file,upReport_id){

    var mb_tradi = getValue(file, 'C4');
    var mb_onl = getValue(file, 'C5');
    var mb_shopee = getValue(file, 'C6');
    var mb_duan = getValue(file, 'C7');
    var mn_tradi = getValue(file, 'C9');
    var mn_tiki = getValue(file, 'C10');
    var mn_duan = getValue(file, 'C11');
    var bl_bm = getValue(file, 'C13');
    var bl_canhan = getValue(file, 'C14');
    var mkt = getValue(file, 'C19');
    var mkt_bm = getValue(file, 'C20');

    try {
        report.create(
            {   
                upReport_id:upReport_id,
                type: 2,
                mb_tradi: mb_tradi,
                mb_onl:mb_onl,
                mb_shopee:mb_shopee,
                mb_duan:mb_duan,
                mn_tradi:mn_tradi,
                mn_tiki:mn_tiki,
                mn_duan:mn_duan,
                bl_bm:bl_bm,
                bl_canhan:bl_canhan,
                mkt:mkt,
                mkt_bm:mkt_bm,
            }
        )
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getKeHoachBanRaMcBooks,
    getThucTeBanRaMcBooks,
}