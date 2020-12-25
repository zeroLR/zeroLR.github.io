
function connectAP()
{
  var ssid = $( 'ssid' ).value;
  var pwd = $( 'pwd' ).value;
  cmd = "connect AP " + ssid;
  cmd += " " + pwd;
  w.postMessage( { "SENDCMD":cmd} );
}
function execCmd()
{
  cmdStr = $('cmd').value;
  if( cmdStr.length == 0 )
    return;
  $('content').innerHTML +=  "<< " + cmdStr + "<BR/>" ;
  $('cmd').value="";
  w.postMessage( {"SENDCMD":cmdStr} );
}
function cleanCnt()
{
  $('content').innerHTML = "" ;
}
function networkscan()
{
  w.postMessage( {"SENDCMD":"AP scan"} );
}
function LineNotify()
{
  msg = "Line";
  msg += getValue();
  console.log( msg );
  w.postMessage( {"SENDCMD":msg} );
}

function saveNotify( i )
{
  msg = "save LineNotify [" + i;
  msg += "] [";
  msg += $( "delay"+i ).value;
  msg += "] [";
  msg += $( "cycle"+i ).value;
  msg += "] ";
  msg += " EN:{" + $('Event'+i).value;
  msg += "} HK:{" + $("wifi").rows[2].cells[1].innerHTML;
  msg += "}?value1=" + encodeURIComponent( $('Status'+i ).value );
  msg += "&value2=" + encodeURIComponent( $('Cust'+i ).value );
  msg += "&value3=" + encodeURIComponent( $('Note'+i ).value );
  console.log( msg );
  w.postMessage( {"SENDCMD":msg} );
}
function getValue()
{
  msg = " EN:{" + $('EN').value;
  msg += "} HK:{" + $("wifi").rows[2].cells[1].innerHTML;
  msg += "}?value1=" + encodeURIComponent( $('V1').value );
  msg += "&value2=" + encodeURIComponent( $('V2').value );
  msg += "&value3=" + encodeURIComponent( $('V3').value );
  return msg;
}
function FireNotify( i )
{
  msg = "fire LineNotify [" + i;
  msg += "]";
  console.log( msg );
  w.postMessage( {"SENDCMD":msg} );
}
