"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _morgan = _interopRequireDefault(require("morgan"));

var _express = _interopRequireDefault(require("express"));

var app = (0, _express["default"])();
app.use((0, _morgan["default"])('dev'));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));
app.get('/', function (req, res) {
  res.status(200).json({
    message: "Welcome to Express Ilaro"
  });
});
app.listen(8080, function () {
  return console.log('Server running at 8080');
});
var _default = app;
exports["default"] = _default;