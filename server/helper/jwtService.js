import jwt from 'jsonwebtoken';

const signAccessToken = async (userId) => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            { 
              iss: "admin",
              sub: userId,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '10m',
            },
            (err, payload) => {
                if(err) {
                    return reject(err);
                }

                resolve(payload);
            }
        )
    })
}

export { signAccessToken };