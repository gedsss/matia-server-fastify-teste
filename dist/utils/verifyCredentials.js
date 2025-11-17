import bcrypt from 'bcrypt';
import profile from '../models/profile.js';
export const verifyCredentials = async (password, email) => {
    const user = await profile.findOne({
        where: { email },
        attributes: {
            include: ['profile_password'],
        },
    });
    if (!user) {
        return null;
    }
    const hashedPassword = user.profile_password;
    const isPasswordValid = await bcrypt.compare(password, hashedPassword);
    if (isPasswordValid) {
        const userJson = user.toJSON();
        const userData = userJson;
        delete userData.profile_password;
        return userData;
    }
    else {
        return null;
    }
};
//# sourceMappingURL=verifyCredentials.js.map