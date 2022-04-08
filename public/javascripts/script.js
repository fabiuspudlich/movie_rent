let movieData = null
let customerData = null
var outputArray = []
var outputForm = []

async function getdata() {
  // Make a request for a user with a given ID
  axios.get('/get_data')
  .then(function (response) {
  // handle success
  console.log(response)
  movieData = response.data.data.movies
  usersData = response.data.data.users
  createMovieSearch(movieData)
  createUsersSearch(usersData)
})
}

function createMovieSearch(movieData) {
  const searchInput = document.getElementById("navSearch")
  const suggestionsPanel = document.getElementById("suggestions")
  const mydata = movieData
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
  customerData = usersData

/*const searchInput = document.getElementById("navSearch")
  const suggestionsPanel = document.getElementById("suggestions")
  const mydata = usersData
  var divID = 0
  let movieID = 0   */
  //  console.log(response.users.value+"mydata")
  
  const customerInput = document.getElementById("customerInput")
  const customerSuggestions = document.getElementById("customerSuggestions")
  
  
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

  // Nav Kundensuche

  const navCustomerInput = document.getElementById("customerSearch")
  const navCustomerSuggestions = document.getElementById("navCustomerSuggestions")
  
  
  navCustomerInput.addEventListener('keyup', function(){
      console.log(navCustomerInput.value)
      const input = navCustomerInput.value.toLowerCase()
      navCustomerSuggestions.innerHTML = ''
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
          navCustomerSuggestions.appendChild(p)
      });
      if (input === ''){
        navCustomerSuggestions.innerHTML = ''
      }
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
     let cSearch = document.getElementById("customerSearch")
     let c = document.getElementById("navCustomerSuggestions")
     search.addEventListener('focus', function(){
      if (search === document.activeElement){
      dim.style.display = "block"
      dimNav.style.display = "block"
      let n = document.getElementById("suggestions")
      n.style.display = "block"      
      } 
     })
     cSearch.addEventListener('focus', function(){
      if (cSearch === document.activeElement){
      dim.style.display = "block"
      dimNav.style.display = "block"
      c.style.display = "block" 
      } 
     })  
   }

  
   function loadPage(){
     console.log("reload")
     let a = document.getElementById("ausgeliehen")
     a.style.display = "block" 
     function reloadPage(){ 
     window.location.reload()
     }
     let timeout = setTimeout(reloadPage, 1700)
   }
   
   dim()

   function undim(){
    let dim = document.getElementById("dim")
    let dimNav = document.getElementById("dimNav")
    let i = document.getElementById("navSearch")
    if(i.style.display === "block"){
      let s = document.getElementById("suggestions")
      s.style.display = "none"
      let c = document.getElementById("navCustomerSuggestions")
      c.style.display = "none"
    }
    let j = document.getElementById("customerSearch")
    if(j.style.display === "block"){
      let c = document.getElementById("navCustomerSuggestions")
      c.style.display = "none"
    }
    dim.style.display = "none"
    dimNav.style.display= "none"
   }

   var style = 0

   function changeStyle(){
    let b = document.body
    let k = document.getElementById("shoppingKartWrapper")
    let m = document.getElementById("navSearch")
    let c = document.getElementById("customerSearch")
    let s = document.getElementById("styleChange")
    let suggest = document.getElementById("suggestions")
    if(style === 0){
      style = 1
      b.style = "width: 100%; height: 100%; margin-top: 0px; background:linear-gradient(rgba(17, 16, 16, 0.5), rgba(0, 0, 0, 0.5)), url(https://media.timeout.com/images/105306356/image.jpg); padding-top: 0px; padding-bottom: 0px; margin-left: 0; background-position: center center; background-attachment: fixed; background-size: cover; background-repeat: no-repeat; background-color: rgb(56, 54, 54);"
      k.style.display = "none"
      c.style.display = "block"
      m.style.display = "none"
      s.innerHTML = "Filme"
      suggest.style.display = "none"
    } else {
      style = 0
      b.style = "width: 100%; height: 100%; margin-top: 0px; background:linear-gradient(rgba(17, 16, 16, 0.5), rgba(0, 0, 0, 0.5)), url(https://i.imgur.com/jrEFD1z.jpeg); padding-top: 0px; padding-bottom: 0px; margin-left: 0; background-position: center center; background-attachment: fixed; background-size: cover; background-repeat: no-repeat; background-color: rgb(56, 54, 54);"
      k.style.display = "block"
      c.style.display = "none"
      m.style.display = "block"
      s.innerHTML = "Kunden"  
    }
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