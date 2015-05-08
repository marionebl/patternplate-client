'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _messages = require('./messages');

var _messages2 = _interopRequireDefault(_messages);

var _patternPatternSection = require('../pattern/pattern-section');

var _patternPatternSection2 = _interopRequireDefault(_patternPatternSection);

var Content = (function (_React$Component) {
	function Content() {
		_classCallCheck(this, Content);

		if (_React$Component != null) {
			_React$Component.apply(this, arguments);
		}
	}

	_inherits(Content, _React$Component);

	_createClass(Content, [{
		key: 'render',
		value: function render() {
			return _react2['default'].createElement(
				'main',
				{ className: 'content' },
				_react2['default'].createElement(_patternPatternSection2['default'], { id: this.props.params.splat, data: this.props.patterns, eventEmitter: this.props.eventEmitter }),
				_react2['default'].createElement(_messages2['default'], { eventEmitter: this.props.eventEmitter })
			);
		}
	}]);

	return Content;
})(_react2['default'].Component);

exports['default'] = Content;
module.exports = exports['default'];