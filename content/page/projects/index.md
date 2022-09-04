---
title: Projects
projects:
  - title: 金峰Let's Go
    description: 剛畢業開始工作時接到學弟需求去幫忙開發的應用，一款與台東大學數媒系學生協同製作的在地觀光導覽APP, 使用Unity開發, 已上架至 Google Play/APP store 雙平台。
    website: https://jinfineletsgo.wordpress.com/
    image: https://jinfineletsgo.files.wordpress.com/2021/04/1024c3971024.png?w=388
  - title: Split JS
    description:
      將靜態檔案(HTML,CSS,JS,JSON)進行字串分割，能將單一較大的檔案分割成多個小檔案，再zip壓縮下載的純前端網頁小工具。
      P.S.會做這個小工具的原因很妙，最初是因為工作上的wifi晶片在serve網頁時單檔案大小不能超過7KB，印象中是因為傳輸格式使用string所以超過7KB就會被drop掉，後來改成binary就有好一點點，但遇到單檔上百KB的lib一樣會timeout，最後抱著實驗的心態寫一段js程式把 500KB 大小lib的js檔拆成 30 個js檔，gzip過後單檔約5-6KB，在前端將其重新組合並放在script中，居然可以正常使用lib，為了能使用各種lib真的無所不用其極，如果這個工具有更好的用法，請務必告訴我 🥴
    website: https://blog.zerolr.net/split-js
    image: /page/images/logo/splitjs.png

menu:
  main:
    weight: 4
    params:
      icon: link

comments: true
---
