Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.dispatchLogin = void 0;

var _index = _interopRequireDefault(require("./index"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var dispatchLogin = function dispatchLogin() {
  return {
    type: _index["default"].LOGIN,
  };
};

exports.dispatchLogin = dispatchLogin;
