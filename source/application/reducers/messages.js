import path from 'path';
import strip from 'strip-ansi';
import md5 from 'md5';
import {handleAction} from 'redux-actions';

import {
	loadPatternData, loadPatternFile, dismissAllMessages, dismissMessage
} from '../actions';
import {handlePromiseThunkAction} from '../actions/promise-thunk-action';
import composeReducers from '../utils/compose-reducers';

const defaultValue = [];

function createMessage(error, seed = 1) {
	error.cwd = '/Users/marneb/projects/patternplate/patternplate/patterns/';
	const lines = error.message.split('\n');
	return {
		type: 'error',
		id: md5([seed, ...lines].join('-')),
		subject: lines[0],
		body: strip(lines.slice(1, lines.length).join('\n')),
		stack: strip(error.stack),
		pattern: error.pattern,
		retry: Boolean(error.pattern),
		file: error.cwd && error.file ? path.relative(error.cwd, error.file).slice(-25) : null
	};
}

export default composeReducers(
	handlePromiseThunkAction(loadPatternData, {
		success(state, {payload}) {
			return state.filter(message => !message.pattern || message.pattern === payload.id);
		},
		throws(state, {payload: error}) {
			const message = createMessage(error, 1);
			return [message, ...state.slice(0, 2)];
		}
	}, {defaultValue}),
	handlePromiseThunkAction(loadPatternFile, {
		throws(state, {payload: error}) {
			const message = createMessage(error, 1);
			return [message, ...state.slice(0, 2)];
		}
	}),
	handleAction(dismissMessage, (state, {payload: id}) => {
		return state.filter(message => message.id !== id);
	}, {defaultValue}),
	handleAction(dismissAllMessages, () => {
		return defaultValue;
	}, {defaultValue}),
	handleAction('LOAD_PATTERN_DEMO', (state, {payload}) => {
		return state.filter(message => !message.pattern || message.pattern === payload.id);
	}),
	handleAction('PATTERN_DEMO_ERROR', (state, {payload: error}) => {
		const message = createMessage(error, 1);
		return [message, ...state.slice(0, 2)];
	})
);
