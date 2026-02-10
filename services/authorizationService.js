const { getClientById } = require('./clientService');
const codeStore = require('../utils/codeStore');

/**
 * Generate authorization code and associate it with the user and client
 */
exports.createAuthorizationCode = (userId, clientId, redirectUri, scope) => {
  const code = codeStore.generateCode(userId, clientId, redirectUri, scope);
  return code;
};

// Validate if the provided redirect URI is allowed for this client
exports.validateRedirectUri = (clientId, redirectUri) => {
  const client = getClientById(clientId);
  if (!client) return false;
  
  // Check if the redirect URI starts with any of the allowed URIs
  return client.allowedRedirectUris.some(uri => redirectUri.startsWith(uri));
};

exports.finalizeAuthorization = (req, res) => {
  const { client_id, redirect_uri, state } = req.session.authRequest;
  const userId = req.session.user.id;
  
  // Generate the authorization code
  const code = exports.createAuthorizationCode(userId, client_id, redirect_uri);
  
  // Redirect back to client with code
  const redirectUrl = `${redirect_uri}?code=${code}${state ? '&state=' + state : ''}`;
  return res.redirect(redirectUrl);
};
