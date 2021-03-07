import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  return res.send(req.context.models.users[req.context.me.id]);
});

router.get('/geografique', function(req,res){
  console.log("funciono");
  res.send("Hola amigos ya llegué soy geografique");
});

export default router;
