 
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js'
 
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
 
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'Email já registrado' });
 
    const user = await User.create({
      username,
      email,
      password,
    });

 
    res.status(201).json({
      token: generateToken(user._id),
      user: { id: user._id, username: user.username, email: user.email },
    });

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Erro ao registrar usuário' });
  }
};

export const login = async (req, res) => {
  console.log("chegou aqui...."); 
  try {
    const { email, password } = req.body;
    console.log("chegou aqui...."); 
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Usuário não encontrado' });
 
    const isMatch = await bcrypt.compare(password, user.password);
  
    if (!isMatch) return res.status(400).json({ message: 'Senha incorreta' });

    res.json({
      token: generateToken(user._id),
      user: { id: user._id, username: user.username, email: user.email },
    });

  } catch (error) {
    res.status(500).json({ message: 'Erro ao fazer login' });
  }
};
