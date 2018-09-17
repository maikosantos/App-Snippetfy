module.exports = {
  sigin(req, res) {
    return res.render("auth/sigin");
  },
  sigup(req, res) {
    return res.render("auth/sigup");
  }
};
