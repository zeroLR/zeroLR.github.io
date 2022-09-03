---
title: 【Jekyll】解決gitalk啟用後錯誤訊息問題
description: 有點治標不治本，參考就好。
slug: 解決gitalk啟用後錯誤訊息問題
date: 2021-12-22 00:00:00
categories:
  - Blog
  - Issues
tags:
  - Gitalk
  - Jekyll
---

在 [jekyll-next-theme](https://github.com/simpleyyt/jekyll-theme-next) 中已經將 [gitalk](https://github.com/gitalk/gitalk) 功能整合好了，但是在出現 gitalk 留言功能的文章以外的頁面，會出現一個找不到 **gitalk-container** 這個 element 的錯誤訊息，回去看程式碼發現 gitalk 會在所有頁面啟用，試著將 gitalk 限制在 post 類型(文章)的頁面中啟用就成功了。

## 解決方法

1. 開啟 `<your_blog>/_includes/_third_party/comments/gitalk.html`

2. 將原本的 site.gitalk.enable 判斷 加上與 page.id 做 and 運算，只有當進入文章時才啟用 gitalk

```html
<!-- old -->
if site.gitalk.enable
<!-- new -->
if site.gitalk.enable and page.id
```

## 參考資料

1. [How can jekyll judge whether it is a page or a post?](https://stackoverflow.com/questions/13903420/how-can-jekyll-judge-whether-it-is-a-page-or-a-post)
