---
title: 【Jekyll】Mac M1 安裝 Jekyll 踩雷記錄
description: 唸大學時開的那隻 github page 太久沒管理直接砍掉重做，當初也沒規劃好筆記的風格就隨便做了XD
slug: jekyll-mac-m1-issue
date: 2021-12-20 18:00:00
categories:
  - Blog
  - Issues
tags:
  - Mac
  - Jekyll
  - GitHub Pages
---

> 由於工作上的需求入手了 MacBook Air M1，順便提早熟悉在 ARM 架構上開發會遇到的問題。
> 重生後的第一篇就來記錄一下這個 blog 架設中所遇到的問題囉！

## 系統環境

- MacOS: Monterey

- 版本: 12.1

- 架構: aarch64

## 使用軟體/工具

- ruby 2.6.8
- jekyll 3.26.0
- bundler 1.17.2

## 架設流程

- 準備好自己的 Github 帳號。
- 建立 github page 與挑選自己喜歡的 jekyll 主題套用，參考的文章放在底部的[參考資料](#參考資料)中囉。

## 嘗試處理 jekyll 安裝問題

### jekyll 安裝失敗

首先用 gem 安裝 jekyll，結果出現以下錯誤訊息：

```bash
$ sudo gem install -n /usr/local/bin jekyll --user-install

Successfully installed jekyll-4.2.1
Parsing documentation for jekyll-4.2.1
Before reporting this, could you check that the file you're documenting
has proper syntax:

  /System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/bin/ruby -c lib/jekyll/commands/doctor.rb

RDoc is not a full Ruby parser and will fail when fed invalid ruby programs.

The internal error was:

	(NoMethodError) undefined method `[]' for nil:NilClass

ERROR:  While executing gem ... (NoMethodError)
    undefined method `[]' for nil:NilClass
```

### jekyll 安裝問題解決

更新 gem 就可以正確安裝了：

```bash
$ sudo gem update
```

再次安裝：

```bash
$ sudo gem install -n /usr/local/bin jekyll --user-install
Successfully installed jekyll-4.2.1
Parsing documentation for jekyll-4.2.1
Installing ri documentation for jekyll-4.2.1
Done installing documentation for jekyll after 0 seconds
1 gem installed
```

> _但執行 `sudo jekyll new blog` 時卻噴了一大串的錯誤，目前還不知道怎麼解決，所以改成直接 clone jekyll-theme-next 提供的範例檔來做。_

---

## 改從範例檔進行安裝

### bundle exec jekyll server 失敗

首先照官方的步驟進行安裝，在使用`bundle install` 前要先 update：

```bash
$ bundle update
```

將套件都裝好後，嘗試啟動失敗：

```bash
$ bundle exec jekyll server
/System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/lib/ruby/2.6.0/forwardable.rb:116: warning: already initialized constant Forwardable::VERSION
...
Configuration file: /Users/ceyanglab/Documents/github/jekyll-theme-next/_config.yml
  Dependency Error: Yikes! It looks like you don't have jemoji or one of its dependencies installed. In order to use Jekyll as currently configured, you'll need to install this gem. The full error message from Ruby is: 'cannot load such file -- nokogiri/nokogiri' If you run into trouble, you can find helpful resources at https://jekyllrb.com/help/!
jekyll 3.9.0 | Error:  jemoji
```

一開始以為是 jemoji 的問題，移除後連啟動都無法，只好再裝回來：

```bash
$ bundle exec jekyll server
Could not find jemoji-0.12.0 in any of the sources
Run `bundle install` to install missing gems.
```

再次搜尋資料，查到有可能重複安裝多個 jekyll 導致啟動失敗，那就刪掉多的吧：

```bash
$ sudo gem uninstall jekyll

You have requested to uninstall the gem:
	jekyll-3.9.0

github-pages-222 depends on jekyll (= 3.9.0)
jekyll-default-layout-0.1.4 depends on jekyll (~> 3.0)
jekyll-swiss-1.0.0 depends on jekyll (~> 3.2, development)
If you remove this gem, these dependencies will not be met.
Continue with Uninstall? [yN]  y
Successfully uninstalled jekyll-3.9.0

Select gem to uninstall:
 1. jekyll-4.2.1
 2. jekyll-4.2.1
 3. All versions
> 2

You have requested to uninstall the gem:
	jekyll-4.2.1
```

再次嘗試啟動依然報同樣的錯 Orz，仔細觀察錯誤訊息發現關鍵字：

```bash
The full error message from Ruby is: 'cannot load such file -- nokogiri/nokogiri'
```

### 套件問題處理

嗯好應該是 nokogiri 這個套件的問題，開 gem 的清單看一下：

```bash
$ gem list
...
nokogiri (1.12.5 arm64-darwin x86_64-darwin, 1.10.1)
...
```

同時有 arm 跟 x86 版本的套件存在，刪掉其他只留 arm 的試試：

```bash
$ sudo gem uninstall nokogiri

Select gem to uninstall:
 1. nokogiri-1.12.5-x86_64-darwin
 2. nokogiri-1.12.5-x86_64-darwin
 3. nokogiri-1.12.5-arm64-darwin
 4. All versions
> 1
Successfully uninstalled nokogiri-1.12.5-x86_64-darwin

Select gem to uninstall:
 1. nokogiri-1.12.5-x86_64-darwin
 2. nokogiri-1.12.5-arm64-darwin
 3. All versions
> 1
Successfully uninstalled nokogiri-1.12.5-x86_64-darwin
```

### 成功啟動網站

果然是 nokogiri 套件的問題，可以正常啟動了：

```bash
$ bundle exec jekyll server
...
Configuration file: /Users/ceyanglab/Documents/github/jekyll-theme-next/_config.yml
            Source: /Users/ceyanglab/Documents/github/jekyll-theme-next
       Destination: /Users/ceyanglab/Documents/github/jekyll-theme-next/_site
 Incremental build: disabled. Enable with --incremental
      Generating...
       Jekyll Feed: Generating feed for posts
                    done in 1.813 seconds.
 Auto-regeneration: enabled for '/Users/ceyanglab/Documents/github/jekyll-theme-next'
    Server address: http://127.0.0.1:4000
  Server running... press ctrl-c to stop.
```

## 總結

遇到問題時先好好看錯誤訊息，才不會答案擺在眼前還到處盲試。

## 參考資料

1. [從零開始: 用 github pages 上傳靜態網站 - sexyoung](https://medium.com/%E9%80%B2%E6%93%8A%E7%9A%84-git-git-git/%E5%BE%9E%E9%9B%B6%E9%96%8B%E5%A7%8B-%E7%94%A8github-pages-%E4%B8%8A%E5%82%B3%E9%9D%9C%E6%85%8B%E7%B6%B2%E7%AB%99-fa2ae83e6276)
2. [NexT 使用文檔](http://theme-next.simpleyyt.com/getting-started.html)
