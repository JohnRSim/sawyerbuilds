const netlify = require('@sveltejs/adapter-netlify');

/** @type {import('@sveltejs/kit').Config} */
module.exports = {
	kit: {
		adapter: netlify(),
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte'
	}
};
