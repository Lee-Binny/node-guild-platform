const UserModel = require('../models/user.models');
const GuildModel = require('../models/guild.models');
const GuildMemberModel = require('../models/guildMember.models');

exports.loginUser = async (id, password) => {
    try {
        const login  = await UserModel.loginUser(id, password);
        const guild  = await GuildMemberModel.getMyGuild(login.id);
        if (guild) {
            const guildName = await GuildModel.getGuildName(guild.guild_id);
            guild.name = guildName.name;
        }
        return { login, guild };
    } catch (e) {
        console.error("log in service error: " + error);
        throw error;
    }
}

exports.signup = async (userId, password, name) => {
    try {
        const existed = await UserModel.getUserByUserIdOrName(userId, name);
        if (existed) {
            throw 'already existed user';
        }
        await UserModel.signup(userId, password, name);
        const result = await UserModel.getUserByUserId(userId);
        return result;
    } catch (e) {
        console.error("sign up service error: " + error);
        throw error;
    }
}

exports.deleteUser = async (id, password) => {
    try {
        const user = await UserModel.getUser(id);
        if (user.password !== password) {
            throw 'not matched password';
        }
        await UserModel.deleteUser(id);
        return;
    } catch (e) {
        console.error("sign up service error: " + error);
        throw error;
    }
}