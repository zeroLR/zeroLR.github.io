---
title: 【PostgreSQL】初探 Transaction Isolation
slug: first-try-transaction-isolation
description: 最近面試被問到有關 Transaction 的問題時，幾乎答不出來Orz，趕緊查資料來壓壓驚。
image: /assets/images/pg.jpeg
categories:
  - SQL
  - Docker
tags:
  - PostgreSQL
  - Shell Script
date: 2022-10-22T17:57:01.549Z
---
> 最近面試被問到有關 **Transaction** 的問題時，幾乎答不出來Orz，趕緊查資料來壓壓驚。

這篇我會從官方文件及網路文章擷取部分內容，試著理解 [Postgres 中的 Transaction](https://www.postgresql.org/docs/14/transaction-iso.html) ，用 Docker 建立 Postgres 來做實驗，試著重現其中幾種狀況，由於我個人理解程度還不夠深，建議去閱讀參考資源的文章會收穫更多喔！

先來一段官方的介紹，詳細的內容在 [PostgreSQL MVCC 簡介](https://docs.postgresql.tw/the-sql-language/concurrency-control/introduction)。

> PostgreSQL 為開發者們提供了豐富的工具來管理資料的 **同時存取**。資料的 **一致性** 在資料庫內部是以 **多重資料版本的方式維護（Multiversion Concurrency Control，MVCC）**，這表示無論目前資料的當下狀態如何，每個 SQL 指令會看見的是資料在一段時間前的 **快照** （資料庫的某個版本）。

而MVCC這個功能大多數資料庫已經實現了，詳細參考 [維基百科-多版本並行控制](https://zh.wikipedia.org/zh-tw/%E5%A4%9A%E7%89%88%E6%9C%AC%E5%B9%B6%E5%8F%91%E6%8E%A7%E5%88%B6) 。

這次實驗的範圍以 **交易隔離(Transaction Isolation)** 為主 ，以我個人根據官方手冊提供的解釋及範例來做實驗，若過程中有錯誤認知也請不吝告知！

## 小試身手

可以先到 [Crunchydata Tutorials - Transactions](https://www.crunchydata.com/developers/playground/transactions) 去試一遍 postgres 中的 transaction 行為，照著做之外也可以去試著理解教學的重點喔！

## SQL **Transaction**

在實驗前先來複習一下 **資料庫交易行為(Transaction)** 的特性，以下節錄自 [SQL 大小事 - Po-Ching \*\*Liu](https://totoroliu.medium.com/%E8%B3%87%E6%96%99%E5%BA%AB-acid-bb87324035a8)。\*\*

- - -

在資料庫中，**交易(事務)** 意旨由各種 **資料庫操作(select、update、insert等)** 所組成的邏輯過程。

在資料庫中為保證其交易是正確且可靠的，必需滿足以下 **四個特性** ：

* **原子性(Atomicity)**

  * 在資料庫的每一筆交易中只有兩種可能發生，第一種是全部完全(commit)，第二種是全部不完成(rollback)，不會因為某個環節出錯，而終止在那個環節，在出錯之後會恢復至交易之前的狀態，如同還沒執行此筆交易。
* **一致性(Consistency)**

  * 在交易中會產生資料或者驗證狀態，然而當錯誤發生，所有已更改的資料或狀態將會恢復至交易之前。
* **隔離性(Isolation)**

  * 資料庫允許多筆交易同時進行，交易進行時未完成的交易資料並不會被其他交易使用，直到此筆交易完成。
* **持續性(Durability)**

  * 交易完成後對資料的修改是永久性的，資料不會因為系統重啟或錯誤而改變。

## 什麼是 交易隔離(Transaction Isolation) ?

以下節錄自 [PostgreSQL 交易隔離](https://docs.postgresql.tw/the-sql-language/concurrency-control/transaction-isolation) 及 [資料庫 Transaction & Lock 筆記。](https://hackmd.io/@Burgess/SkDnHKMNr)

- - -

在不同等級中發生 **競爭條件(Race condition)** 是：

* **Dirty write (髒寫)**

  * transaction 尚未 commit 的情況下，其值被另一個 transaction 給覆寫。
* **Dirty read (髒讀)**

  * transaction 讀取的資料是由尚未 commit 的 concurrency transaction 寫入的。
* **Non-repeatable read (無法重複的讀取)**

  * 又可稱作 **讀取偏差(read skew)** ，transaction 重新讀取它之前讀過的資料，但是卻發現資料被其他 transaction 修改（在最初讀取之後commit）了。
* **Phantom read (幻讀)**

  * 又可稱作 **寫入偏差(wirte skew)** ，transaction 重新執行查詢，得到滿足搜尋條件的資料集，但卻發現得到的資料集因為其他最近剛 commit 的 transaction 而變更了。
* **Serialization anomaly (序列化異常)**

  * 在成功提交一群 transactions 後，結果與以所有可能的順序依序執行交易的結果都不一致。

- - -

SQL 標準中定義了**四個等級的交易隔離 :**

1. **Read uncommitted :** 
   代表 transaction 可以讀到別的 transaction **尚未 commit** 的資料，在這個等級中 race condition 三個問題都沒有解決。
2. **Read committed :**
   代表 transaction 只能讀到別的 transaction **已經 commit** 的資料，沒有 commit 的話就不會讀到，在這個等級**解決了 Dirty read** 的問題，為 **Postgres 預設等級**。
3. **Repeatable read :**
   代表每次 transaction 要讀取特定欄位的資料時，只要 **query 條件相同**，**讀取到的資料內容就會相同，**在這個等級**解決了 Non-repeatable read** 的問題，為 **MYSQL InnoDB 預設等級** 。
4. **Serializable :**
   代表在多個 transaction 同時執行時，只要 **transaction 的順序相同時，得到的結果一定相同**。比如說 Transaction A 先執行了接下來再執行 Transaction B，在同樣的條件下，每次執行都會得到一樣的結果，在這個等級下連同 **Phantom read 也會一併被解決**。

## 交易隔離等級與競爭條件

| 隔離等級             | Dirty write | Dirty read | Non-repeatable read | Phantom read | Serialization anomaly |
| ---------------- | ----------- | ---------- | ------------------- | ------------ | --------------------- |
| Read uncommitted | 不可能         | 允許，但PG中不會  | 可能                  | 可能           | 可能                    |
| Read committed   | 不可能         | 不可能        | 可能                  | 可能           | 可能                    |
| Repeatable read  | 不可能         | 不可能        | 不可能                 | 允許，但PG中不會    | 可能                    |
| Serializable     | 不可能         | 不可能        | 不可能                 | 不可能          | 不可能                   |

> [資料工程師修煉之路 Part II](https://ithelp.ithome.com.tw/users/20130395/ironman/4188) IThome 鐵人賽中的系列文章，有附圖而且解釋的更詳細，非常推薦去閱讀！

## 實驗環境

* Mac M1
* Docker 20.10.17
* Docker Compose 2.2.3
* Docker Image: `postgres:14-alpine`

## 模擬 race condition 發生

> 由於在 RDBMS 中的 transaction 不允許 **dirty write(髒寫)** 的狀況發生，有關其狀況可以參考其他文章解釋，而 **serialization anomaly(序列化異常)** 我還不清楚如何重現🥲，**dirty read(髒讀)** 在 postgres 中也被限制，這邊就先試著重現一種 race condition 的狀況，並觀察修改 isolation 等級前後的結果。

### Non - Repeatable Read(Read skew)

模擬在 **Read committed** 等級底下會發生的問題。

參考以下情境進行實驗：

* Alice 擁有兩個銀行帳戶，各有 500 元在帳戶中，共有 1000 元
* 有個轉帳作業發起 transaction 從 Account 1 轉帳至 Account 2
* Alice 發起的 transaction 在**轉帳前**查了 Account 1 ，在**轉帳後**查了 Account 2，得到總額 900元的資訊，發現總金額少了 100 元，但帳戶中總額確實為 1000 元
* Alice 需要再次查詢才可取得正確的結果

![figure_7-6.png](assets/images/figure_7-6.png)

這個情境下符合 Read committed 等級中允許讀取已 committed 的資料，但沒有保證在同一個 transaction 下，所取得的資料都是同一份。

- - -

GitHub repo： <https://github.com/zeroLR/first-try-transaction-isolation>

建立資料夾

```bash
mkdir -p first-try-transaction-isolation/non-repeatable-read
cd first-try-transaction-isolation/non-repeatable-read
touch docker-compose.yml
```

docker-compose 配置

```yaml
version: '3.1'

services:
  db:
    container_name: pg
    image: postgres:14-alpine
    restart: always
    environment:
      POSTGRES_DB: postgres
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    working_dir: /usr/src
    # 直接把現在資料夾內容映射至建立的container中，copy所需檔案進去比較好，這邊僅為了方便操作
    volumes:
      - .:/usr/src
```

啟動 container 的順序不影響映射到 container 中的檔案，這邊就先啟動

```bash
sudo docker-compose up -d
```

建立 sql 檔

**initdb.sql**

```sql
BEGIN;
DROP TABLE IF EXISTS accounts;
CREATE TABLE accounts(id SERIAL PRIMARY KEY, balance INT);
INSERT INTO accounts(balance)
VALUES(500);
INSERT INTO accounts(balance)
VALUES(500);
COMMIT;
```

**alice.sql**(註解那行表示設定此transaction的隔離等級)

```sql
BEGIN;
-- SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
SELECT balance
FROM accounts
WHERE id = 1;
SELECT balance
FROM accounts
WHERE id = 2;
COMMIT;
```

**transfer.sql**

```sql
BEGIN;
UPDATE accounts
SET balance = balance + 100
WHERE id = 1;
UPDATE accounts
SET balance = balance - 100
WHERE id = 2;
COMMIT;
```

建立 shell script

**lab.sh**

```bash
#!/bin/sh

path=/usr/src/non-repeatable-read

# 執行 initdb 中的 query 初始化實驗環境
psql -U postgres -f $path/initdb.sql  --out log.txt

# 將兩個執行 transaction 放到背景並發執行
psql -U postgres -f $path/alice.sql &

psql -U postgres -f $path/transfer.sql &
```

**start.sh**

```bash
#!/bin/sh

RED='\033[0;31m'
BLUE='\033[0;34m'
GREEN='\033[0;32m'
NC='\033[0m'

path=/usr/src/non-repeatable-read

cycle=300                   # 執行次數
snapshotAfterTransaction=0  # 另一筆 transaction commit 前取得的快照計數
snapshotBeforeTransaction=0 # 另一筆 transaction commit 後取得的快照計數
snapshotNonRepeatable=0     # 另一筆 transaction 中取到不同快照計數

for i in $(seq 1 $cycle);
do 
    
    # 執行 lab.sh 中的指令，並過濾出有400、500、600的結果
    output=$(sh $path/lab.sh | grep -E '400|500|600')

    # 儲存各種狀況結果
    ## 兩筆資料皆是另一筆 transaction commit 後的快照
    snapshot1=$(echo $output | grep '600 400')

    ## 兩筆資料皆是另一筆 transaction begin 前的快照
    snapshot2=$(echo $output | grep '500 500')

    ## 第一筆資料為另一筆 transaction begin 前的快照，第二筆則為 transaction commit 後的快照
    snapshot3=$(echo $output | grep '500 400')

    if [ ! -z "$snapshot1" ]
    then
        let snapshotAfterTransaction++
        echo -e "${GREEN}$snapshot1${NC}"
    fi

    if [ ! -z "$snapshot2" ]
    then
        let snapshotBeforeTransaction++
        echo -e "${BLUE}$snapshot2${NC}"
    fi

    if [ ! -z "$snapshot3" ]
    then
        let snapshotNonRepeatable++
        echo -e "${RED}$snapshot3${NC}"
    fi

    # 三種狀況結果統計
    if [ $i -eq $cycle ]
    then
        echo -e "${GREEN}AfterTransaction: ${snapshotAfterTransaction}\n${BLUE}BeforeTransaction: ${snapshotBeforeTransaction}\n${RED}Non-repeatable: $snapshotNonRepeatable${NC}"
    fi
done
```

檔案準備好之後，執行 start.sh 即可開始實驗，使用 time -p 可以得知執行時間

```bash
time -p sh start.sh
```

## 實驗結果

### Read committed (postgres 預設等級)

使用預設隔離等級，300次實驗中有8次得到有問題的結果。

![截圖 2022-10-23 上午1.13.50.png](assets/images/read-committed.png)

## Repeatable Read

設定 `SET TRANSACTION ISOLATION LEVEL REPEATABLE READ` 後，300次實驗中無發生不正確的結果，相對的取得另一交易後的資料次數較少。

![截圖 2022-10-23 上午1.14.12.png](assets/images/repeatable-read.png)

## 總結

* 如果再將實驗次數拉高或許結果會更準確，不過我也不是很確定這個做法有沒有其他問題，只是覺得能夠重現同樣的問題並且去解決它，是一件蠻有成就的事，這次只有寫 Non-repeatable Read(read skew) 的實驗，之後有空再試試重現 Phantom Read(write skew)。

## 參考資料

* [維基百科-多版本並行控制](https://zh.wikipedia.org/zh-tw/%E5%A4%9A%E7%89%88%E6%9C%AC%E5%B9%B6%E5%8F%91%E6%8E%A7%E5%88%B6)
* [Crunchydata Tutorials - Transactions](https://www.crunchydata.com/developers/playground/transactions)
* [PostgreSQL 14 transaction-iso](https://www.postgresql.org/docs/14/transaction-iso.html)
* [PostgreSQL MVCC 簡介](https://docs.postgresql.tw/the-sql-language/concurrency-control/introduction)
* [PostgreSQL 交易隔離](https://docs.postgresql.tw/the-sql-language/concurrency-control/transaction-isolation)
* [SQL 大小事](https://totoroliu.medium.com/%E8%B3%87%E6%96%99%E5%BA%AB-acid-bb87324035a8)
* [資料庫 Transaction & Lock 筆記](https://hackmd.io/@Burgess/SkDnHKMNr)
* [資料工程師修煉之路 Part II](https://ithelp.ithome.com.tw/users/20130395/ironman/4188)