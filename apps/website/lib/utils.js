"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.textContent = exports.allInNewTab = exports.addNewTab = void 0;
function addNewTab(item) {
    return __assign(__assign({}, item), { newTab: true });
}
exports.addNewTab = addNewTab;
function allInNewTab(items) {
    return items.map(addNewTab);
}
exports.allInNewTab = allInNewTab;
// https://stackoverflow.com/questions/63141123/get-text-content-from-react-element-stored-in-a-variable
function textContent(elem) {
    if (!elem) {
        return '';
    }
    if (typeof elem === 'string') {
        return elem;
    }
    var children = 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (elem.props && elem.props.children) || false;
    if (children instanceof Array) {
        return children.map(textContent).join('');
    }
    return textContent(children);
}
exports.textContent = textContent;
