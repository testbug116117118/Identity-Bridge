const { generateAuthCode } = require('../utils/codeGenerator');
const { validateRedirectUri } = require('../services/authorizationService');

exports.authorize = (req, res) => {
  const { client_id, redirect_uri, response_type, state, scope } = req.query;
  
  if (!req.session.user) {
    // Save authorization request params in session
    req.session.authRequest = { client_id, redirect_uri, response_type, state, scope };
    return res.redirect('/login');
  }
  
  // User already authenticated, show consent screen
  res.render('consent', { client_id, scope });
};
