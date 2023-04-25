import { longinOut, getHistory, sendChat, profile } from "./api.js";
import { _$, _$$, creatDom } from "./common.js";

/**
 * 通过时间戳生成时间函数
 * @param {number} [,timeStamp]时间戳不传则用当前时间
 */
function getTime(timeStamp) {
    const date = (timeStamp && new Date(timeStamp)) || new Date();
    const times = {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        hours: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds(),
    };
    const _run = (timeNum) => timeNum.toString().padStart(2, "0");

    return `${times.year}-${_run(times.month)}-${_run(times.day)} ${_run(times.hours)}:${_run(times.minutes)}:${_run(
        times.seconds
    )}`;
}

(async () => {
    //获取用户信息判断登录情况
    const resp = await profile();
    // 储存用户id
    let userId = void 0;
    if (resp.code === 0) {
        userId = resp.data.loginId;
        _$("#nickname").innerText = resp.data.nickname;
        _$("#loginId").textContent = resp.data.loginId;
    } else {
        alert("当前未登录");
        location.href = "./login.html";
    }

    // 绑定退出登录
    _$(".icon-close").addEventListener("click", (e) => {
        longinOut();
    });

    /**
     * 根据消息对象chatInfo创建DOM
     * {
        "content": "内容",
        "createdAt": "数据生成时间戳",
        "from": "发送方 "robot"=> 机器人 "selef"=>自己",
        }
     * 
    */
    function addChat(chatInfo) {
        const chatItemDom = creatDom("div"),
            headImg = creatDom("img"),
            contentDom = creatDom("div"),
            chatDate = creatDom("div");
        chatItemDom.classList.add("chat-item");
        headImg.classList.add("chat-avatar");
        contentDom.classList.add("chat-content");
        chatDate.classList.add("chat-date");
        contentDom.innerText = chatInfo.content;
        chatDate.innerText = getTime(chatDate.createdAt);
        if (chatInfo.from !== userId) {
            headImg.src = "./asset/robot-avatar.jpg";
        } else {
            chatItemDom.classList.add("me");
            headImg.src = "./asset/avatar.png";
        }

        // 将创建好的节点添加进页面
        chatItemDom.appendChild(headImg);
        chatItemDom.appendChild(contentDom);
        chatItemDom.appendChild(chatDate);
        _$(".chat-container").appendChild(chatItemDom);
    }

    // 消息框滚动到底部
    function toScorll() {
        const container = _$(".chat-container");
        container.scrollTop = container.scrollHeight - container.clientHeight;
    }

    // 添加历史信息
    const historyIfon = await getHistory();
    const historyData = historyIfon.data;
    historyData.length > 0 &&
        historyData.forEach((obj) => {
            addChat(obj);
            toScorll();
        });

    // 发送消息
    async function sendInfo(content) {
        // 重置文本
        _$("#txtMsg").value = null;
        addChat({
            content: content,
            createdAt: "",
            from: userId,
        });
        toScorll();
        const resp = await sendChat(content);
        resp.code === 0 && addChat(resp.data);
        toScorll();
    }

    // 点击发送时执行
    _$(".msg-container").addEventListener("submit", async function (e) {
        e.preventDefault();
        const content = _$("#txtMsg").value;
        content && (await sendInfo(content));
    });
})();
