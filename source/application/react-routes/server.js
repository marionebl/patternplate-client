import React from 'react';
import {renderToString} from 'react-dom/server';
import {createMemoryHistory, match, RouterContext} from '@marionebl/react-router';
import {Provider} from 'react-redux';
import {syncHistoryWithStore} from 'react-router-redux';

import routes from './routes';
import configureStore from './store';

export default function (location, data) {
	const memoryHistory = createMemoryHistory(location);
	const store = configureStore(memoryHistory, data);
	const history = syncHistoryWithStore(memoryHistory, store);

	return new Promise((resolve, reject) => {
		match({
			history,
			routes: routes(store),
			location
		}, (error, redirect, props) => {
			if (error) {
				return reject(error);
			}
			const context = <Provider store={store}><RouterContext {...props}/></Provider>;
			const result = renderToString(context);
			resolve(result);
		});
	});
}
