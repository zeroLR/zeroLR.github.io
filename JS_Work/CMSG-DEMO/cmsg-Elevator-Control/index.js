var w;
var act;
var onScheEdit=0;
var editCmd = 0;
var kM;
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
 var ii;
  for( i in e.data )
  {	
	ii = $( i );
	if( ii )
	{
    if(i === "Cycle"){
      $("cycle").innerHTML = e.data[i];
      continue;
    }
    if(i === "MD"){
      ii.innerHTML = e.data[i];
      continue;
    }
		if( ( ii.tagName === "NUMBER" ) )
		{
			ii.value = e.data[i];
			continue;
		}
		if( ( ii.tagName === "BUTTON" ) )
		{
			if( e.data[i] === "ON")
			{ 
				ii.style.backgroundColor =  '#FF50FF';
			}
			else
			{
				ii.style.backgroundColor =  '#50FFFF';
			}
			continue;
		}
		ii.innerHTML= e.data[i];
		continue;
	}
	else
	{
		ii = $( "content" );
		str = ii.innerHTML;
		str += "<br/>";
		str += i + ":" + e.data[i];
		ii.innerHTML= str;
	}
  }
//  $( 'WP' ).innerHTML = parseFloat( v('WPV') ) * parseFloat( v('WPR') );
}