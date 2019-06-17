var blacklocation=[];
blacklocation[1]='a2';blacklocation[2]='b2';blacklocation[3]='c2';blacklocation[4]='d2';blacklocation[5]='e2';blacklocation[6]='f2';blacklocation[7]='g2';blacklocation[8]='h2';
blacklocation[9]='a1';blacklocation[10]='b1';blacklocation[11]='c1';blacklocation[12]='d1';blacklocation[13]='e1';blacklocation[14]='f1';blacklocation[15]='g1';blacklocation[16]='h1';

var whitelocation=[];
whitelocation[1]='a7';whitelocation[2]='b7';whitelocation[3]='c7';whitelocation[4]='d7';whitelocation[5]='e7';whitelocation[6]='f7';whitelocation[7]='g7';whitelocation[8]='h7';
whitelocation[9]='a8';whitelocation[10]='b8';whitelocation[11]='c8';whitelocation[12]='d8';whitelocation[13]='e8';whitelocation[14]='f8';whitelocation[15]='g8';whitelocation[16]='h8';
console.log(blacklocation);
console.log(whitelocation);
var lastdeletedindexw=0,lastdeletedindexb=0;
$(document).ready(function()
{

});
 //var clicked=0;
 //var currentboxcolor='';
 var currentboxname='';
 
 var currentcoinname='';
 var boxes=[];
 var killedw=[];var killedb=[];
 var tempboxes=[];

/* temp variables to store values for inserting in boxes array */
var tempboxname='';
var tempcoinname='';


 function mouseclicked(boxcolor,boxname,coinname)
 {


        //check the possible moves array  if the boxname is present in it. if so then this click is for moving coin  from last clicked box to presently clicked boxname
        if(boxes.indexOf(boxname)==-1)
        {
             // currently selected cell is not there in the possbibe moves list. So take this as a new click.
         removehighlight();
         removehighlightselectedcell(currentboxname);
         boxes=[];
         currentboxname=boxname;
         currentcoinname=coinname;
         possiblemoves(coinname,boxname,boxes);
         highlightselectedcell(boxname);
         highlight();
         
        }
        else
        {
          //alert("Coin from "+currentboxname+" is trying to move to "+boxname);
          removehighlightselectedcell(currentboxname);
          removehighlight();

          movecoin(currentboxname,boxname,coinname,currentcoinname);
          
          //now assuming move is done , flush all details related to current move.
          currentboxname='';boxes=[];currentcoinname='';
        }
        
     
       

        
   

 }
 function highlight()
{
  for(var i=0;i<boxes.length;i++)
  {
    var selectorstring="[name='"+boxes[i]+"']";
     $(selectorstring).removeClass("bp").addClass("highlight");
  }
}
function highlightselectedcell(boxname)
{
    var selectorstring="[name='"+boxname+"']";
     $(selectorstring).removeClass("bp").addClass("highlight_special");

}
 function removehighlight()

{
  for(var i=0;i<boxes.length;i++)
  {
    var selectorstring="[name='"+boxes[i]+"']";
     $(selectorstring).removeClass("highlight").addClass("bp");
  }
}
function removehighlightselectedcell(boxname)
{
   var selectorstring="[name='"+boxname+"']";
     $(selectorstring).removeClass("highlight_special").addClass("bp");
}
 function movecoin(frombox,tobox,currentcoinname,lastcoinname)
 {
    
    console.log(currentcoinname+" -> "+lastcoinname);
    var fromtext=document.getElementsByName(frombox)[0].textContent;
    var totext=document.getElementsByName(tobox)[0].textContent;
   

   if(totext.length>0)
    {
      if(currentcoinname.charAt(0)=='b')
       {
       killedb.push(document.getElementsByName(tobox)[0].textContent);
       lastdeletedindexb++;
       $("#graveyard2").html(killedb.join(" "));
       }
       else if(currentcoinname.charAt(0)=='w')
       {
         killedw.push(document.getElementsByName(tobox)[0].textContent);
         lastdeletedindexw++;
         $("#graveyard1").html(killedw.join(" "));
       }
    } 
    
    document.getElementsByName(tobox)[0].innerHTML=fromtext;
    document.getElementsByName(tobox)[0].id=lastcoinname;
   

    document.getElementsByName(frombox)[0].id='';
    document.getElementsByName(frombox)[0].innerHTML='';
    
   //console.log(killed);



    //check if soldier come to other end and prompt to select powers

    if(lastcoinname.indexOf('whitepawn')>=0 && parseInt(tobox.charAt(1))==1)
    {
    	alert("has come to last..prompt to swap powers");
    }
    if(lastcoinname.indexOf('blackpawn')>=0 && parseInt(tobox.charAt(1))==8)
    {
    	alert("has come to last..prompt to swap powers");
    }


 }
  function nextchar(c)
 {
    return String.fromCharCode(c.charCodeAt(0) + 1);
 }
 function prevchar(c)
 {
    return String.fromCharCode(c.charCodeAt(0) - 1);
 }
