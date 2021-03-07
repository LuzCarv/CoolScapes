import { Router } from 'express';
import initialize from '../passportConfig';

const router = Router();
const initializePassport = require("../passportConfig");
const passport = require("passport");

initializePassport(passport);
router.use(passport.initialize());
router.use(passport.session());

/*router.post('/', passport.authenticate("local"), function(req,res){
  //var username = req.body.username;
  //var password = req.body.password; 
};  

);

*/

 export default router;
