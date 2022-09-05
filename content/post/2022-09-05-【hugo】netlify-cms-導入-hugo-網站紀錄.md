---
title: 【Hugo】Netlify CMS 導入 Hugo 網站紀錄
slug: netlify-cms-import-hugo
description: 寫這篇文章的途中又發現很多配置方式，蠻有趣的。
image: /post/images/cover/hugo-wide.jpeg
categories:
  - Blog
  - Libs
tags:
  - Hugo
  - GitHub Pages
  - Netlify CMS
date: 2022-09-05T14:30:19.036Z
---
> Blog 搬家完後，需要重新配置 Netlify CMS 所需的檔案才能啟用，之前的 Blog 是用 Jekyll 生成的，與現在 Hugo 參數配置的部分相似，不過 Hugo 的檔案結構與 Jekyll 還是有些許不同，這篇會記錄我調整了哪些參數，建立新分支導入 CMS 功能部署測試，最後透過 CMS 建立文章後的 markdown 會長什麼樣子。

## Netlify 網站建立

使用此功能前需至 Netlify 建立一個網站，參考我之前的文章 [Netlify CMS 導入 GitHub Pages 記錄](https://blog.zerolr.net/p/2022/03/netlify-cms-import-github-pages) 。

## Config 配置比較

> 更詳細的配置可以參考 [Configuration Options](https://backlog.com/git-tutorial/tw/stepup/stepup2_2.html)

之前在 Jekyll 上使用的 config 如下：

```yaml
backend:
  name: github
  repo: zerolr/zerolr.github.io
  branch: main
  site_domain: musing-swanson-deda90.netlify.com

publish_mode: editorial_workflow
media_folder: "images/uploads"

collections:
  - name: "blog" # Used in routes, e.g., /admin/collections/blog
    label: "Blog" # Used in the UI
    folder: "_posts/" # The path to the folder where the documents are stored
    create: true # Allow users to create new documents in this collection
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}" # Filename template, e.g., YYYY-MM-DD-title.md
    fields: # The fields for each document, usually in front matter
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Publish Date", name: "date", widget: "datetime" }
      - { label: "Categories", name: "categories", widget: "list" }
      - { label: "Tags", name: "tags", widget: "list" }
      - { label: "Body", name: "body", widget: "markdown" }
```

現在 Hugo 上使用的 config 如下：

```yaml
backend:
  name: github
  repo: zerolr/zerolr.github.io
  branch: master # Branch to update (optional; defaults to master)
  site_domain: musing-swanson-deda90.netlify.com
media_folder: static/assets/images
public_folder: assets/images
publish_mode: editorial_workflow
collections:
  - name: "blog"
    label: "Blog"
    folder: "content/post"
    create: true
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}"
    editor:
      preview: false
    fields:
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Slug", name: "slug", widget: "string" }
      - { label: "Description", name: "description", widget: "string" }
      - { label: "Cover", name: "image", widget: "string" }
      - {
          label: "Categories",
          name: "categories",
          widget: "list",
          summary: "{{fields.category}}",
          field: { label: "Category", name: "category", widget: "string" },
        }
      - {
          label: "Tags",
          name: "tags",
          widget: "list",
          summary: "{{fields.tag}}",
          field: { label: "Tag", name: "tag", widget: "string" },
        }
      - { label: "Publish Date", name: "date", widget: "datetime" }
      - { label: "Body", name: "body", widget: "markdown" }
```

### 主要的配置簡介

* repo: blog 的 repo 名稱
* branch: 透過 CMS 修改的部分會更新至這個分支中
* site_domain: 填入在 Netlify 上建立網站的 domain
* media_folder: 在 CMS 中上傳的圖片存放資料夾路徑
* public_folder: 部署後文章存取資源的資料夾路徑
* publish_mode: 文章的發布模式，有分一般及暫存模式
* collections: 可以定義多種文章配置，例：tech-artcle, life-article

  * name:  文章的類型名稱
  * label: 文章配置名稱，僅影響顯示文字
  * folder: 文章資料夾路徑
  * create: 新增文章功能
  * slug: 自動產生的文章檔案名稱，例：2022-09-04-new-post
  * editor(preview):  預覽文章功能
  * fields: 依據底下的配置在檔案中產生對應的欄位

若是使用 VSCode 編輯，可以將滑鼠移至參數上，會顯示詳細說明

![截圖 2022-09-04 下午10.57.25.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ae7056ea-67f5-4a0f-8d51-d68029728bf4/%E6%88%AA%E5%9C%96_2022-09-04_%E4%B8%8B%E5%8D%8810.57.25.png)

### 我主要改了什麼？

* media_folder: Hugo 在 build 後會將 static 中的檔案放在 root 下， 而 CMS 上傳的圖片會存在這個路徑，如此 build 後的資源才可被網頁存取
* public_folder: 承上，文章從此路徑存取圖片
* fields: 原本照之前的配置時，會有 Tags 與 Categories 只能輸入一個字串的問題，且字串中不能有空格，後來在[這篇issue](https://github.com/netlify/netlify-cms/issues/4646#issuecomment-1145575376)中找到方法處理，利用 summary 來組合不同參數，結果如下圖

![截圖 2022-09-05 上午12.38.05.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/347d5d79-1ba5-4d78-946d-129ccfd8ef00/%E6%88%AA%E5%9C%96_2022-09-05_%E4%B8%8A%E5%8D%8812.38.05.png)

## 建立新分支加入 Netlify CMS 部署測試

在加入 Netlify CMS 的檔案前，先分別建立給 master 及 cms 分支使用的 workflows。

### 觀察模板提供的 deploy.yml

這段表示當 repo 被 push 或 pull_request 到 master 分支時，會執行這個 yml 檔的部署工作。 

```yaml
on:
    push:
        branches: [master]
    pull_request:
        branches: [master]
```

中間還有安裝套件、暫存資源、建置靜態檔案等等流程，直接拉到最下面 Deploy 的地方，這邊表示部署 gh-pages 中的檔案。

```yaml
- name: Deploy 🚀
        uses: JamesIves/github-pages-deploy-action@4.1.4
        with:
          branch: gh-pages
          folder: public
          clean: true
          single-commit: true
```

### 建立給新分支部署用的 deploy.yml

將原本的deploy.yml 改為 deploy_master.yml,，並建立一個 deploy_cms.yml，修改觸發部署的分支為 cms，以及部署分支改為 gh-pages-feature-test。

```yaml
# deploy_cms.yml
name: Deploy to Github Pages - Feture test

on:
  push:
    branches: [cms]
  pull_request:
    branches: [cms]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2

      - name: Cache Hugo resources
        uses: actions/cache@v2
        env:
          cache-name: cache-hugo-resources
        with:
          path: resources
          key: ${{ env.cache-name }}

      - uses: actions/setup-go@v2
        with:
          go-version: "^1.17.0"
      - run: go version

      - name: Cache Go Modules
        uses: actions/cache@v2
        with:
          path: |
            ~/.cache/go-build
            ~/go/pkg/mod
          key: ${{ runner.os }}-go-${{ hashFiles('**/go.sum') }}
          restore-keys: |
            ${{ runner.os }}-go-

      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v2
        with:
          hugo-version: "latest"
          extended: true

      - name: Build
        run: hugo --minify --gc

      - name: Deploy 🚀
        uses: JamesIves/github-pages-deploy-action@4.1.4
        with:
          branch: gh-pages-feature-test
          folder: public
          clean: true
          single-commit: true
```

修改完後在 master 分支加入紀錄。

```bash
git add .
git commit -m "feat: update workflow for master branch, add new workflow for cms branch"
```

此時這個版本的紀錄會留在**已建立好 master 與 cms 分支用的 workflows** 上，下一步再將 Netlify CMS 所需的檔案加入。

### 建立 cms 分支並將 Netlify CMS 檔案加入

首先建立並切換至 cms 分支。

```bash
git checkout -b cms
```

將 Netlify CMS 所需的檔案放在 static 目錄底下，後面 build 後才能讓 admin 輸出在根目錄中。

```html
root
- static
  - admin
    - config.yml
    - index.html
```

建立 commit 記錄本次修改。

```bash
git add .
git commit -m "feat: add netlify cms"
```

此時 cms 分支會領先 master 分支一個 commit，可以參考下面的補充，接下來要準備部署上去。

### 補充： git branch 分支建立

這邊用範例來解釋分支，新開資料夾加入一個 blog.txt 檔案，並建立 git 環境加入 commit。

```bash
mkdir git-branch-test
cd git-branch-test
git init
echo "This is blog file" >> blog.txt
git add .
git commit -m "initial commit"
```

使用 git log 查看狀態，目前有一個 commit ，HEAD 表示目前所在的 commit，箭頭指向的位置表示 commit 所在的分支。

```bash
git log --oneline
d5bf87b (HEAD -> master) initial commit
```

建立分支並切換過去，使用以下指令達成，加上 -b 可以新增分支同時切換過去。

```bash
git checkout -b cms
```

檢查所在分支用 git branch 指令，*符號位置表示所在分支。

```bash
git branch
master
*cms
```

加入 config.yml 檔案並建立 commit 後，使用 git log 查看狀態，由於是基於此時的 master 分支上建立分支，在 cms 分支中會有 master 分支的 commit，且比 master 分支領先一個 commit ，意思就是比 master 分支領先一筆修改紀錄。

```bash
echo "This is config file" >> config.yml
git add .
git commit -m "feat: add config.yml"
git log --oneline
09103bc (HEAD -> cms) feat: add config.yml
d5bf87b (master) initial commit
```

我們可以切回去 master 分支查看 git log，剛才前面那個 commit 及 config.yml 不見了！ 因為剛才是在 cms 分支中建立 commit ，新增 config.yml 這筆紀錄只有在 cms 的分支中才能看到，所以可以依據想加入的功能開對應的分支。

```bash
git checkout master
Switched to branch 'master'

git log --oneline
d5bf87b (HEAD -> master) initial commit
```

> 可以把 branch 想像成是資料夾，開分支就是從 master 資料夾複製一份並重新命名成 cms，commit 就是對資料夾內的內容做編輯，以範例來說最後 master 有一份檔案，而 cms 則有兩份檔案囉！

### 部署測試版網站

將程式 push 至 遠端 repo 的 cms 分支上，push 遠端不存在的分支時 GitHub 會幫我們建立，且因 cms 分支被 push 還會觸發 deploy_cms.yml 的 workflow。

```bash
git push origin cms
```

push 完後到網頁查看 GitHub repo，左邊清單可以看到目前有的分支，可以比較 master 與 cms 中的檔案是否如預期不同。

![截圖 2022-09-05 上午1.02.03.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/90de821d-e849-49fb-8ff3-a3665116bb70/%E6%88%AA%E5%9C%96_2022-09-05_%E4%B8%8A%E5%8D%881.02.03.png)

至 repo 中的 Actions 查看結果，可以看到執行工作流程的檔案及名稱，以及底下完成過的工作。

![截圖 2022-09-05 下午7.59.46.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/fe5cfdf9-772f-4299-9945-19a45dcf32ca/%E6%88%AA%E5%9C%96_2022-09-05_%E4%B8%8B%E5%8D%887.59.46.png)

待 workflow 工作完成後，至 repo → Settings → Pages 底下，在 Branch 的欄位中選擇你要部署網站的分支，這邊選擇由 deploy_cms.yml 所產生的 gh-pages-feature-test 分支，按下 Save 後就會開始部署。

![截圖 2022-09-05 上午1.00.19.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f5e28961-71c4-44e6-a4cb-a4833ce4e0db/%E6%88%AA%E5%9C%96_2022-09-05_%E4%B8%8A%E5%8D%881.00.19.png)

部署中的過程一樣可以在 Actions 中查看，可以點進去看更詳細的過程，失敗的錯誤訊息在這邊都可以查得到。

![截圖 2022-09-05 下午8.22.29.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6472a944-574a-4093-85e3-dac37bafd945/%E6%88%AA%E5%9C%96_2022-09-05_%E4%B8%8B%E5%8D%888.22.29.png)

成功部署後開啟網站進入 CMS 管理畫面，登入已授權的 GitHub 帳號後就可以開始建立文章囉！

![截圖 2022-09-05 下午8.26.17.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/fd613ecd-c806-4092-a7d5-b41d0bf5117b/%E6%88%AA%E5%9C%96_2022-09-05_%E4%B8%8B%E5%8D%888.26.17.png)

## 使用 CMS 建立文章

這邊建立文章填入內容，注意 SLUG 欄位會變成文章的網站路徑，建議以英文加分隔符號的格式命名，讓人看網址就知道主題是什麼，COVER 欄位為文章預覽圖，填絕對路徑會從部署的檔案中查找，也可使用圖片 URL。

![截圖 2022-09-05 下午8.35.44.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e3b1f967-b399-4fe2-a45a-df048c1d7418/%E6%88%AA%E5%9C%96_2022-09-05_%E4%B8%8B%E5%8D%888.35.44.png)

## 安全問題

就跟使用其他需登入的網站服務一樣，有以下幾個點需注意：

* 除非是自己的電腦，在其他電腦上請開無痕視窗使用。
* 使用時會需要登入 GitHub，在 CMS 這邊登入完後會發現 GitHub 那邊也登入了，所以請記得離開或不用時登出。
* 使用未註冊 provider 的 GitHub 帳號登入時會被擋下來，若要增加共同編輯的帳號，需在其帳號下建立 OAuth APP，並且將 Client ID 及 Secret 提供給管理員去新增 provider。

## 總結

重新再跑過一遍安裝流程後對配置又更熟悉了一點，也發現 CMS 連側邊欄位那些頁面也能編輯，之後會再更新上去。同時也是第一次嘗試另外開分支加入新功能測試部署，在嘗試的過程中一直在想這種做法是否合適，若對本篇做法有任何看法非常歡迎留言指教！

## 參考資料

1. [N﻿etlify CMS - Hugo](https://www.netlifycms.org/docs/hugo/)[](https://backlog.com/git-tutorial/tw/stepup/stepup2_2.html)
2. [List widget form input prevents whitespace and commas](https://github.com/netlify/netlify-cms/issues/4646#issuecomment-1145575376)
3. [Configuration Options](https://www.netlifycms.org/docs/configuration-options/#summary)
4. [建立分支【教學1 使用分支】  | 連猴子都能懂的Git入門指南  | 貝格樂（Backlog）](https://backlog.com/git-tutorial/tw/stepup/stepup2_2.html)