function disp(boxestodisp)
{
  
  var toshow="moves:";
  for(var i=0;i<boxestodisp.length;i++)

  {
    toshow=toshow+boxestodisp[i]+" ";
  }

  alert(toshow);
}

function possiblemoves(coinname,boxname)
{


var bw=coinname.charAt(0);
cname=coinname.substr(5,(coinname.length-5));
if(currentcoinname.indexOf('rook')>=0) {cname='rook'; }
else if(currentcoinname.indexOf('knight')>=0) {cname='knight'; }
else if(currentcoinname.indexOf('bishop')>=0) {cname='bishop'; }
else if(currentcoinname.indexOf('pawn')>=0) {cname='pawn'; }


switch(cname)
{
 case 'rook':
  boxesdown(boxname,coinname);
  boxesup(boxname,coinname);
  boxesright(boxname,coinname);
  boxesleft(boxname,coinname);
  break;

  case 'pawn':
  boxesforpawn(boxname,coinname);
  break;
   case 'knight':
    horsemovesdownright(boxname,coinname);
     horsemovesdownleft(boxname,coinname);
     horsemovesupleft(boxname,coinname);
     horsemovesupright(boxname,coinname);
    //disp(boxes);
    break; 

  case 'bishop':

  boxesdownrightcross(boxname,coinname);
  
  boxesdownleftcross(boxname,coinname);
  boxesupleftcross(boxname,coinname);
  boxesuprightcross(boxname,coinname);
  break;
 
 case 'queen':
    boxesdown(boxname,coinname);
  boxesup(boxname,coinname);
  boxesright(boxname,coinname);
  boxesleft(boxname,coinname);
  boxesdownrightcross(boxname,coinname);
  
  boxesdownleftcross(boxname,coinname);
  boxesupleftcross(boxname,coinname);
  boxesuprightcross(boxname,coinname);
  break;

  case 'king':
  boxesdown(boxname,coinname);
   boxesup(boxname,coinname);
   boxesleft(boxname,coinname);
    boxesright(boxname,coinname);
    boxesdownrightcross(boxname,coinname);
        boxesdownleftcross(boxname,coinname);
        boxesuprightcross(boxname,coinname);
        boxesupleftcross(boxname,coinname);
        boxesuprightcross(boxname,coinname);


  break;




}

}


function boxesdown(position,coinname)
{
  
  var i1=position.charAt(0);
  var i2=parseInt(position.charAt(1));
   var l1;
   
  if(coinname.indexOf('king')==5)
  {
    if(i2<8) l1=i2+1; // if king , then only one step down is valid.
  }
  else
  {
    l1=8;
  }
  
  for(var i=i2+1;i<=l1;i++)
  {
    var pos=i1+i.toString();
    var content=document.getElementsByName(pos)[0].textContent;
    var coincolor=document.getElementsByName(pos)[0].getAttribute("id");
    if(content=='') 
    {
    boxes.push(pos); continue;
    }
    if(coincolor.charAt(0)!=coinname.charAt(0))
     {
         boxes.push(pos); 
         break;
     }
     // if above both fail then the current coin and the last coin both are of same color. So Cannot go any further.
    else
     {
        break;
     }
  }


}

function boxesup(position,coinname)
{
   var i1=position.charAt(0);
   var i2=parseInt(position.charAt(1));
    var l1;
   
  if(coinname.indexOf('king')==5)
  {
    if(i2>1) l1=i2-1; // if king , then only one step down is valid.
  }
  else
  {
    l1=1;
  }
   for(var i=parseInt(i2)-1;i>=l1;i--)
   {
      
    var pos=i1+i.toString();
    var content=document.getElementsByName(pos)[0].textContent;
    var coincolor=document.getElementsByName(pos)[0].getAttribute("id");
    if(content=='') 
    {
    boxes.push(pos); continue;
    }
    if(coincolor.charAt(0)!=coinname.charAt(0))
     {
         boxes.push(pos); 
         break;
     }
     // if above both fail then the current coin and the last coin both are of same color. So Cannot go any further.
    else
     {
        break;
     }
   }
}

