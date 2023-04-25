import { _$, getBrotherDom } from "./common.js";

export class FieldValidator {
    /**
     * @param {String} txt 表单项ID名
     * @param {Function} validatorFunc 验证规则函数，当需要对该文本框进行验证时，会调用该函数，函数的参数为当前文本框DOM对象，函数的返回值为验证的错误消息，若没有返回，则表示无错误(返回promise对象)
     * */
    constructor(txtId, validatorFunc) {
        this.input = _$("#" + txtId);
        this.txtId = txtId;
        this.validatorFunc = validatorFunc;
        this.input.addEventListener("blur", () => {
            this.validate();
        });
    }
    /**
     * 验证表单信息通过输出true错误输出false
     * */
    async validate() {
        const result = await this.validatorFunc(this.input);
        getBrotherDom(this.input, "next").innerText = result || "";
        return !result;
    }

    /**
     * 对传入的所有验证器进行统一的验证，如果所有的验证均通过，则返回true，否则返回false
     * @param {FieldValidator[]} validators
     */
    static async validate(...validators) {
        const pros = validators.map((v) => {
            return v.validate();
        });
        const results = await Promise.all(pros);
        return results.every((r) => r);
    }
}
