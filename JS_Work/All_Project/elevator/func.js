function postCmd( str )
{
  if ( str === "" )
	return;
  jsonCmd = {"SENDCMD":str};
  console.log(jsonCmd);
  w.postMessage(jsonCmd);		
}
function execCmd()
{
  editCmd = 0;
  str=$('CMD').value;
  $('CMD').value = '';
  if ( str.indexOf( "clear msg" )  == 0 )
  {
    $( 'content' ).innerHTML="";
    return;
  }
  postCmd( str );
}
function SendBt( btStr )
{
  jsonCmd = {"SENDCMD":btStr};
  console.log(jsonCmd);
  w.postMessage(jsonCmd);	
}

function setCycle( i )
{
  var retStr = "";;
  if ( i === 0 )
  {
    retStr ="CYCLE ABORT";
  }
  else
  {
    var cys = $( 'Cycle' ).value;
    retStr = "CYCLE START ";
    retStr += cys;
 }
 SendBt( retStr )
 
}