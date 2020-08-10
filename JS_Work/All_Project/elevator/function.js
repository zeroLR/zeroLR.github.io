function motorSW(state) {
  switch (state) {
    case "lock":
      console.log("鎖住馬達");
    case "unlock":
      console.log("解鎖馬達");
  }
}

function motorACT(state) {
  switch (state) {
    case "up":
      console.log("開始向上移動");
    case "down":
      console.log("開始向下移動");
    case "stop":
      console.log("停止動作");
    case "speedUp":
      console.log("加速");
    case "speedDown:":
      console.log("減速");
  }
}

function posSetStart() {
  console.log("設定起始點");
}
function posSetEnd() {
  console.log("設定終止點");
}

function test() {
  console.log("測試動作");
}

function loopACT(state) {
  switch (state) {
    case "start":
      console.log("循環啟動");
    case "stop":
      console.log("循環停止");
  }
}
i = 30;
setInterval(() => {
  s = document.getElementById("slide-main");

  i += 1;
  s.value = i;
  if (s.value === 100) {
    i -= 1;
  } else if (s.value === 0) {
    i += 1;
  }
}, 1000);
