document.getElementById('home').style.visibility="visible";
list=["buttons","welcome","pin","depo","balan","cash","balac","with","pass"];
for (i=0;i<list.length;i++)
  {
  document.getElementById(list[i]).style.visibility="hidden";
  }
var j="";
var name="";
var pass=["3215","4312","5321","5312","7654","9870","7685","1243","1534","1432","1743","1876","1234"];
var user=["David","Basheer","Bharath","Vijay","Shahinsha","MariYappan","Prakash","Pari Pukhazhenthi","Sivaram","MadhuRamanathan","Rajalingam","Mohana Kavitha","Mrs.Santhi"];
var cas={
  "David":"1000",
  "Basheer":"2500",
  "Bharath":"1500",
  "Vijay":"1000",
  "Shahinsha":"800",
  "MariYappan":"1200",
  "Prakash":"900",
  "Pari Pukhazhenthi":"2000",
  "Sivaram":"3000",
  "MadhuRamanathan":"3000",
  "Rajalingam":"2500",
  "Mohana Kavitha":"5000",
  "Mrs.Santhi":"10000",
}
function pin()
{ 
  var a =document.getElementById('pn').value;
  if (obj[a]!=undefined)
    {
document.getElementById("welcome").style.visibility="visible";
  document.getElementById("pin").style.visibility="hidden";
document.getElementById("we").style.visibility="hidden";
document.getElementById("name").innerHTML=obj[a];     
name=obj[a];   document.getElementById('buttons').style.visibility="visible";
document.getElementById('log').style.visibility="visible";
  document.getElementById('pass').style.visibility="visible";
  document.getElementById("pin").style.visibility="hidden";
    }
  else
    {
      alert("Please Give A Correct Pin")
    }
}
function atm()
{
  document.getElementById("pn").value="";
  var a=["pin","we","home","atm","buttons","welcome","submi","back","pass","money","with","depo","balan","balac","password"];
  for (i=0;i<a.length;i++)
    {
      if (i<2)
        {
document.getElementById(a[i]).style.visibility="visible";
        }
      else
        {
     document.getElementById(a[i]).style.visibility="hidden";
        }
    }
}
function bank(a)
{
  var c=["welcome","buttons","cash","money","welcome",a,"back","submi"];
  for (i=0;i<c.length;i++)
    {
     if (i<3)
     {
  document.getElementById(c[i]).style.visibility="hidden";
     }
      else
      {     document.getElementById(c[i]).style.visibility="visible";
      }
    }
 if (a=="balan")
   {
document.getElementById("balac").style.visibility="visible";
  document.getElementById("money").style.visibility="hidden";
 document.getElementById("submi").style.visibility="hidden";
document.getElementById("balac").innerHTML="Rs."+cas[name];
   }
  else if (a=="pass")
    {
      document.getElementById("money").style.visibility="hidden";
  document.getElementById("cash").innerHTML+="<input type='password' maxlength='4' id='password'></input>";     document.getElementById("password").style.visibility="visible";
    }
 j=a;
}
function sub()
{
  var g=Number(document.getElementById("money").value);
 var h=Number(cas[name]);
  if (j=="with")
    {
      if ((h>g)&&(g>0))
        {
          var to=h-g;
        cas[name]=to;
          alert("Take Your Money Rs."+g)
            bac();
        }
     else
        {
         alert("You Have low Amount Than Your Need");
        }
      
    }
 else if (j=="depo")
   {
    var to=Number(h)+Number(g);
     cas[name]=to;
     alert("Deposited Rs."+g+" SuccessFully")
       bac();
   }
  else if (j=="pass")
    {
      var i=document.getElementById("password").value;
      if ((Number(i)>999)&&(Number(i)<10000)&&(pass.indexOf(i)==-1))
        {
          var e=user.indexOf(name);
          pass[e]=i;
          pas();
          bac();
        }
      else
       {
         alert("Please Give a Correct Password")
       }
    }
}
function back()
{ 
  var d=["welcome","buttons",j,"cash","balac","back","submi","money","password"];
  for (i=0;i<d.length;i++)
    {
      if (i<2)
        {
  document.getElementById(d[i]).style.visibility="visible";
        }
else
  {
 document.getElementById(d[i]).style.visibility="hidden";
  }
    }
}
function bac()
{
  var c=["submi","with","back","depo","money","welcome","buttons","pin","pass","cash","atm","we","home"];
     for (i=0;i<c.length;i++)
       {      
         if (i<10)
           {
  document.getElementById(c[i]).style.visibility="hidden";
           }
         else
           {    
 document.getElementById(c[i]).style.visibility="visible";
           }
        }
  document.getElementById("password").style.visibility="hidden";
  document.getElementById("password").value="";
  document.getElementById("money").innerHTML="";
}
var obj;
function pas()
{ obj={};
  for (i=0;i<pass.length;i++)
    {
      obj[pass[i]]=user[i];
     }
}
pas();
at();
function at()
{
  setInterval(bac,50000)
}