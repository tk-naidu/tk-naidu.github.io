var firebaseConfig = {
    apiKey: "AIzaSyDibg-oYRpVXU9HqCAOLdxIpYXcZUPpAGM",
    authDomain: "geyser-74ddf.firebaseapp.com",
    databaseURL: "https://geyser-74ddf.firebaseio.com",
    projectId: "geyser-74ddf",
    storageBucket: "geyser-74ddf.appspot.com",
    messagingSenderId: "1001903322970",
    appId: "1:1001903322970:web:a904b91e99d67b22"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var database = firebase.firestore();

  function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

  function agentSearch() {
// clear();
var agentID=document.getElementById("plumber").value;
//console.log(bar);
const display=document.querySelector("#display");
var c=0;
database.collection("caseDetails").get().then(function(querySnapshot)
{

  querySnapshot.forEach(function(doc){
    console.log(doc.data());
    if(agentID==doc.data().caseOpenedBy){
        c++;
      console.log("entry foound"
        
        //can add.details to be specific
        );
      var rows = "";
      // rows += "<tr><td>" +...++"</td></tr>";
      rows= "<tr><td>"+doc.data().caseID+"</td><td>"+doc.data().incidentDate
      +"</td><td>"+doc.data().addressOfIncident+"</td><td>"+doc.data().caseStatus+"</td><td>"+doc.data().caseDescription
      +"</td><td>"+doc.data().callerID+"</td><td>"+doc.data().caseOpenedBy +"</td><td>"+doc.data().caseClosedBy+"</td></tr>";
      $( rows ).appendTo( "#itemList tbody" );
    }
  }
  );

  
});
if(c==0)
{
  

}
}




function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
};
