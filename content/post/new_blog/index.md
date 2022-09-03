---
title: 【Hugo】又…又改主題!!!
description: Hugo 好香
slug: hugo-new-theme
date: 2022-09-03
image: /post/images/cover/hugo-wide.jpeg
categories:
  - Blog
tags:
  - Hugo
  - GitHub Pages
---

> 用了一陣子簡約風的 jekyll 後，覺得還是太空了，要找相關主題的文章還要找好久，沒有預覽圖可以快速檢視想看的文章，加上之前就很想用 [Hugo](https://gohugo.io/) 來部署個人 blog 了，這次買了個 Domain 後就想來重新裝潢一下 blog。
> [Hugo Themes](https://themes.gohugo.io/) 中真的一堆大神做超好看的模板 RRR，這篇紀錄如何使用 Hugo Themes 中的 [Stack](https://themes.gohugo.io/themes/hugo-theme-stack/) 模板，觀察其中檔案以及部分設定修改，至於 CMS 的部分可以參考之前寫的 [Netlify CMS 導入 GitHub Pages 記錄](/p/2022/03/netlify-cms-import-github-pages)，不過在 Hugo 中導入的流程有些不同，就留到下一篇紀錄囉！

## 安裝 Hugo

安裝 Hugo 的部分就不說了，都在[官方文件](https://gohugo.io/getting-started/)中！

## 從作者提供的 Template 建立 repo

使用 **[hugo-theme-stack-starter](https://github.com/CaiJimmy/hugo-theme-stack-starter)** 建立 repo 後如下，作者: **[Jimmy Cai](https://jimmycai.com/)**。

![1](/post/images/new_blog/1.png)

## 觀察檔案與調整

### .github/workflows/deploy.yml

將 repo clone 到電腦中，可以看到在 .github/workflows 中，作者已經寫好部署網站的`deploy.yml`檔了，在電腦中測試完用 git push 後就會幫你部署至 gh-pages 的分支囉！

![2](/post/images/new_blog/2.png)

> 當 push 新的 commit 上去時，GitHub Actions 會根據 workflows 中的 yml 進行一連串的動作將網站部署完成，想了解如何做到的可以參考 [GitHub Actions](https://docs.github.com/en/actions) 。

### .github/workflows/update-theme.yml

在 **.github/workflows** 中還可以看到另一個檔案 `update-theme.yml` ，看了內容後個人覺得是用來自動更新模板檔的流程，我自己不需要就刪掉了。

### .github/.devcontainer

在 **.devcontainer** 中還有提供 **Dockerfile** 能夠將網站包裝成 **Docker Image**，對於想部署在不同平台上的人來說很方便，可以先留著日用有機會試試。

![3](/post/images/new_blog/3.png)

### config/\_default

網站的標題、外觀主題、語言、頭像、連結…基本上都由這邊的檔案進行設定，參考 **[Configure Hugo](https://gohugo.io/getting-started/configuration/#all-configuration-settings)** 或是網路上有很多文章解說如何設定喔！

![4](/post/images/new_blog/4.png)

### content/post

模板預設已經有一篇 hello-world 的文章，可以參考內文格式撰寫文章，這邊我就把之前寫的搬過來，也能加上標題圖片。

## Local 端執行/建置網站

在專案根目錄中執行以下指令開啟網站檢視。

```bash
hugo server
```

![5](/post/images/new_blog/5.png)

在專案根目錄中執行以下指令建置網站，靜態檔案輸出在 **public** 資料夾中，指令部分參考 [hugo commands](https://gohugo.io/commands/hugo/) 。

```bash
hugo --minify --gc
```

## 部署至 GitHub pages

可以直接把剛才 build 出來的靜態檔直接推上去，不過這邊就利用 GitHub Actions 來完成建置及部署的動作。

![6](/post/images/new_blog/6.png)

## 總結

直接搬別人提供的東西來用是很方便，但對於 Hugo 本身是如何藉由模板的方式來產生網頁不熟悉的話，往後要修改就不容易了，如果想更客製化自己的 blog ，最好還是把官方文件看熟才是王道！

## 參考資源

1. [Hugo Themes](https://themes.gohugo.io/)
2. [Theme - Stack](https://themes.gohugo.io/themes/hugo-theme-stack/)
