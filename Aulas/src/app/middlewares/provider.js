module.exports = (req, res, next) => {
  if (req.session && req.session.user) {
    if (req.session.user.provider) return res.redirect('/app/provider')
    return next()
  }
}
