class TestController {
    index(req, res){
        res.render('test.hbs')
    }
}
module.exports = new TestController;