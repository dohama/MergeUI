function cors(req, res) {
  var origin = process.env.CORS_ORIGIN || 'https://mergeui.com';
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') { res.status(200).end(); return true; }
  return false;
}
module.exports = cors;
