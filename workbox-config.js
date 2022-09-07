module.exports = {
  globDirectory: "public/",
  globPatterns: ["**/*.{html,yml,json,moc,mtn,js,xml,ico,svg,txt,css}"],
  swDest: "static/sw.js",
  ignoreURLParametersMatching: [/^utm_/, /^fbclid$/, /^about/],
};
