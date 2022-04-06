let movieData = null
let customerData = null
var outputArray = []
var outputForm = []


function createMovieSearch(movieData) {
  const searchInput = document.getElementById("navSearch")
  const suggestionsPanel = document.getElementById("suggestions")
  const mydata = response.data.data.movies
  const customerInput = document.getElementById("customerInput")
  const customerSuggestions = document.getElementById("customerSuggestions")
  var divID = 0
  let movieDivID = 0
  console.log(outputForm)
  
  searchInput.addEventListener('keyup', function() {
      console.log(searchInput.value)
      const input = searchInput.value.toLowerCase()
      suggestionsPanel.innerHTML = ''
      const suggestions = mydata.filter(function(suchInput) {
        if(suchInput.title.toLowerCase().startsWith(input)){       
          return suchInput.title.toLowerCase().startsWith(input)}      
    });
  
    suggestions.forEach(function(suggested) {
          divID++
          t = suggested.title+' '+suggested.price
          const p = document.createElement('p')
          if(suggested.available<1){
            p.innerHTML = suggested.title+" (LEER)"
          } else{
          p.innerHTML = suggested.title}
  
          p.addEventListener('click', function(){
            showWindow()
            undim()
            console.log('KLICK')
            suggestionsPanel.textContent=''
            let i = document.getElementById("inputMovies")
            let wrapper = document.createElement("div")
            wrapper.setAttribute("id", 'div'+divID)
          /*  let div = document.getElementById("div"+divID) */
              let m = document.createElement("p")
              m.innerHTML = 'Titel: '+suggested.title+' | Verfügbar: '+suggested.available+' | Preis: '+suggested.price
              var b = document.createElement("button")           
              b.innerHTML = '+'
  
              b.addEventListener('click', function(){
                movieDivID++ 
                let t = suggested.title
                console.log(t)
                let k = document.getElementById("setMovies")
                  let selectedMovie = document.createElement("div")
                  selectedMovie.setAttribute("id", 'movieDiv'+movieDivID)

                outputForm.splice(movieDivID, 0, suggested.movieID)
                console.log(outputForm)
                
                let button = document.createElement("button")                  
                button.innerHTML = '-'
                button.setAttribute("id", 'buttonID'+movieDivID)
                button.setAttribute("value", movieDivID)
                button.setAttribute("onclick", 'removeMovie(this.value)')
                let movie = document.createElement('p')
                movie.setAttribute("id", 'movie'+movieDivID)
                movie.innerHTML = t
                k.appendChild(selectedMovie)
                selectedMovie.appendChild(movie)
                selectedMovie.appendChild(button)                                                 
              })
  
            console.log(suggested.title)
            i.appendChild(wrapper)  
            wrapper.appendChild(m)
            wrapper.appendChild(b)
            
          })
  
          suggestionsPanel.appendChild(p)
      })
      
      if (input === ''){
          suggestionsPanel.innerHTML = ''
      }
  }) 

}

function createUsersSearch(usersData) {
  // handle success
  customerData = response.data.data.users

  const searchInput = document.getElementById("navSearch")
  const suggestionsPanel = document.getElementById("suggestions")
  const mydata = usersData
  //  console.log(response.users.value+"mydata")
  const customerInput = document.getElementById("customerInput")
  const customerSuggestions = document.getElementById("customerSuggestions")
  var divID = 0
  let movieID = 0
  
  customerInput.addEventListener('keyup', function(){
      console.log(customerInput.value)
      const input = customerInput.value.toLowerCase()
      customerSuggestions.innerHTML = ''
      const suggestions = customerData.filter(function(suchInput) {
  
            if(suchInput.surname.toLowerCase().startsWith(input)){       
              return suchInput.surname.toLowerCase().startsWith(input)}
            else if(suchInput.forename.toLowerCase().startsWith(input)){ 
              return suchInput.forename.toLowerCase().startsWith(input)}
            else if(suchInput.cNumber.toLowerCase().startsWith(input)){ 
              return suchInput.cNumber.toLowerCase().startsWith(input)}
          
      });
  
    suggestions.forEach(function(suggested){
          const p = document.createElement('p')
          p.innerHTML = suggested.forename + ' ' + suggested.surname
  
          p.addEventListener('click', function(){
            let c = document.getElementById("setCustomer")
            let s = document.getElementById("customerSuggestions")
            s.textContent=''
            c.innerHTML = 'Kunde: '+suggested.surname+' '+suggested.cNumber 
          })   
          customerSuggestions.appendChild(p)
      });
      if (input === ''){
        customerSuggestions.innerHTML = ''
      }
  })

}

async function getdata() {
    // Make a request for a user with a given ID
    axios.get('/get_data')
    .then(function (response) {
    // handle success
    console.log(response)
    movieData = response.movies
    usersData = response.users
    createMovieSearch(movieData)
    createUsersSearch(usersData)
  })
}

    function removeMovie(val) {  
              let r = document.getElementById('movieDiv'+val)
              console.log("Value: "+val)
            
              outputForm.splice(val-1, 1, "")
              console.log("outputForm: "+outputForm)          
              r.remove()
    }

    

    window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed')
    getdata();
   });

   function kartView(){
     let k = document.getElementById("shoppingKart")
     if (k.style.marginRight === "0px"){
       k.style.marginRight = "-200px"
     } else {
      k.style.marginRight = "-0px"
     }
   }

   function showWindow(){
     let movieWindow = document.getElementById("input")
     if(movieWindow.style.display === "none"){
      movieWindow.style.display = "flex"
     }
   }

   function dim(){
     let dim = document.getElementById("dim")
     let dimNav = document.getElementById("dimNav")
     let search = document.getElementById("navSearch")
     search.addEventListener('focus', function(){
      if (search === document.activeElement){
      dim.style.display = "block"
      dimNav.style.display = "block"
      } 
     })
   }

   dim()

   function undim(){
    let dim = document.getElementById("dim")
    let dimNav = document.getElementById("dimNav")
    dim.style.display = "none"
    dimNav.style.display= "none"
   }

   function saveData(){
    outputArray = outputForm.filter(Number)               
    output.value = outputArray
    let o = document.getElementById("output").value
 /*   o.value */
    axios.post('/save_movies', {
      o: output.value
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
   }