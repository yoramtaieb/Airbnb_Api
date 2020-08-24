const jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET = 'ndinadiandoiappdad826doiajdiad75kdaj5478ksk';

module.exports = {
  generateTokenForUser: (userData) => {
    return jwt.sign(
      {
        userId: userData.id,
        userRole: userData.role,
      },
      JWT_SIGN_SECRET,
      {
        expiresIn: '1h',
      }
    );
  },
  parseAuthorization: (authorization) => {
    return authorization != null ? authorization.replace('Bearer ', '') : null;
  },
  getUserId: (authorization) => {
    let userId = -1;
    let token = module.exports.parseAuthorization(authorization);
    if (token != null) {
      try {
        var jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
        if (jwtToken != null) userId = jwtToken.userId;
      } catch (err) {}
    }
    return userId;
  },
  // getRoleId: (authorization) => {
  //   let roleId = 'host';
  //   let token = module.exports.parseAuthorization(authorization);
  //   if (token != null) {
  //     try {
  //       var jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
  //       if (jwtToken != null) roleId = jwtToken.roleId;
  //     } catch (err) {}
  //   }
  //   return roleId;
  // },
};
