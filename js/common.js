function _$(selector) {
    return document.querySelector(selector);
}

function _$$(selector) {
    return document.querySelectorAll(selector);
}

function creatDom(tagName) {
    return document.createElement(tagName);
}

/**
 * 获取兄弟元素
 * @param {Object} domObj 传入一个dom对象
 * @param {String} key 传入next获取下一个兄弟元素其他情况获取上一个兄弟元素
 * */
function getBrotherDom(domObj, key) {
    if (key === "next") {
        try {
            return domObj.nextElementSibling;
        } catch (error) {
            return error;
        }
    } else {
        try {
            return domObj.previousElementSibling;
        } catch (error) {
            return error;
        }
    }
}

export { _$, _$$, creatDom, getBrotherDom };
