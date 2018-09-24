const { Snippet } = require('../models');

module.exports = {
  async store(req, res, next) {
    const { categoryId } = req.params;
    try {
      const snippet = await Snippet.create({
        ...req.body,
        CategoryId: categoryId,
      });

      req.flash('success', 'Snippet criado com sucesso');

      return res.redirect(`/app/categories/${categoryId}/snippets${snippet.id}`);
    } catch (error) {
      return next(error);
    }
  },
};
