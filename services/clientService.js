const clients = [
  {
    clientId: 'client123',
    clientSecret: 'secret123',
    allowedRedirectUris: ['https://app.example.com/callback', 'https://api.example.com/oauth/callback'],
    allowedScopes: ['profile', 'email', 'openid']
  },
  {
    clientId: 'analytics_app',
    clientSecret: 'analytics_secret',
    allowedRedirectUris: ['https://analytics.partner.com/auth/callback'],
    allowedScopes: ['read:stats', 'openid']
  }
];

exports.getClientById = (clientId) => clients.find(c => c.clientId === clientId);

exports.validateClient = (clientId, clientSecret) => {
  const client = clients.find(c => c.clientId === clientId && c.clientSecret === clientSecret);
  return !!client;
};
