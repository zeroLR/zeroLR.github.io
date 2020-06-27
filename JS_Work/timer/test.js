var str;
function $(id) {
  return document.getElementById(id);
}

function ckchm() {
  onScheEdit = 0;
  kM = 0;
  switch ($("ACT").options[$("ACT").selectedIndex].value) {
    case "stop":
      str = "change mode 0";
      break;
    case "auto":
      str = "change mode 1";
      break;
    case "edit":
      str = "change mode 2";
      break;
    case "manual":
      str = "change mode 3";
      break;
  }
  console.log(str);
  if (str == "change mode 2") {
    $("time_add").style.display = "table-row";
    $("MAGIC_edit").style.display = "table-row";
  } else {
    $("time_add").style.display = "none";
    $("time_edit").style.display = "none";
  }
}

function newRule() {
  $("time_edit").style.display = "table-row";
  $("time_add").style.display = "none";
}

function appSche(bool) {
  if (bool) {
  } else {
    $("time_add").style.display = "table-row";
    $("time_edit").style.display = "none";
  }
}

function print(id) {
  console.log(id + $(id).checked);
}
