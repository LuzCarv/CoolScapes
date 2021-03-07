import { Router } from 'express';

const router = Router();

router.get('/', function(req,res){
  console.log("fonctionne");
  res.send("catalogue");
});

export default router;

