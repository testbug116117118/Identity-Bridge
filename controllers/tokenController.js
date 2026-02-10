const { verifyAuthCode, createAccessToken } = require('../services/tokenService');
const clientService = require('../services/clientService');

exports.exchangeToken = async (req, res) => {
  const { grant_type, code, redirect_uri, client_id, client_secret } = req.body;
  
  // Validate the client credentials
  if (!clientService.validateClient(client_id, client_secret)) {
    return res.status(401).json({ error: 'invalid_client' });
  }
  
  // Issue token if auth code is valid
  const userData = verifyAuthCode(code, client_id, redirect_uri);
  if (userData) {
    const token = createAccessToken(userData);
    return res.json(token);
  }
  
  res.status(400).json({ error: 'invalid_grant' });
};
