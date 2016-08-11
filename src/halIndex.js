var request = require('request');

export default class halIndex {
	constructor() {
		this.links = {};
		var url = global.sandbox_entrypoint_url;
		if (process.env['NODE_ENV'] === 'production') {
			url = global.entrypoint_url;
		}
	}
}