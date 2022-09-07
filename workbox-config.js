module.exports = {
	globDirectory: 'public/',
	globPatterns: [
		'**/*.{html,yml,jpg,png,json,moc,mtn,js,xml,ico,svg,jpeg,txt,css}'
	],
	swDest: 'static/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};