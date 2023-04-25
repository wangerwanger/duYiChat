import { login, exists } from "./api.js";
import { FieldValidator } from "./user.js";
import { _$, _$$ } from "./common.js";

const loginIdValidator = new FieldValidator("txtLoginId", async function (domInput) {
    const val = domInput.value;
    if (!val) {
        return "请填写账号";
    }
});

const loginPwdValidator = new FieldValidator("txtLoginPwd", async function (domInput) {
    const val = domInput.value;
    if (!val) {
        return "密码不能为空";
    }
});

const formDom = _$(".user-form");
formDom.addEventListener("submit", async function (e) {
    e.preventDefault();
    const result = await FieldValidator.validate(loginIdValidator, loginPwdValidator);
    if (result) {
        // 使用 FormData 对象获取表单数据
        const formData = new FormData(formDom);
        const regInfo = Object.fromEntries(formData.entries());
        const resp = await login(regInfo);
        if (resp.code === 0) {
            location.href = "./index.html";
            return;
        }
        alert("账号或密码错误");
    }
});

/*loginId
: 
"ly0127321@gmail.com" 
nickname
: 
"长生道上路人甲"*/
