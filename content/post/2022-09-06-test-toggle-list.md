---
title: test toggle list
slug: test
description: toggle list
image: /
date: 2022-09-06T13:49:18.032Z
---

<details>
  <summary>toogle list</summary>
      
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
      
</details>