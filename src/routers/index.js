const manhRouter = require('./manh')
const siteRouter = require('./site')
const nextRouter = require('./next');
const registerRouter = require('./register')
const loginRouter = require('./login')
const adminteRouter = require('./adminte')
const manageFileRouter = require('./manageFile')
const detailRouter = require('./detail')
const testRouter = require('./test')

function route(app) {
    app.use('/test', testRouter)

    app.use('/detail', detailRouter)

    app.use('/manageFile', manageFileRouter)
    
    app.use('/adminte', adminteRouter )

    app.use('/register', registerRouter)
       
    app.use('/manh', manhRouter);

    app.use('/next', nextRouter);

    app.use('/login', loginRouter);

    app.use('/', siteRouter);
    
    
    
}

module.exports = route;