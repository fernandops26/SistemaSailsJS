
var passport = require('passport');
var LocalStrategy = require('passportLocal').Strategy;
var md5 = require('md5'); 
passport.serializeUser(function(user, done) { 
    done(null, user.id); 
}); 
passport.deserializeUser(function(id, done) { 
    User.findOne({ id: id } , function (err, user) { 
        done(err, user); 
    }); 
}); 
passport.use(new LocalStrategy({ 
    usernameField: 'username', 
    passwordField: 'password' 
  }, 
  function(username, password, done) { 
    User.findOne({ username: username }, function (err, user) { 
      if (err) { return done(err); } 
      if (!user) { 
        return done(null, false, { message: 'Contraseña incorrecta' }); 
      } 
            if(md5(password)===user.password_enc){
                var returnUser = { 
                username: user.username, 
                createdAt: user.createdAt, 
                id: user.id 
                }; 
                return done(null,returnUser,{message:'--Logeado correctamente'});
            }else{
                return done(null, false, { message: '--Contraseña invalida'}); 
            }

//       bcrypt.compare(password, user.password, function (err, res) { 
//           if (!res) 
//            
//           var returnUser = { 
//             email: user.email, 
//             createdAt: user.createdAt, 
//             id: user.id 
//           }; 
//           return done(null, returnUser, { 
//             message: 'Logged In Successfully' 
//           }); 
//         }); //
    }); 
  } 
)); 
