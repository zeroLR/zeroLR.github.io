var store = [{
        "title": "Pytorch安裝(使用Anaconda 3)",
        "excerpt":"Pytorch很適合想入門深度學習的人使用，官方文檔整理的很清楚，社區雖然還不是很完善，但有很多相關的教程可以幫助學習，之後再開一篇學習資源彙整，這篇先把Pytorch的環境架好，我是使用Windows10 搭配Anaconda3進行安裝 環境 : Anaconda 3 、 Sublime Text 、 Pytorch 1.4 (Conda,Python,CUDA 10.1) 確認顯卡有無支援CUDA，沒有則使用CPU CUDA支援GPU一覽 安裝Anaconda &amp; Pytorch 安裝Anaconda 3,pytorch,Sublime Text,VsCode(後兩者擇一) 在Anaconda建立虛擬環境(使用python 3.7.6) conda create -n pytorch_GPU python==3.7 切換至pytorch虛擬環境 activate pytorch_GPU 安裝pytorch(with CUDA) conda install pytorch torchvision cudatoolkit=10.1 -c pytorch 安裝pytorch(CPU) &lt;- 顯卡不支援CUDA時用這個 conda install pytorch torchvision cpuonly -c...","categories": ["Pytorch"],
        "tags": ["環境建置"],
        "url": "https://zerolr.github.io/pytorch/PytorchInstall/",
        "teaser":"https://zerolr.github.io/assets/images/PytorchInstall/pytorch.png"},{
        "title": "關於我",
        "excerpt":"本名先不說，目前是資工系延畢生orz   在學期間碰過 C、C++、C#、java、python，專題做過Unreal的PC遊戲和Unity的VR遊戲   學習熱度三分鐘如我，很難定下心來學一種技能，常常從零開始學習各種咚咚   所以就叫我zero吧💤     之前做了啥   開始了解機器學習(ML)跟深度學習(DL)是在專題結束後，老師問我想做甚麼，我說想試試AI … Done🤷‍♂️   然後給了我一台角蜂鳥後就開始玩了，在實驗室搞了個 “誰開門?” 的程式(辨識開關門狀態和人臉後截圖，從本機上傳圖片到line上)   這期間還碰過Tensorflow、OpenVINO，但我用Tensorflow真的不是很順手，在試別人的code時總是噴一堆error，暫時棄坑   OpenVINO還沒有深入研究，不過老師給的NCS2倒是挺好玩的，搭配上OpenVINO可以做很多種應用   現在要做啥   2020年寒假開始有了新目標 : Pytorch   在搜尋各種深度學習相關的文章時偶然知道這個框架，被它的各種優點所吸引，靈活、容易上手(重點)、文檔清晰…   好啦其實是自己懶🤥   與目前主流的Tensorflow比較下還是各有優缺，據我從網上了解的資訊，Pytorch偏學術應用，Tensorflow則是企業用，詳細評論這裡不談   Pytorch相對Tensorflow來說可以讓我更容易入門這一領域，至少不會到處碰壁降低信心   當前目標是在強化學習(RL)和各種演算法(Q-learning、AC、DDPG…)上應用，~~甚至能參加比賽之類的   持續緩慢更新中…   用這網頁也算是練習寫Blog，不過主要是紀錄下自己的想法和一些實驗的過程  ","categories": [],
        "tags": [],
        "url": "https://zerolr.github.io/about/",
        "teaser":"https://zerolr.github.io/assets/images/z_icon.png"}]
