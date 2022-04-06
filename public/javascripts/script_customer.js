const mydata = [
  {
      "forename": "Peter",
      "surname": "Parker",
      "cNumber": "12345"
  },
  {
      "forename": "Jeffrey",
      "surname": "Lebowski",
      "cNumber": "54321"
  },
  {
      "forename": "Jeff",
      "surname": "Bridges",
      "cNumber": "13254"
  },
  {
      "forename": "Uwe",
      "surname": "Boll",
      "cNumber": "36253"
  },
  {
      "forename": "Hermine",
      "surname": "Granger",
      "cNumber": "56342"
  },
  {
      "forename": "Sarah",
      "surname": "Connor",
      "cNumber": "36243"
  },
  {
      "forename": "Dana",
      "surname": "Scully",
      "cNumber": "46253"
  },
  {
      "forename": "Lisa",
      "surname": "Simpson",
      "cNumber": "53412"
  },
  {
      "forename": "Elisabeth",
      "surname": "Swann",
      "cNumber": "32756"
  },
  {
      "forename": "Clarice",
      "surname": "Starling",
      "cNumber": "52436"
  },
  {
      "forename": "James",
      "surname": "Bond",
      "cNumber": "46354"
  },
  {
      "forename": "Jack",
      "surname": "Sparrow",
      "cNumber": "56274"
  },
  {
      "forename": "James",
      "surname": "Kirk",
      "cNumber": "14432"
  },
  {
      "forename": "Marty",
      "surname": "McFly",
      "cNumber": "64525"
  }
]
const searchInput = document.getElementById("navSearch");
const suggestionsPanel = document.getElementById("suggestions");

searchInput.addEventListener('keyup', function(){
    console.log(searchInput.value);
    const input = searchInput.value.toLowerCase();
    suggestionsPanel.innerHTML = '';
    const suggestions = mydata.filter(function(suchInput) {

            if(suchInput.surname.toLowerCase().startsWith(input)){       
              return suchInput.surname.toLowerCase().startsWith(input)}
            else if(suchInput.forename.toLowerCase().startsWith(input)){ 
              return suchInput.forename.toLowerCase().startsWith(input)}
        
    });

  suggestions.forEach(function(suggested){
        const p = document.createElement('p');
        p.innerHTML = suggested.forename + ' ' + suggested.surname;

          suggestionsPanel.appendChild(p);
    });
    if (input === ''){
        suggestionsPanel.innerHTML = '';
    }
}) 



      const s = document.getElementById("submit")
      s.addEventListener('click', function(){
      var nr = number+1
      console.log(nr)
      })

    function myFunction() {
      var y = document.getElementById("output");
      if (y.style.display === "none") {
        y.style.display = "block";
      } else {
        y.style.display = "none";
      }        
      var x = document.getElementById("input");
      if (x.style.display === "none") {
        x.style.display = "flex";
      } else {
        x.style.display = "none";
      }     
    }

    function filmA() {
      var z = document.getElementById("finished");
      if (z.style.display === "none") {
        z.style.display = "block";
      } else {
        z.style.display = "none";
      }
      setTimeout(function() {
        $('#finished').fadeOut('fast');
    }, 800);
    }

    window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
   });