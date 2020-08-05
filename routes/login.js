module.exports = (req, res, next) => {
  if (!req.user) {
    return res.render("error", {
      message: 'Not logged in'
    });}
  next();
};
