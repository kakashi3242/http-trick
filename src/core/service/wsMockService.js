/**
 * Created by tsxuehu on 8/27/17.
 */
module.exports = class WsMockRespository {
    openSession(userId, socketId, urlPattern) {

    }

    closeSession(sessionId) {

    }

    sendToPageMsg(sessionId, data) {

    }

    /**
     * 用户关闭连接，当一个用户没有连接时，关闭该用户的所有调试会话
     * @param userId
     * @param connectionId
     */
    connectionClosed(userId, connectionId) {

    }

    /**
     * 为用户分配一个连接id
     * @param userId
     */
    newConnectionId(userId){

    }

    /**
     * 获取用户所有的调试会话
     * @param userId
     */
    getSessions(userId){

    }
}