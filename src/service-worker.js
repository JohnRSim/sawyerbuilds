import { build, files, timestamp } from '$service-worker';
import { cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching';
import { NavigationRoute, registerRoute } from 'workbox-routing';
import { CacheOnly, CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { RangeRequestsPlugin } from 'workbox-range-requests';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { cacheName, channelName, urlPrefix } from './js/constants';

//enable debug = false;
self.__WB_DISABLE_DEV_LOGS=false;

//cleanup old items in cache
cleanupOutdatedCaches();

const ASSETS = `cache${timestamp}`;

if (!self.__WB_DISABLE_DEV_LOGS) {
	console.log('[WB][Build]',build);
	console.log('[WB][Files]',files);
	//console.log('[WB][Routes]',routes);
}

const broadcastChannel = 'BroadcastChannel' in self ? new BroadcastChannel(channelName) : null;

// This event is fired when a user has taken action in the browser to remove
// an item that was previously added to the content index.
// In Android Chrome, this is triggered by a deletion from the Downloads screen.
self.addEventListener('contentdelete', (event) => {
	const cacheKey = event.id;

	if ('caches' in window) {
		event.waitUntil((async () => {
			const cache = await caches.open(cacheName);
			await cache.delete(cacheKey);
		})());
	}
});

//used for detecting if new SW available
addEventListener('message', (event) => {
	if (event.data && event.data.type === 'SKIP_WAITING') {
		skipWaiting();
	}
});

const cacheAssets = [];
build.forEach((asset) => {
	cacheAssets.push({
		url: `${asset}`,
		revision: null
	});
});

files.forEach((asset,i) => {
	if (
		(asset.indexOf('fonts') === -1) &&
		(asset.indexOf('tmp') === -1) &&
		(asset.indexOf('_redirect') === -1) &&
		(asset.indexOf('galaxy-s9-minimal-mockup.png') === -1)  &&
		(asset.indexOf('successkid.jpg') === -1) &&
		(asset.indexOf('preview.html') === -1) &&
		(asset.indexOf('mobile.html') === -1) &&
		(asset.indexOf('manifest') === -1) &&
		(asset.indexOf('audio') === -1) &&
		(asset.indexOf('apple') === -1) &&
		(asset.indexOf('logo-192.png') === -1) &&
		(asset.indexOf('logo-512.png') === -1)
	) {
		cacheAssets.push({
			url: `${asset}`,
			revision: `${i}_${ASSETS}`,
		});
	}
});
/* IMPORTANT - when generated may need to update to index.html */
/*
cacheAssets.push({
	url: `/index.html`,
	revision: `${ASSETS}`,
});
*/
/*
cacheAssets.push({
	url: `/service-worker-index.html`,
	revision: `x_${ASSETS}`,
});*/

if (!self.__WB_DISABLE_DEV_LOGS) {
	console.log('cacheAssets',cacheAssets);
}
const cacheRoutes = [];
/*
routes.push({pattern:new RegExp(/^\/(.+)\/?$/)})
routes.forEach((route) => {
	cacheRoutes.push(new RegExp(route.pattern));
});

if (!self.__WB_DISABLE_DEV_LOGS) {
	console.log('cacheRoutes',cacheRoutes);
}
*/

precacheAndRoute(cacheAssets, {
	directoryIndex: null,
});


/* IMPORTANT - when generated may need to update to index.html */
/*const handler = createHandlerBoundToURL('/service-worker-index.html');
//const handler = createHandlerBoundToURL('/index.html');
const navigationRoute = new NavigationRoute(handler, {
	allowlist: cacheRoutes,
	denylist: [
		new RegExp('/.netlify/'),
		new RegExp('/assets/'),
		new RegExp('/stories/'),
//		new RegExp('/login/'),
	],
});*/

const shareTargetHandler = async ({event}) => {
	if (broadcastChannel) {
		broadcastChannel.postMessage('Saving media locally...');
	}

	const formData = await event.request.formData();
	const mediaFiles = formData.getAll('media');
	const cache = await caches.open(cacheName);

	for (const mediaFile of mediaFiles) {
		// TODO: Instead of bailing, come up with a
		// default name for each possible MIME type.
		if (!mediaFile.name) {
			if (broadcastChannel) {
				broadcastChannel.postMessage('Sorry! No name found on incoming media.');
			}
			continue;
		}

		const cacheKey = new URL(`${urlPrefix}${Date.now()}-${mediaFile.name}`, self.location).href;
		await cache.put(
			cacheKey,
			new Response(mediaFile, {
				headers: {
					'content-length': mediaFile.size,
					'content-type': mediaFile.type,
				},
			})
		);
	}

	// Use the MIME type of the first file shared to determine where we redirect.
	/*const routeToRedirectTo = [
		audioRoute,
		imagesRoute,
		videosRoute,
	].find((route) => mediaFiles[0].type.startsWith(route.mimePrefix));*/

	//const redirectionUrl = routeToRedirectTo ? `/#${routeToRedirectTo.href}` : '/';
	const redirectionUrl = '/social/contribute/new';
	
	// After the POST succeeds, redirect to the main page.
	return Response.redirect(redirectionUrl, 303);
};
  
const cachedMediaHandler = new CacheOnly({
	cacheName,
	plugins: [
		// Support for cache requests that include a Range: header.
		new RangeRequestsPlugin(),
	],
});
  

//registerRoute(navigationRoute);
//cache media shared
registerRoute(
	new RegExp(urlPrefix),
	cachedMediaHandler
);

//ext images
/*
registerRoute(
	/\.(?:png|gif|jpg|jpeg|svg)$/,
	new CacheFirst({
		cacheName: 'Smartr-images',
		plugins: [
			new ExpirationPlugin({
				maxEntries: 60,
				maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
			}),
		],
	}),
);
*/

registerRoute(
	({request}) => request.destination === 'image',
	new CacheFirst({
	  cacheName: 'images',
	  plugins: [
		new ExpirationPlugin({
		  maxEntries: 60,
		  maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
		}),
	  ],
	})
  );
  
registerRoute(
	/\.(?:css)$/,
	new CacheFirst({
		cacheName: 'css',
		plugins: [
			new ExpirationPlugin({
				maxEntries: 60,
				maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
			}),
		],
	}),
);

// This route will go against the network if there isn't a cache match,
// but it won't populate the cache at runtime.
// If there is a cache match, then it will properly serve partial responses.
registerRoute(
	({url}) => url.pathname.endsWith('.mp4'),
	new CacheFirst({
	  cacheName: 'media',
	  plugins: [
		new CacheableResponsePlugin({statuses: [200]}),
		new RangeRequestsPlugin(),
	  ],
	}),
  );

//oce queries
registerRoute(
	({url}) => (url.origin === 'https://www.sawyerbuilds.co.uk/') ,
	new StaleWhileRevalidate({
		cacheName: 'sb',
	})
);

//CDNs
registerRoute(
	({url}) => (
		(url.origin === 'https://cdn.jsdelivr.net/') || 
		(url.origin === 'https://cdn.ampproject.org/') || 
		(url.origin === 'https://cdnjs.cloudflare.com/') ||
		(url.origin === 'https://platform.twitter.com/')
	),
	new StaleWhileRevalidate({
		cacheName: 'CDN',
	})
);

//sharetarget handler
registerRoute(
	'/_share-target',
	shareTargetHandler,
	'POST'
);
//console.log('#################',process.env.NODE_ENV,workbox)
// Force development builds
//workbox.setConfig({ debug: true });

// Force production builds
//workbox.setConfig({ debug: false });

/*
precacheAndRoute([
  {url: '/index.html', revision: '383676' },
  {url: '/styles/app.0c9a31.css', revision: null},
  {url: '/scripts/app.0d5770.js', revision: null},
]);
*/
// `shell` is an array of all the files generated by the bundler,
// `files` is an array of everything in the `static` directory
/*
const to_cache = shell.concat(files);
const cached = new Set(to_cache);

self.addEventListener('install', event => {
	event.waitUntil(
		caches
			.open(ASSETS)
			.then(cache => cache.addAll(to_cache))
			.then(() => {
				self.skipWaiting();
			})
	);
});

self.addEventListener('activate', event => {
	event.waitUntil(
		caches.keys().then(async keys => {
			// delete old caches
			for (const key of keys) {
				if (key !== ASSETS) await caches.delete(key);
			}

			self.clients.claim();
		})
	);
});

self.addEventListener('fetch', event => {
	if (event.request.method !== 'GET' || event.request.headers.has('range')) return;

	const url = new URL(event.request.url);

	// don't try to handle e.g. data: URIs
	if (!url.protocol.startsWith('http')) return;

	// ignore dev server requests
	if (url.hostname === self.location.hostname && url.port !== self.location.port) return;

	// always serve static files and bundler-generated assets from cache
	if (url.host === self.location.host && cached.has(url.pathname)) {
		event.respondWith(caches.match(event.request));
		return;
	}

	// for pages, you might want to serve a shell `service-worker-index.html` file,
	// which Sapper has generated for you. It's not right for every
	// app, but if it's right for yours then uncomment this section


	if (event.request.cache === 'only-if-cached') return;

	// for everything else, try the network first, falling back to
	// cache if the user is offline. (If the pages never change, you
	// might prefer a cache-first approach to a network-first one.)
	event.respondWith(
		caches
			.open(`offline${timestamp}`)
			.then(async cache => {
				try {
					const response = await fetch(event.request);
					cache.put(event.request, response.clone());
					return response;
				} catch(err) {
					const response = await cache.match(event.request);
					if (response) return response;

					throw err;
				}
			})
	);
});
*/
