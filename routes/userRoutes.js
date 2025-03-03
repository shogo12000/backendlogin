import express from 'express';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

router.get('/profile', verifyToken, (req, res) => {
  console.log(req.query);
  res.json({ message: 'Rota protegida!', user: {name:"teste"}});
});

router.post('/profilebody', verifyToken, (req, res) => {
  console.log(req.body);
  res.json({ message: 'Rota protegida!', user: {name:"teste"}});
});

router.get('/verify-token', verifyToken, (req, res)=>{
  res.json({message: 'token Valido'})
})
export default router;

