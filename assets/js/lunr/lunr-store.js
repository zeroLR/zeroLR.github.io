var store = [{
        "title": "PyTorch安裝(使用Anaconda 3)",
        "excerpt":"Pytorch很適合想入門深度學習的人使用，官方文檔整理的很清楚，社區雖然還不是很完善，但有很多相關的教程可以幫助學習，之後再開一篇學習資源彙整，這篇先把Pytorch的環境架好，我是使用Win10搭配Anaconda3進行安裝(如內容有誤或其他問題，歡迎留言或email) 環境 : Anaconda 3 、 Pytorch 1.4 (Conda,Python,CUDA 10.1) 、 Sublime Text 、 VsCode ⚠   確認顯卡有無支援CUDA，沒有則使用CPU CUDA支援GPU一覽 安裝 Anaconda &amp; Pytorch 安裝Anaconda 3,pytorch,Sublime Text,VsCode(後兩者擇一) 在Anaconda建立虛擬環境(使用python 3.7.6) conda create -n pytorch_GPU python==3.7 切換至pytorch虛擬環境 activate pytorch_GPU 安裝pytorch(with CUDA) conda install pytorch torchvision cudatoolkit=10.1 -c pytorch 安裝pytorch(CPU) &lt;- 顯卡不支援CUDA時用這個 conda install...","categories": ["Tools"],
        "tags": ["Pytorch","Anaconda","Sublime Text","VsCode"],
        "url": "https://zerolr.github.io/tools/PytorchInstall/",
        "teaser":"https://zerolr.github.io/assets/images/PytorchInstall/pytorch.png"},{
        "title": "學習資源",
        "excerpt":"這邊是我個人目前有在關注的學習資源，若有敘述錯誤或是連結失效請留言或email，有推薦的文章或教程也歡迎推坑，先感謝各位大大的指教了。 PyTorch     這系列教學可以快速入門PyTorch，從安裝到建造神經網絡、CNN、RNN、DQN等等，各種淺顯易懂的說明，包含影片、文章、和所有代碼。   Pytorch 教程系列 / 莫煩Python     PyTorch官方文檔，包含官方教學、社區、Github，都在這網站裡，基本上看完莫煩有個初步了解後可以開始嗑官方教程了。   PyTorch官方文檔     PyTorch中文文檔，不過我個人偏向看官方英文文檔，有時看英文反而比較好理解，除非看不懂再來這尋暖。   PyTorch中文文檔     從初階到實戰，各種大大小小的學習資源全部都在這啦，目前還沒開始研究，但嗑完這個的話…JoJo我不做人啦!!!   史上最全的PyTorch學習資源匯總   數據處理     兩個科學運算當中最為重要的兩個模塊，應用在數據分析、機器學習、深度學習，運算速度快且消耗資源少。   Numpy &amp; Pandas 教程系列 / 莫煩Python     對於需要大量數據的機器學習來說，爬蟲是很好的技術，可以省下許多收集資料的時間，讓作者莫煩帶你認識和實作爬蟲吧。   網頁爬蟲教程系列 / 莫煩Python   DL/ML/RL     這系列帶你認識一些常見的神經網絡和強化學習的相關知識，在動手實作前不妨看一看，可以對機器學習有更多認識喔。   有趣的機器學習系列 / 莫煩Python     對強化學習有認識後，這系列教程會實作各種model，必須具備Numpy和Pandas的知識才比較好上手，教程使用Tensorflow來實作。   強化學習系列教程...","categories": ["Resources"],
        "tags": ["Pytorch","Numpy","Pandas","Python","GitHub","Papers"],
        "url": "https://zerolr.github.io/resources/Resources/",
        "teaser":"https://zerolr.github.io/assets/images/PytorchInstall/pytorch.png"},{
        "title": "轉貼集中地",
        "excerpt":"   記錄一下優質的文章    Python          感謝作者Clay所寫的這篇文章，最近要做的東西剛好需要用到，平常用來下載Youtube的影片也非常方便!    Python 當中使用 pytube 下載 Youtube 的影片        ","categories": ["Share"],
        "tags": ["Python","Youtube"],
        "url": "https://zerolr.github.io/share/Share/",
        "teaser":"https://images.unsplash.com/photo-1482066490729-6f26115b60dc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1302&q=80"},{
        "title": "歌聲轉譜資料處理(1) - 排序資料&下載YT歌曲",
        "excerpt":"參加了AI CUP 2020的歌聲轉譜競賽，目前得知兩種訓練方法，一種透過主辦標記好的音符資料(Vocal.json)去訓練出人聲音高，另一種是將YT歌曲自行抽取出人聲和進行音高追蹤去取得資料，後者目前能力還做不太到，但可以先試試，所以先將測試集的歌曲按順序下載下來，之後再看如何處理囉 環境 : Anaconda 3 、 VsCode 、 Pytorch 1.4 (Conda,Python,CUDA 10.1) 將os.listdir所讀取的資料夾名稱進行排序 python中的os.listdir讀取進來的檔名排序是亂的，需要使用sort來進行排序，但由於資料夾名稱不是用int表示，所以排出來還是亂的。 為了節省時間從網上得知natsort這個套件，用conda或pip安裝都可，import後就可以直接使用了，結果如下圖。 下載所有YT歌曲 這篇文章有教學如何用python下載YT歌曲pytube 下載 Youtube 的影片，加上主辦提供的代碼可以讀取所有YT連結，一行代碼就可以下載囉，建議output到對應資料夾裡，看起來比較舒服。 由於載下來的檔案是影片檔(.mp4)，還需要做轉檔的處理，首先安裝moviepy套件，再來下面以轉成(.mp3)為例，轉出到對應的路徑中 import os from moviepy.editor import * if __name__ == '__main__': for root, dirs, files in os.walk(\"./singingTranscription\"): for f in files: # 取得資料夾中所有檔案 f_n, f_ex = os.path.splitext(f) #...","categories": ["Contest"],
        "tags": ["Python","Youtube"],
        "url": "https://zerolr.github.io/contest/VocalToMidi(1)/",
        "teaser":"https://aidea-web.tw/images/5e60592bb1489dd7e534d665/bfcaa1b4-5b69-4f17-a5c4-f58ef7da68cb-big.png"}]
