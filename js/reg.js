import { _$, _$$ } from "./common.js";
import { reg, exists } from "./api.js";
import { FieldValidator } from "./user.js";

const loginIdValidator = new FieldValidator("txtLoginId", async function (domInput) {
    const val = domInput.value;
    if (!val) {
        return "账号不能为空";
    }

    const resp = await exists(val);
    if (resp.data) {
        return "此Id已注册";
    }
});

const nicknameValidator = new FieldValidator("txtNickname", async function (domInput) {
    const val = domInput.value;
    if (!val) {
        return "昵称不能为空";
    }
});

const loginPwdValidator = new FieldValidator("txtLoginPwd", async function (domInput) {
    const val = domInput.value;
    if (!val) {
        return "密码不能为空";
    }
});

const txtLoginPwdValidator = new FieldValidator("txtLoginPwdConfirm", async function (domInput) {
    const val = domInput.value,
        valTwo = _$("#txtLoginPwd");
    if (!val) {
        return "请填写确认密码";
    }
    if (val !== loginPwdValidator.input.value) {
        return "两次密码不一致";
    }
});

const formDom = _$(".user-form");
formDom.addEventListener("submit", async function (e) {
    e.preventDefault();
    const result = FieldValidator.validate(
        loginIdValidator,
        nicknameValidator,
        loginPwdValidator,
        txtLoginPwdValidator
    );
    if (result) {
        const regInfo = {
            loginId: loginIdValidator.input.value,
            nickname: nicknameValidator.input.value,
            loginPwd: loginPwdValidator.input.value,
        };
        const resp = await reg(regInfo);
        if (resp.code === 0) {
            alert("注册成功");
            location.href = "./login.html";
        }
    }
});

/*loginId
: 
"ly0127321@gmail.com" 
nickname
: 
"长生道上路人甲"*/
