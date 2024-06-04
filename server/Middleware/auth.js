const jwt = require('jsonwebtoken')


exports.auth = async (req, res, next) => {
  try {
    const token = req.headers["authtoken"]
    if (!token) {
      res.status(401).send("Notoken")
    }
    const decoded = jwt.verify(token, 'jwtsecret')
    console.log(decoded)
    req.user = decoded.user

    next()
  } catch (err) {
    res.status(500).send("Token Valid")
  }


}
