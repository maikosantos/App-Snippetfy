const { User } = require('../models');
const bcrypt = require('bcrypt');

module.exports = {
  sigin(req, res) {
    return res.render('auth/sigin');
  },

  sigup(req, res) {
    return res.render('auth/sigup');
  },

  async register(req, res) {
    const { email } = req.body;

    if (await User.findOne({ where: { email } })) {
      req.flash('error', 'E-mail já cadastrado.');
      return res.redirect('back');
    }

    const password = await bcrypt.hash(req.body.password, 5);

    await User.create({ ...req.body, password });

    req.flash('success', 'Usuário cadastrado com sucesso.');
    return res.redirect('/');
  },

  async authenticate(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      req.flash('error', 'Usuário inexistente.');
      return res.redirect('back');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      req.flash('error', 'Senha incorreta.');
      return res.redirect('back');
    }

    req.session.user = user;

    return req.session.save(() => {
      res.redirect('app/dashboard');
    });
  },

  sigout(req, res) {
    return req.session.destroy(() => {
      res.redirect('/');
    });
  },
};
