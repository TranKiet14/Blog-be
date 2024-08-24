const db = require("models/index");
const bcrypt = require("bcrypt")
const jwtUtils = require("utils/jwtUtils");
const authService = {
    login: async (email, password, res) => {
        const account = await db.User.findOne({
            where: {
                email: email,
                deleted: false
            },
            include: [{
                model: db.Role,
                as: 'role',
                include: [{
                    model: db.Permission,
                    as: 'permissions',
                }]
            }]
        })
        if (!account) {
            throw new Error("Email không tồn tại!!!")
        }
        if (!bcrypt.compareSync(password, account.password)) {
            throw new Error("Sai mật khẩu!!!")
        }
        const accessToken = jwtUtils.sign(account.id, account.role_id)
        const refreshToken = jwtUtils.signRefreshToken(account.id, account.role_id)
        await db.Token.create({
            user_id: account.id,
            refresh_token: refreshToken
        })
        res.cookie("refresh_token", refreshToken, {
            httpOnly: true,
            expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
        });
        return {
            user: {
                id: account.id,
                fullName: account.fullName,
                avatar: account.avatar,
                email: account.email,
                permissions: account.role.permissions.map(item => item.id)
            },
            access_token: accessToken,
            refresh_token: refreshToken
        }
    },
    register: async (data) => {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(data.password, salt);
        const infoAccount = {
            fullName: data.fullName,
            email: data.email,
            password: passwordHash,
            avatar: data?.avatar,
            role_id: 2,
            status: "active"
        }
        await db.User.create(infoAccount);
    },
    refresh: async (req) => {
        const refreshToken = req.cookies.refresh_token;
        if (!refreshToken) {
            throw new Error("Không có refresh token!!!")
        }
        const refreshTokenExist = await db.Token.findOne({
            where: {
                refresh_token: refreshToken
            }
        })
        if (!refreshTokenExist) {
            throw new Error("Token không hợp lệ!!!")
        }
        const data = jwtUtils.verifyToken(refreshToken)
        const user = await db.User.findOne({
            where: {
                id: data.userId,
                role_id: data.role
            }
        })
        if (!user) {
            throw new Error("Không có quyền truy cập!!!")
        }
        const newAccessToken = jwtUtils.sign(user.id, user.role_id)
        return newAccessToken;
    },
    logout: async (refresh_token) => {
        await db.Token.destroy({
            where: {
                refresh_token: refresh_token
            }
        })
    }
}

module.exports = authService