if (!self.define) {
  let e,
    i = {};
  const s = (s, a) => (
    (s = new URL(s + ".js", a).href),
    i[s] ||
      new Promise((i) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = s), (e.onload = i), document.head.appendChild(e);
        } else (e = s), importScripts(s), i();
      }).then(() => {
        let e = i[s];
        if (!e) throw new Error(`Module ${s} didn’t register its module`);
        return e;
      })
  );
  self.define = (a, d) => {
    const l =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (i[l]) return;
    let r = {};
    const f = (e) => s(e, l),
      b = { module: { uri: l }, exports: r, require: f };
    i[l] = Promise.all(a.map((e) => b[e] || f(e))).then((e) => (d(...e), r));
  };
  self.addEventListener("fetch", function (event) {
    event.respondWith(
      fetch(event.request).catch(function () {
        return caches.match(event.request);
      })
    );
  });
}
define(["./workbox-6da860f9"], function (e) {
  "use strict";
  self.addEventListener("message", (e) => {
    e.data && "SKIP_WAITING" === e.data.type && self.skipWaiting();
  }),
    e.precacheAndRoute(
      [
        { url: "404.html", revision: "bbbcd6ab60c930d16f9f5ccb2f583642" },
        {
          url: "about/index.html",
          revision: "85b665630b358bc8480d15b880eb64f8",
        },
        {
          url: "admin/config.yml",
          revision: "e3b94eae91d61026585c751b736439a7",
        },
        {
          url: "admin/index.html",
          revision: "5d4bca271c0d78fff90ad07640f4d033",
        },
        {
          url: "archives/index.html",
          revision: "4d68830a15f1f95bdb464fe54d27675f",
        },
        {
          url: "assets/libs/live2dw/assets/hijiki.model.json",
          revision: "a071426dd1a640fda84b34ff7f84969c",
        },
        {
          url: "assets/libs/live2dw/assets/hijiki.pose.json",
          revision: "e0eec0e71f146917081b4dd53cda90ee",
        },
        {
          url: "assets/libs/live2dw/assets/moc/hijiki.moc",
          revision: "50f3411b59c322d917a0be3b8b5cd76b",
        },
        {
          url: "assets/libs/live2dw/assets/mtn/00_idle.mtn",
          revision: "f08d091c1d4aabfd9bf425fffeb86cc8",
        },
        {
          url: "assets/libs/live2dw/assets/mtn/01.mtn",
          revision: "ecfe8cd31fcdcdb84f6af7d4a5f80545",
        },
        {
          url: "assets/libs/live2dw/assets/mtn/02.mtn",
          revision: "cdcd3669fe3a46d41fa421e946606263",
        },
        {
          url: "assets/libs/live2dw/assets/mtn/03.mtn",
          revision: "9774f3029b05d7078fe4d372ba17fb85",
        },
        {
          url: "assets/libs/live2dw/assets/mtn/04.mtn",
          revision: "0f6a2a80dc8413198e59881d6637d607",
        },
        {
          url: "assets/libs/live2dw/assets/mtn/05.mtn",
          revision: "fe773c56df1f924e687c75ae00ca79f9",
        },
        {
          url: "assets/libs/live2dw/assets/mtn/06.mtn",
          revision: "e501a844485009ae1f20ca34c78980fd",
        },
        {
          url: "assets/libs/live2dw/assets/mtn/07.mtn",
          revision: "0c525b689fb884f384f3dffe7ec02a14",
        },
        {
          url: "assets/libs/live2dw/assets/mtn/08.mtn",
          revision: "a6a984fb72ddc64adff0ba57df921f3f",
        },
        {
          url: "assets/libs/live2dw/lib/L2Dwidget.0.min.js",
          revision: "32973883fcac0a9ae6cc79c0ea25fda2",
        },
        {
          url: "assets/libs/live2dw/lib/L2Dwidget.min.js",
          revision: "094cbace49a39548bed64abff5988b05",
        },
        {
          url: "categories/blog/index.html",
          revision: "b57d89027cd7351dde92eae501853a8f",
        },
        {
          url: "categories/blog/index.xml",
          revision: "17d053ad97ef5102a8a60a5366aeb796",
        },
        {
          url: "categories/blog/page/1/index.html",
          revision: "0f810a9f2023bfacaade1d7bbfe28b08",
        },
        {
          url: "categories/index.html",
          revision: "e6b3ea188d8d54d9dc8adce3455fe3d6",
        },
        {
          url: "categories/index.xml",
          revision: "c1975e439275196c78b91a4fdc720931",
        },
        {
          url: "categories/issues/index.html",
          revision: "f035b22584df98f17da91ff5dbf12794",
        },
        {
          url: "categories/issues/index.xml",
          revision: "834aa797dc95dfe454836e8759c9009f",
        },
        {
          url: "categories/issues/page/1/index.html",
          revision: "5d9598abe8dc3367f5c45310e6931d1f",
        },
        {
          url: "categories/libs/index.html",
          revision: "a4f471085cbac9c125985a9588f15a91",
        },
        {
          url: "categories/libs/index.xml",
          revision: "23a37915145898b549275d3f8727bbe8",
        },
        {
          url: "categories/libs/page/1/index.html",
          revision: "9efff3ec9ae6f1b305f6cdb2ae26f00b",
        },
        {
          url: "categories/other/index.html",
          revision: "adfcfaf0cc405213219e996b9f93f62d",
        },
        {
          url: "categories/other/index.xml",
          revision: "9d8bee01096bfec58bbf9b603cbc70ba",
        },
        {
          url: "categories/other/page/1/index.html",
          revision: "17a95e0a5d0aa8d37d4c6f84fe90f58c",
        },
        {
          url: "categories/page/1/index.html",
          revision: "e9408796651d7c2a039c445515cafc85",
        },
        { url: "favicon.ico", revision: "7e2573fb7d9db8d48de532de9d2e295b" },
        {
          url: "googlec4c6ab9c7c6d8533.html",
          revision: "813efb9de26450a9d782147ec4bfecf3",
        },
        { url: "index.html", revision: "955b8c4c7cc1d5f4414cb831073f0146" },
        { url: "index.xml", revision: "ecce87eaee29132d90da537e90793219" },
        {
          url: "links/index.html",
          revision: "e999f6d5a156e42d22ed2fb0ab1f7b5c",
        },
        { url: "manifest.json", revision: "0369aaf8e13661bf65a9a1b169073392" },
        {
          url: "p/2021/12/20/jekyll-mac-m1-issue/index.html",
          revision: "4d26faf7ef9741bea8536c966b4aea67",
        },
        {
          url: "p/2021/12/22/jekyll-gitalk-issue/index.html",
          revision: "4712b98f01782b6c07436213c3b5f88e",
        },
        {
          url: "p/2022/03/05/netlify-cms-import-github-pages/index.html",
          revision: "db067a0bbfb0137e592a57d420684428",
        },
        {
          url: "p/2022/09/03/hugo-new-theme/index.html",
          revision: "007512dc4015fef61649e25c52026a2e",
        },
        {
          url: "p/2022/09/05/netlify-cms-import-hugo/index.html",
          revision: "5c3bbb427ff564804d4daeae23506c0a",
        },
        {
          url: "page/1/index.html",
          revision: "6d93f3f1d4d22a96b8e0c2f2aa5257ca",
        },
        {
          url: "page/images/logo/brand-linkedin.svg",
          revision: "3444643f7f5b9b8b7fd6a94eedd3513e",
        },
        {
          url: "page/index.html",
          revision: "28b031defd61bf997083f30794f889ab",
        },
        { url: "page/index.xml", revision: "327c5217f7edab15eda4ab3eeb19cdf3" },
        {
          url: "page/page/1/index.html",
          revision: "2fbe6d1eb13cc6a6980f9ecc8397760f",
        },
        {
          url: "post/index.html",
          revision: "bc3c8880b3105de368186123ecb9175b",
        },
        { url: "post/index.xml", revision: "f4fd28d456da2eb78539efef8018d515" },
        {
          url: "post/page/1/index.html",
          revision: "1cd2511b06ea0fd44e14a83d24394911",
        },
        {
          url: "projects/index.html",
          revision: "fef2e382c6802db88ec2e53a1ed6d991",
        },
        { url: "robots.txt", revision: "50d8a018e8ae96732c8a2ba663c61d4e" },
        {
          url: "scss/style.min.f1629321971fdeabdc7a8b293ae9ac40aefb661b0582bfb00482d9297479deaa.css",
          revision: "43991bb4e1cedb60504334b9da6dd360",
        },
        {
          url: "search/index.html",
          revision: "d7615a7d35bf96ebfdeb1722b5381279",
        },
        {
          url: "search/index.json",
          revision: "f770f473d844685e8fb7f6ee0fbea6dd",
        },
        { url: "sitemap.xml", revision: "f313481e76afe5590d848585ce4f4c64" },
        {
          url: "tags/gitalk/index.html",
          revision: "1b1a276e3888a973a369912be53dbfb5",
        },
        {
          url: "tags/gitalk/index.xml",
          revision: "d80a0a2084dd9e55d37f630c5aa560d6",
        },
        {
          url: "tags/gitalk/page/1/index.html",
          revision: "50d2c86654bf208c4eaa89138e4acb39",
        },
        {
          url: "tags/github-pages/index.html",
          revision: "d358f3addc3212f1d7e73f21bd82c911",
        },
        {
          url: "tags/github-pages/index.xml",
          revision: "b7fa39173a8bfd35bf5562d79232f2ec",
        },
        {
          url: "tags/github-pages/page/1/index.html",
          revision: "70847d719a8292cfa03f628b85fdd6d6",
        },
        {
          url: "tags/hugo/index.html",
          revision: "8e542574bb7473da3aa6d464799c14a0",
        },
        {
          url: "tags/hugo/index.xml",
          revision: "da96853a379969bdb76319650975f151",
        },
        {
          url: "tags/hugo/page/1/index.html",
          revision: "2883b273d61f6c55abd0c2cf387bd230",
        },
        {
          url: "tags/index.html",
          revision: "770b2c4eff6417907b37f3e8e84940e4",
        },
        { url: "tags/index.xml", revision: "a75bfe8cb9815b80d9e258ae80e62720" },
        {
          url: "tags/jekyll/index.html",
          revision: "d21c713888f398afa0428eb3c419930f",
        },
        {
          url: "tags/jekyll/index.xml",
          revision: "20dd621aa8c62a15b8c4dc9f2e41dba4",
        },
        {
          url: "tags/jekyll/page/1/index.html",
          revision: "38ad3da43876ddcbc9f17822b85b0885",
        },
        {
          url: "tags/mac/index.html",
          revision: "e875b00165a817d8f73013fc491a2721",
        },
        {
          url: "tags/mac/index.xml",
          revision: "1cd1c9e6b02066d01abb84056b1a2de9",
        },
        {
          url: "tags/mac/page/1/index.html",
          revision: "eebb431dba476b2bacfb514a229226b0",
        },
        {
          url: "tags/netlify-cms/index.html",
          revision: "8d650666ccdd975e3cb11ac080792c2b",
        },
        {
          url: "tags/netlify-cms/index.xml",
          revision: "7f955d49b39490225bfc1966b146cf6b",
        },
        {
          url: "tags/netlify-cms/page/1/index.html",
          revision: "62c56a942fc871922c8561a6f52686b1",
        },
        {
          url: "tags/page/1/index.html",
          revision: "47bee6b3dde75918a584d04b389534d9",
        },
        {
          url: "tags/page/2/index.html",
          revision: "7f6e153e1224775c6bb5dabf803122c9",
        },
        { url: "ts/main.js", revision: "37336a55ddcc41bd1ebfe18f236916ce" },
        { url: "ts/search.js", revision: "094fac01e74a3012119651d38f950386" },
      ],
      { ignoreURLParametersMatching: [/^utm_/, /^fbclid$/, /^search/] }
    );
});
//# sourceMappingURL=sw.js.map