function boxesleft(position,coinname)
{
   var i1=position.charAt(0);
   var i2=position.charAt(1);
   var l1;
   
  if(coinname.indexOf('king')==5)
  {
    if(i1>'a') l1=prevchar(i1); // if king , then only one step down is valid.
  }
  else
  {
    l1='a';
  }
   for(var i=prevchar(i1);i>=l1;i=prevchar(i))
   {
    
    var pos=i+i2;
    var content=document.getElementsByName(pos)[0].textContent;
    var coincolor=document.getElementsByName(pos)[0].getAttribute("id");
   if(content=='') 
    {
    boxes.push(pos); continue;
    }
    if(coincolor.charAt(0)!=coinname.charAt(0))
     {
         boxes.push(pos); 
         break;
     }
     // if above both fail then the current coin and the last coin both are of same color. So Cannot go any further.
    else
     {
        break;
     }
   }

}

function boxesright(position,coinname)
{

   var i1=position.charAt(0);
   var i2=position.charAt(1);
   var l1;
   
  if(coinname.indexOf('king')==5)
  {
    if(i1<'h') l1=nextchar(i1); // if king , then only one step down is valid.
  }
  else
  {
    l1='h';
  }
 
   for(var i=nextchar(i1);i<=l1;i=nextchar(i))
   {
    
    var pos=i+i2;
    var content=document.getElementsByName(pos)[0].textContent;
    var coincolor=document.getElementsByName(pos)[0].getAttribute("id");
   if(content=='') 
    {
    boxes.push(pos); continue;
    }
    if(coincolor.charAt(0)!=coinname.charAt(0))
     {
         boxes.push(pos); 
         break;
     }
     // if above both fail then the current coin and the last coin both are of same color. So Cannot go any further.
    else
     {
        break;
     }
   }
 
}

function boxesdownrightcross(position,coinname)
{
  
   var i1=position.charAt(0);
   var i2=parseInt(position.charAt(1));
   var l1,l2;
   
  if(coinname.indexOf('king')==5)
  {
    if(i1<'h' && i2<8)
    { 
    	l1=nextchar(i1);
    	l2=i2+1;

    }

     // if king , then only one step down is valid.
  }
  else
  {
    l1='h';
    l2=8;
  }
  
  for(var i=i2+1,i1=nextchar(i1);i<=l2 && i1<=l1;i++,i1=nextchar(i1))
  {
   
     var pos=i1+i.toString();
     
   // var content=document.getElementsByName(pos)[0].textContent;
    var tid=document.getElementsByName(pos)[0].getAttribute("id");
   // alert("coin nmae="+coinname+" tid="+tid);
    if(tid.length==0)
    {
    boxes.push(pos); continue;
    }
    if(tid.charAt(0)!=coinname.charAt(0))
    {
      boxes.push(pos); break;
    }
    else
    {
      break;
    }
    
  }


}

