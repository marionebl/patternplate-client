export default function JSONErrorFactory (application) {
	return function * jsonErrorMiddleware (next) {
		try {
			yield next;
		} catch (error) {
			error.expose = true;
			this.response.status = error.status || 404;

			if (application.log && application.log.error) {
				application.log.error(new Error(error).stack);
			} else {
				/*eslint-disable no-console */
				console.log.error(new Error(error).stack);
			}

			switch (this.accepts('json', 'html', 'text')) {
				case 'json':
					this.type = 'json';
					this.body = {'message': error ? error.message : 'page not found', 'err': error};
					break;
				default:
					this.body = error ? error.message : 'page not found';
					break;
			}
		}
	};
}
