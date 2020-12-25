var w;
function $(id)
{
  return document.getElementById(id);  
}
function connect()
{
  if(typeof(Worker) === "undefined")
  {
    console.log('not support Worker');
    return;
  }
  if (typeof(w) === "undefined")
  {
    w = new Worker("./worker.js"); 
    w.onmessage = wkMsg; 
  }
  cmd = {"URL":document.URL};
  w.postMessage(cmd);
}
function wkMsg(e)
{	
  if('RSSI' in e.data )
    $("top").rows[0].cells[1].innerHTML = e.data['RSSI'];
  if( 'LT' in e.data )
    $("top").rows[0].cells[3].innerHTML = e.data['LT'];
  tb = $( "wifi");
  if('wifi' in e.data )
    tb.rows[0].cells[1].innerHTML = e.data["wifi"];
  if( 'webhooks' in e.data )
    tb.rows[2].cells[1].innerHTML = e.data["webhooks"];
  if ( 'I2' in e.data )
    tb.rows[3].cells[2].innerHTML = e.data["I2"];
  if( 'content' in e.data )
  {
    str = e.data['content'];
    $("content").innerHTML += ">> " + str + "<BR/>";
  }
}
