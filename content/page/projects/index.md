---
title: Projects
projects:
  - title: 【APP】金峰Let's Go
    description: 剛畢業開始工作時接到學弟需求去幫忙開發的應用，一款與台東大學數媒系學生協同製作的在地觀光導覽APP, 使用Unity開發, 已上架至 Google Play/APP store 雙平台。
    website: https://jinfineletsgo.wordpress.com/
    image: https://jinfineletsgo.files.wordpress.com/2021/04/1024c3971024.png?w=388
  - title: 【Web】Split JS
    description:
      將靜態檔案(HTML,CSS,JS,JSON)進行字串分割，能將單一較大的檔案分割成多個小檔案，再zip壓縮下載的純前端網頁小工具。
      P.S.會做這個小工具的原因很妙，最初是因為工作上的wifi晶片在serve網頁時單檔案大小不能超過7KB，印象中是因為傳輸格式使用string所以超過7KB就會被drop掉，後來改成binary就有好一點點，但遇到單檔上百KB的lib一樣會timeout，最後抱著實驗的心態寫一段js程式把 500KB 大小lib的js檔拆成 30 個js檔，gzip過後單檔約5-6KB，在前端將其重新組合並放在script中，居然可以正常使用lib，為了能使用各種lib真的無所不用其極，如果這個工具有更好的用法，請務必告訴我 🥴
    website: https://blog.zerolr.net/split-js
    image: /page/images/projects/splitjs.png
  - title: 【VR Game】Shooting Star
    description: 這個作品是和另一位同學一起去參加數媒系開的VR課程時所製作的，飛船模型是由數媒系的同學製作(很厲害!)，我主要負責程式控制UI、砲台、隕石、飛船的行為，不過原始檔好像沉沒在教育版的google雲端硬碟中就是了，只能看影片囉！
    website: https://youtu.be/0ATbqO9QOo4
    image: /page/images/projects/shootingstar.png
  - title: 【3D Game】Epic Spirit Battle
    description:
      在製作這個遊戲前也有許多煩惱(首次接觸UE4、美術設計困難、動畫設計等等)，但我們還是秉持著對遊戲(Fate系列)的熱忱硬幹出來了(笑)。
      我主要負責程式設計的部分，UE4提供一種不用撰寫程式碼的編譯系統 - 藍圖系統(BluePrint)，像是拼圖一般的把各種程式邏輯、物件連接起來，非常方便，不過一開始接觸還是要嗑完官方的教程(全英文orz)，現在想想也是好玩，多虧這樣在後面製作戰鬥行為時也不用到處翻教程。
      作品雖然上不了檯面，但這個經歷卻是難忘的，在前期製作遇到各種挫折的問題，也是在組員和導師的建議指導下慢慢突破，希望未來能有機會繼續這樣熱血的日子呢! 遊戲檔都還有保留，想玩的可以聯絡我XD 未來有機會再繼續開發遊戲吧。 主企劃 - 溫詠丞， 主程式 - 楊承恩(zero)
    website: https://youtu.be/90WoEVJo6VU
    image: /page/images/projects/esb.png

menu:
  main:
    weight: 4
    params:
      icon: link

comments: true
---
