const { validateRedirectUri } = require('../services/authorizationService');

exports.validateAuthRequest = (req, res, next) => {
  const { client_id, redirect_uri, response_type } = req.query;
  
  // Check required parameters
  if (!client_id || !redirect_uri || !response_type) {
    return res.status(400).json({ error: 'invalid_request' });
  }
  
  // Validate response type
  if (response_type !== 'code') {
    return res.status(400).json({ error: 'unsupported_response_type' });
  }
  
  // Validate redirect URI
  if (!validateRedirectUri(client_id, redirect_uri)) {
    return res.status(400).json({ error: 'invalid_redirect_uri' });
  }
  
  next();
};