function boxesdownleftcross(position,coinname)
{
  

   var i1=position.charAt(0);
   var i2=parseInt(position.charAt(1));
   var l1,l2;
   
  if(coinname.indexOf('king')==5)
  {
    if(i1>'a' && i2<8)
    { 
    	l1=prevchar(i1);
    	l2=i2+1;

    }

     // if king , then only one step down is valid.
  }
  else
  {
    l1='a';
    l2=8;
  }
 
  for(var i=i2+1,i1=prevchar(i1);i<=l2&& i1>=l1;i++,i1=prevchar(i1))
  {
   
    var pos=i1+i.toString();
    //alert("pos="+pos);
    var tid=document.getElementsByName(pos)[0].getAttribute("id");
   if(tid.length==0)
    {
    boxes.push(pos); continue;
    }
    if(tid.charAt(0)!=coinname.charAt(0))
    {
      boxes.push(pos); break;
    }
    else
    {
      break;
    }
    
  }
}
function boxesupleftcross(position,coinname)
{
   var i1=position.charAt(0);
   var i2=parseInt(position.charAt(1));
 var l1,l2;
   
  if(coinname.indexOf('king')==5)
  {
    if(i1>'a' && i2>1)
    { 
    	l1=prevchar(i1);
    	l2=i2-1;

    }

     // if king , then only one step down is valid.
  }
  else
  {
    l1='a';
    l2=1;
  }
  for(var i=i2-1,i1=prevchar(i1);i>=l2 && i1>=l1;i--,i1=prevchar(i1))
  {
    
     var pos=i1+i.toString();
    var tid=document.getElementsByName(pos)[0].getAttribute("id");
    if(tid.length==0)
    {
    boxes.push(pos); continue;
    }
    if(tid.charAt(0)!=coinname.charAt(0))
    {
      boxes.push(pos); break;
    }
    else
    {
      break;
    }
  }
}
function boxesuprightcross(position,coinname)
{
   var i1=position.charAt(0);
   var i2=parseInt(position.charAt(1));
  var l1,l2;
   
  if(coinname.indexOf('king')==5)
  {
    if(i1<'h' && i2>1)
    { 
    	l1=nextchar(i1);
    	l2=i2-1;

    }

     // if king , then only one step down is valid.
  }
  else
  {
    l1='h';
    l2=1;
  }
  for(var i=i2-1,i1=nextchar(i1);i>=l2&&i1<=l1;i--,i1=nextchar(i1))
  {
   
    var pos=i1+i.toString();
    var tid=document.getElementsByName(pos)[0].getAttribute("id");
   if(tid.length==0)
    {
    boxes.push(pos); continue;
    }
    if(tid.charAt(0)!=coinname.charAt(0))
    {
      boxes.push(pos); break;
    }
    else
    {
      break;
    }
  }
}

function boxesforpawn(position,coinname)
{
   
   
   tempboxes=[];
  
   var i1=position.charAt(0);
   var i2=parseInt(position.charAt(1));
 
   if(coinname.charAt(0)=='b')
   {
    if(i2==2)
      var t=1;
    else
      var t=2;
    
       for(var i=i2+1;t<3;i++,t++)
       {
        
        if(document.getElementsByName(i1+((i).toString()))[0].textContent=='')
          {
            boxes.push(i1+((i).toString()));
          }
          else
            break;
       }
      
    
  
    oneboxdownleftcross(position,coinname);
    oneboxdownrightcross(position,coinname);
    /*for(var i=0;i<tempboxes.length;i++)
    {
      if(document.getElementsByName(tempboxes[i])[0].id.charAt(0)!='b')
      {
        boxes.push(tempboxes[i]);
      }
    } */
    

  }
  else
  {
   if(i2==7)
    var t=1;
   else
    var t=2;
   
    for(var i=i2-1;t<3;i--,t++)
    {
    
     if(document.getElementsByName(i1+((i).toString()))[0].textContent=='')
          {
            boxes.push(i1+((i).toString()));
          }
          else
            break;
    }
   
   
    oneboxupleftcross(position,coinname);
    oneboxuprightcross(position,coinname);
   /* for(var i=0;i<tempboxes.length;i++)
    {
      if(document.getElementsByName(tempboxes[i])[0].id.charAt(0)!='w')
      {
        boxes.push(tempboxes[i]);
      }
    } */
  }

}

function oneboxdownleftcross(position,coinname)
{

   
   var i1=position.charAt(0);
   var i2=position.charAt(1);
   if(i1!='a')
   {
      
      tempboxname=prevchar(i1)+(parseInt(i2)+1).toString();
      tempcoinname=document.getElementsByName(tempboxname)[0].id;
      //alert("temp coinname="+tempcoinname+" coinname="+coinname+"temp box name="+tempboxname);
      if(tempcoinname.length > 0 && tempcoinname.charAt(0)!=coinname.charAt(0) )
      {
      boxes.push(tempboxname); 
      }
     
    
   }
   
}
function oneboxdownrightcross(position,coinname)
{
    
   var i1=position.charAt(0);
   var i2=position.charAt(1);
   if(i1!='h')
   {
     tempboxname=nextchar(i1)+(parseInt(i2)+1).toString();
     tempcoinname=document.getElementsByName(tempboxname)[0].id;

     if(tempcoinname.length > 0 && tempcoinname.charAt(0)!=coinname.charAt(0) )
      {
      boxes.push(tempboxname); 
      }
   }
}
function oneboxupleftcross(position,coinname)
{
  
   var i1=position.charAt(0);
   var i2=position.charAt(1);
   if(i1!='a')
   {
    tempboxname=prevchar(i1)+(parseInt(i2)-1).toString();
    tempcoinname=document.getElementsByName(tempboxname)[0].id;

     if(tempcoinname.length > 0 && tempcoinname.charAt(0)!=coinname.charAt(0) )
      {
      boxes.push(tempboxname); 
      }
   }
}
function oneboxuprightcross(position,coinname)
{
    
   var i1=position.charAt(0);
   var i2=position.charAt(1);
   if(i1!='h')
   {
    tempboxname=nextchar(i1)+(parseInt(i2)-1).toString();
    tempcoinname=document.getElementsByName(tempboxname)[0].id;

     if(tempcoinname.length > 0 && tempcoinname.charAt(0)!=coinname.charAt(0) )
      {
      boxes.push(tempboxname); 
      }
   }

}

