const BASE_URL = "https://study.duyiedu.com";
const TOKEN_KEY = "token";
const PATH = {
    reg: "/api/user/reg",
    login: "/api/user/login",
    exists: "/api/user/exists",
    profile: "/api/user/profile",
    chat: "/api/chat",
    history: "/api/chat/history",
};

/**
 * get请求
 * @param {string} path 路径
 */
function get(path) {
    const _url = BASE_URL + path,
        _headers = {
            "Content-Type": "application/json",
            authorization: "Bearer" + " " + localStorage.getItem(TOKEN_KEY) || "",
        };
    return fetch(_url, { method: "GET", headers: _headers });
}

/**
 * post请求
 * @param {string} path 路径
 * @param {Object} bodyObj 请求体
 */
function post(path, bodyObj) {
    const _url = BASE_URL + path,
        _headers = {
            "Content-Type": "application/json",
            authorization: "Bearer" + " " + localStorage.getItem(TOKEN_KEY) || "",
        };
    return fetch(_url, { method: "POST", headers: _headers, body: JSON.stringify(bodyObj) });
}

/**
 * 注册请求
 * @param {Object} regInfo 一个包含账号,昵称和密码的对象
 * @param {String} regInfo.loginId
 * @param {String} regInfo.nickname
 * @param {String} regInfo.loginPwd
 * */
async function reg(regInfo) {
    const resp = await post(PATH.reg, regInfo);
    return await resp.json();
}

/**
 * 登录请求
 * @param {Object} loginInfo 一个包含账号和密码的对象对象
 * @param {String} loginInfo.loginId
 *  @param {String} loginInfo.loginPwd
 * */
async function login(loginInfo) {
    const resp = await post(PATH.login, loginInfo);
    const token = resp.headers.get("authorization");
    token || localStorage.getItem(`${TOKEN_KEY}`, token);
    const result = await resp.json();
    if (result.code === 0) {
        // 登录成功
        // 将响应头中的token保存起来（localStorage）
        const token = resp.headers.get("authorization");
        localStorage.setItem(TOKEN_KEY, token);
    }
    return result;
}

/**
 * 验证请求
 * @param {String} loginId 账号
 * */
async function exists(loginId) {
    const resp = await get(PATH.profile + `?loginId=${loginId}`);
    return await resp.json();
}

/**
 * 个人信息请求
 * */
async function profile() {
    const resp = await get(PATH.profile);
    return await resp.json();
}

/**
 * 验证请求
 * @param {String} content 客户端发送的消息
 * */
async function sendChat(content) {
    const resp = await post(PATH.chat, { content });
    return await resp.json();
}

/**
 * 获取历史消息
 * */
async function getHistory() {
    const resp = await get(PATH.history);
    return await resp.json();
}

/**
 * 退出登录
 * */
function longinOut() {
    localStorage.removeItem(TOKEN_KEY);
    location.href = "./login.html";
}

/*导出api*/
export { reg, login, exists, profile, sendChat, getHistory, longinOut };
