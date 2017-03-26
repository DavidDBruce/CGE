module.exports = {
    ensureLoggedIn: function(req,res,next){
        if(req.isAuthenticated()){
            return next() ;
        }else{


            req.flash('failure',{msg:"Please login to create an estimate"});

            res.render('account/login',{status:"Please login.",errors:""});
        }
    }
}