function horsemovesdownright(position,coinname)
{
	
	 var i1=position.charAt(0);
     var i2=parseInt(position.charAt(1));
      var tempi1;
     for(var i=parseInt(i2)+1;i<=i2+2 && i<=8;i++)
     {
        if(i==i2+1)
        {
           //increment alphabet twice
          tempi1=nextchar(i1); tempi1=nextchar(tempi1);

        }
        else
        {
        	tempi1=nextchar(i1)

        }
        if(tempi1<='h')
        {
        	
            tempboxname=tempi1+i.toString();
        	tempcoinname=document.getElementsByName(tempboxname)[0].id;
        	if(tempcoinname.length==0 || tempcoinname.charAt(0)!=coinname.charAt(0))
        	{
        	
            // it means that the coin is opposite color of current coin and this coin can go there by killing it.
        	boxes.push(tempboxname);

      	    }
        }
     }

}

function horsemovesdownleft(position,coinname)
{
	
	 var i1=position.charAt(0);
     var i2=parseInt(position.charAt(1));
      var tempi1;
     for(var i=parseInt(i2)+1;i<=i2+2 && i<=8;i++)
     {
        if(i==i2+1)
        {
           //decrement alphabet twice
          tempi1=prevchar(i1); tempi1=prevchar(tempi1);

        }
        else
        {
        	tempi1=prevchar(i1)

        }
        if(tempi1>='a')
        {
        	
            tempboxname=tempi1+i.toString();
          
        	tempcoinname=document.getElementsByName(tempboxname)[0].id;
        	if(tempcoinname.length==0 || tempcoinname.charAt(0)!=coinname.charAt(0))
        	{
        	
            // it means that the coin is opposite color of current coin and this coin can go there by killing it.
        	boxes.push(tempboxname);

      	    }
        }
     }

}

function horsemovesupleft(position,coinname)
{
	
	 var i1=position.charAt(0);
     var i2=parseInt(position.charAt(1));
      var tempi1;
     for(var i=parseInt(i2)-1;i>=i2-2 && i>=1;i--)
     {
        if(i==i2-1)
        {
           //decrement alphabet twice
          tempi1=prevchar(i1); tempi1=prevchar(tempi1);

        }
        else
        {
        	tempi1=prevchar(i1)

        }
        if(tempi1>='a')
        {
        	
            tempboxname=tempi1+i.toString();
          
        	tempcoinname=document.getElementsByName(tempboxname)[0].id;
        	if(tempcoinname.length==0 || tempcoinname.charAt(0)!=coinname.charAt(0))
        	{
        	
            // it means that the coin is opposite color of current coin and this coin can go there by killing it.
        	boxes.push(tempboxname);

      	    }
        }
     }

}

function horsemovesupright(position,coinname)
{
	
	 var i1=position.charAt(0);
     var i2=parseInt(position.charAt(1));
      var tempi1;
     for(var i=parseInt(i2)-1;i>=i2-2 && i>=1;i--)
     {
        if(i==i2-1)
        {
           //decrement alphabet twice
          tempi1=nextchar(i1); tempi1=nextchar(tempi1);

        }
        else
        {
        	tempi1=nextchar(i1)

        }
        if(tempi1<='h')
        {
        	
            tempboxname=tempi1+i.toString();
          
        	tempcoinname=document.getElementsByName(tempboxname)[0].id;
        	if(tempcoinname.length==0 || tempcoinname.charAt(0)!=coinname.charAt(0))
        	{
        	
            // it means that the coin is opposite color of current coin and this coin can go there by killing it.
        	boxes.push(tempboxname);

      	    }
        }
     }

}


function updatepositionarray(coinname,boxname)
{

}

