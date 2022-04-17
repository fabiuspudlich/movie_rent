let movieData = null
let customerData = null
var outputArray = []
var outputForm = []
var inputCounter = 0
var panelArray = []
var genreArray = []
var divID = 0
var movieDivID = 0
var TestCounter = 0
var tableID = 0
var customerOutputArray = []
var tableTitle = ""


async function getdata() {
  console.log("getting data...")
  axios.get('/get_data')
  .then(function (response) {
  // handle success
  console.log(response)
  movieData = response.data.data.movies
  usersData = response.data.data.users
  createMovieSearch(movieData)
  createUsersSearch(usersData)
  createSuggestions(movieData)
})
}



function createSuggestions(movieData) {
  let i = movieData
  let l = i.length
  let actionNR = 0
  let dramaNR = 0
  let scifiNR = 0
  let action = [document.getElementById("suggestionsTop1"), document.getElementById("suggestionsTop2"), document.getElementById("suggestionsTop3")]
  let drama = [document.getElementById("suggestionsMiddle1"), document.getElementById("suggestionsMiddle2"), document.getElementById("suggestionsMiddle3")]
  let scifi = [document.getElementById("suggestionsBottom1"), document.getElementById("suggestionsBottom2"), document.getElementById("suggestionsBottom3")]
  for(let j=0; j < l; j++){  
    if(i[j].genre === "action" && actionNR<3 ){
      let t = Array.prototype.slice.call(action[actionNR].children)
      let p = document.createElement('p')
      p.innerHTML = i[j].title
      let title = i[j].title
      action[actionNR].addEventListener("click", function(){movieSuggestionSearch(title), stateTwo()})
      t[0].appendChild(p)   
      action[actionNR].setAttribute("style", 'background-image: url('+i[j].image+');')
      actionNR++
    } else if(i[j].genre === "drama" && dramaNR<3 ){
      let t = Array.prototype.slice.call(drama[dramaNR].children)
      let p = document.createElement('p')
      p.innerHTML = i[j].title
      let title = i[j].title
      drama[dramaNR].addEventListener("click", function(){movieSuggestionSearch(title), stateTwo()})
      t[0].appendChild(p)    
      drama[dramaNR].setAttribute("style", 'background-image: url('+i[j].image+');')
      dramaNR++
    } else if(i[j].genre === "scifi" && scifiNR<3 ){ 
      let t = Array.prototype.slice.call(scifi[scifiNR].children)
      let p = document.createElement('p')
      p.innerHTML = i[j].title
      let title = i[j].title
      scifi[scifiNR].addEventListener("click", function(){movieSuggestionSearch(title), stateTwo()})
      t[0].appendChild(p) 
      scifi[scifiNR].setAttribute("style", 'background-image: url('+i[j].image+');')
      scifiNR++
    }
      
  }
}




function createInputSuggestions(suggested, movieData, inputCounter, panelArray, genreArray){
      let s = suggested
   //   let m = movieData
   //   let l = m.length
      panelArray.push(suggested.title)
      let panelContentOne = 0
      let panelContentTwo = 1
      let panelContentThree = 2
      var suggestionPanels = [document.getElementById("suggestionsResults1"), document.getElementById("suggestionsResults2"), document.getElementById("suggestionsResults3")]


      if(inputCounter>1){
        
        suggestionPanels[0].removeChild(suggestionPanels[0].firstElementChild)
        suggestionPanels[1].removeChild(suggestionPanels[1].firstElementChild)
        suggestionPanels[2].removeChild(suggestionPanels[2].firstElementChild)
      }
      if(inputCounter <4 ){
        console.log("inputCounter<4")
        let p1 = document.createElement('li')
        let p2 = document.createElement('li')
        let p3 = document.createElement('li')

      let i = movieData
      let l = movieData.length
      let inputGenreNR = 0
      for(let j=0; j < l; j++){
      if(i[j].genre === suggested.genre && inputGenreNR < 3 ){        
          inputGenreNR++
        if(suggested.title != i[j].title){
          let g = []
          g = i[j]
          let keys = Object.keys(g)
          let values = keys.map(function(key) {
            return g[key]
          })
          genreArray.unshift(values[0], values[5])      
        } else{inputGenreNR--}     
          p1.innerHTML = genreArray[0]
          suggestionPanels[panelContentOne].style.backgroundImage = "linear-gradient(rgba(17, 16, 16, 0.5), rgba(0, 0, 0, 0.5)), url('"+genreArray[1]+"')"    
          p2.innerHTML = genreArray[2]
          suggestionPanels[panelContentTwo].style.backgroundImage = "linear-gradient(rgba(17, 16, 16, 0.5), rgba(0, 0, 0, 0.5)), url('"+genreArray[3]+"')"         
          p3.innerHTML = genreArray[4]
          suggestionPanels[panelContentThree].style.backgroundImage = "linear-gradient(rgba(17, 16, 16, 0.5), rgba(0, 0, 0, 0.5)), url('"+genreArray[5]+"')"         
      }              
    }
        suggestionPanels[panelContentOne].addEventListener("click", function(){movieSuggestionSearch(genreArray[0])})
        suggestionPanels[panelContentTwo].addEventListener("click", function(){movieSuggestionSearch(genreArray[2])})
        suggestionPanels[panelContentThree].addEventListener("click", function(){movieSuggestionSearch(genreArray[4])})
        suggestionPanels[panelContentOne].appendChild(p1)
        suggestionPanels[panelContentTwo].appendChild(p2)
        suggestionPanels[panelContentThree].appendChild(p3)
    }
      if(inputCounter >3 ){
        console.log("inputCounter>3")
        suggestionPanels[panelContentOne].removeEventListener("click", function(){movieSuggestionSearch(genreArray[0])})
        suggestionPanels[panelContentTwo].removeEventListener("click", function(){movieSuggestionSearch(genreArray[2])})
        suggestionPanels[panelContentThree].removeEventListener("click", function(){movieSuggestionSearch(genreArray[4])})
        let p1 = document.createElement('li')
        let p2 = document.createElement('li')
        let p3 = document.createElement('li')
        p1.innerHTML = panelArray[panelArray.length-2]
        for(let e=0; e<movieData.length; e++){
          if(movieData[e].title === panelArray[panelArray.length-2]){
            var p1image = movieData[e].image 
            var p1title = movieData[e].title          
            suggestionPanels[panelContentOne].style.backgroundImage = "linear-gradient(rgba(17, 16, 16, 0.5), rgba(0, 0, 0, 0.5)), url('"+p1image+"')"           
          }
        }      
        p2.innerHTML = panelArray[panelArray.length-3]
        for(let e=0; e<movieData.length; e++){
          if(movieData[e].title === panelArray[panelArray.length-3]){
            var p2image = movieData[e].image 
            var p2title = movieData[e].title
            suggestionPanels[panelContentTwo].style.backgroundImage = "linear-gradient(rgba(17, 16, 16, 0.5), rgba(0, 0, 0, 0.5)), url('"+p2image+"')"           
          }
        }
        p3.innerHTML = panelArray[panelArray.length-4]
        for(let e=0; e<movieData.length; e++){
          if(movieData[e].title === panelArray[panelArray.length-4]){
            var p3image = movieData[e].image 
            var p3title = movieData[e].title
            suggestionPanels[panelContentThree].style.backgroundImage = "linear-gradient(rgba(17, 16, 16, 0.5), rgba(0, 0, 0, 0.5)), url('"+p3image+"')"           
          }
        }        
    //    suggestionPanels[panelContentOne].addEventListener("click", function(){movieSuggestionSearch(p1title)})
    //    suggestionPanels[panelContentTwo].addEventListener("click", function(){movieSuggestionSearch(p2title)})
    //    suggestionPanels[panelContentThree].addEventListener("click", function(){movieSuggestionSearch(p3title)})
        suggestionPanels[panelContentOne].appendChild(p1)
        suggestionPanels[panelContentTwo].appendChild(p2)
        suggestionPanels[panelContentThree].appendChild(p3)
      }
}

function movieSuggestionSearch(){ 
    TestCounter++
    inputCounter++
    divID++
    let i = arguments[0] 
    let m = movieData
    
    console.log("movieSuggestionSearchArgument "+i) 
    for(j=0; j < m.length; j++){
      let title = m[j].title
      if(title === i){       
        var suggestedImage = m[j].image
        var suggestedTitle = m[j]
        var suggested = suggestedTitle
        var suggestedPrice = m[j].price
        var suggestedAvailable = m[j].available
        console.log(suggestedTitle, suggestedPrice, suggestedAvailable, suggestedImage)
      }
    }  
            
        let s = document.getElementById("inputSuggestion")
        s.innerHTML = ''
        showWindow()
        hideMovieSuggestions()
        showMainResults()
        createInputSuggestions(suggested, movieData, inputCounter, panelArray, genreArray)
        // create new main result
            let inputSuggestion = document.getElementById("inputSuggestion")
            let wrapper = document.createElement("div")
            wrapper.setAttribute("id", 'div'+divID)
              let imageWrapper = document.createElement('div')
              imageWrapper.setAttribute("id", 'imageWrapper')
              inputSuggestion.setAttribute("style", 'background-image: linear-gradient(rgba(17, 16, 16, 0.5), rgba(0, 0, 0, 0.5)), url('+suggested.image+');')
              inputSuggestion.appendChild(imageWrapper)
              let imageWrapperP = document.createElement("p")
              imageWrapperP.innerHTML = 'Titel: '+suggested.title+' | Verfügbar: '+suggested.available+' | Preis: '+suggested.price
              var imageWrapperB = document.createElement("button")   
              imageWrapperB.setAttribute("cursor", 'pointer')        
              imageWrapperB.innerHTML = '+'
              imageWrapperB.addEventListener('click', function(){
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
          inputSuggestion.appendChild(wrapper) 
          imageWrapper.appendChild(imageWrapperP)
          imageWrapper.appendChild(imageWrapperB)     

          console.log("TEST :"+TestCounter)
}


function createMovieSearch(movieData) {
  const searchInput = document.getElementById("navSearch")
  const suggestionsPanel = document.getElementById("suggestions")
  const mydata = movieData
  const customerInput = document.getElementById("customerInput")
  const customerSuggestions = document.getElementById("customerSuggestions")
  
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
            console.log("KLICK")
            inputCounter++
            createInputSuggestions(suggested, movieData, inputCounter, panelArray, genreArray)
            let s = document.getElementById("inputSuggestion")
            s.innerHTML = ''
            showWindow()
            undim()
            hideMovieSuggestions()
            stateTwo()
            showMainResults()
            suggestionsPanel.textContent=''
            let i = document.getElementById("inputSuggestion")
            let wrapper = document.createElement("div")
            wrapper.setAttribute("id", 'div'+divID)
              let imageWrapper = document.createElement('div')
              imageWrapper.setAttribute("id", 'imageWrapper')
              let inputSuggestion = document.getElementById("inputSuggestion")
              inputSuggestion.setAttribute("style", 'background-image: linear-gradient(rgba(17, 16, 16, 0.5), rgba(0, 0, 0, 0.5)), url('+suggested.image+');')
              i.appendChild(imageWrapper)
              let m = document.createElement("p")
              m.innerHTML = 'Titel: '+suggested.title+' | Verfügbar: '+suggested.available+' | Preis: '+suggested.price
              var b = document.createElement("button")   
              b.setAttribute("cursor", 'pointer')        
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
            i.appendChild(wrapper) 
          imageWrapper.appendChild(m)
          imageWrapper.appendChild(b)     
          })  
          suggestionsPanel.appendChild(p)
      })  
      if (input === ''){
          suggestionsPanel.innerHTML = ''
      }
  }) 
}
/*  
function createSuggestionMovieSearch(movieData){
  const suggestion = movieData
  console.log(searchInput.value)
  const input = searchInput.value.toLowerCase()
  const movieSuggestion = mydata.filter(function(suchInput) {
    if(suchInput.title.toLowerCase().startsWith(input)){       
      return suchInput.title.toLowerCase().startsWith(input)}      
});

   movieSuggestion.forEach(function(suggested) {

   }
} */

function fillCustomerOutputArray(suggested, newID){
  console.log(newID)
  console.log(suggested)
  customerOutputArray[newID] = suggested.rentedMovies[newID]
  console.log(customerOutputArray)
}

function unfillCustomerOutputArray(newID){
  console.log(newID)
  customerOutputArray[newID] = null
  console.log(customerOutputArray)
}

function wipeList(){
  console.log("wipeList")
  let i = document.getElementById("customerMovies")
  console.log(i)
  while(i.hasChildNodes()){
    i.removeChild(i.firstChild);

  }
}

function createCustomerResults(suggested){
  wipeList()
  stateFour()
  tableID = 0
  customerOutputArray = []
  let customerInfo = document.getElementById("customerInfo")
  customerInfo.innerHTML = suggested.forename + ' ' + suggested.surname + ' ' + suggested.cNumber
 
  let returnArray = []

  console.log("suggested.rentedMovies.length"+suggested.rentedMovies.length)
  let table = document.getElementById("customerMovies")

  let th1 = document.createElement("th")
  th1.innerHTML = "Filme"
  let th2 = document.createElement("th")
  th2.innerHTML = "ID"
  let th3 = document.createElement("th")
  th3.innerHTML = "Ausleihdatum"
  let th4 = document.createElement("th")
  th4.innerHTML = "Rückgabe"

  table.appendChild(th1)
  table.appendChild(th2)
  table.appendChild(th3)
  table.appendChild(th4)

  for(let i=0; i < suggested.rentedMovies.length; i++){    
    console.log(suggested.rentedMovies.length)
    console.log("Kunden Filme Schleife")
  
  let newTableRow = document.createElement('tr')
    newTableRow.setAttribute("id", 'tableRow'+tableID)
  let newtd1 = document.createElement("td")    
    for(let i=0; i<movieData.length; i++){
      if(movieData[i].movieID == suggested.rentedMovies[tableID]){
        tableTitle = movieData[i].title               
      }
    }
    newtd1.innerHTML = tableTitle
    let newtd2 = document.createElement("td")
    newtd2.innerHTML = suggested.rentedMovies[tableID]
    let newtd3 = document.createElement("td")
    newtd3.innerHTML = suggested.rentTime
    let newtd4 = document.createElement("input")
    newtd4.setAttribute("type", 'checkbox')
    newtd4.setAttribute("id", 'checkbox'+tableID)
    const newID = tableID
    newtd4.addEventListener('change', function(){
      if(this.checked){        
        fillCustomerOutputArray(suggested, newID)
        console.log("CHECKED"+newID)
      }else{        
        unfillCustomerOutputArray(newID)
        console.log("UNCHECKED"+newID)
      }      
    })
  table.appendChild(newTableRow)
  newTableRow.appendChild(newtd1)
  newTableRow.appendChild(newtd2)
  newTableRow.appendChild(newtd3)
  newTableRow.appendChild(newtd4)
  tableID++
 }
// console.log(tableID)
 console.log(customerOutputArray)
 console.log(returnArray)

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
            let addCustomerWrapper = document.getElementById("addCustomerWrapper")
            addCustomerWrapper.style.display = "none"
            let customerResults = document.getElementById("customerResults")
            customerResults.style.display = "flex"
            console.log("Customer KLICK")
            createCustomerResults(suggested)
         //    let i = document.getElementById("userInput")
         //    let j = document.getElementById("inputUsers")
         //    i.style.display = "flex"
         //    j.innerHTML = suggested.forename + ' ' + suggested.surname + ' ' + suggested.cNumber + ' ' + suggested.rentedMovies + ' ' + suggested.rentTime
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
       k.style.marginRight = "-220px"
     } else {
      k.style.marginRight = "-0px"
     }
   }

   function showWindow(){
     let movieWindow = document.getElementById("inputSuggestion")
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
     let i = document.getElementById("shoppingKartWrapper")
     i.style.display = "none"
     let j = document.getElementById("mainResults")
     j.style.display = "none"
     console.log("reload")
     let a = document.getElementById("ausgeliehen")
     a.style.display = "block" 
     function reloadPage(){ 
     window.location.reload()
     }
     let timeout = setTimeout(reloadPage, 1700)
   }

   function hideMovieSuggestions(){
     let i = document.getElementById("movieSuggestions")
     i.style.display = "none"
  //   let j = document.getElementById("mainpage")
  //   j.style.display = "none"
   }

   function hideCustomerSuggestions(){
    let i = document.getElementById("navCustomerSuggestions")
    i.style.display = "none"
  //  let j = document.getElementById("mainpage")
  //  j.style.display = "none"
  }

   function showMovieSuggestions(){
    let i = document.getElementById("movieSuggestions")
    i.style.display = "flex"
    let j = document.getElementById("mainResults")
    j.style.display = "none"
    let k = document.getElementById("mainpage")
    k.style.display = "flex"
    let c = document.getElementById("customerResults")
    c.style.display = "none"
    let customerCreator = document.getElementById("addCustomerWrapper")
    customerCreator.style.display = "none"
    let style = 1
    changeStyle(style)
   }

   function showMainResults(){
     let i = document.getElementById("mainResults")
     i.style.display= "flex"
   }

   function showCustomerCreator(){
    let customerCreator = document.getElementById("addCustomerWrapper")
    customerCreator.style.display = "flex"
    let startSuggestions = document.getElementById("mainpage")
    startSuggestions.style.display = "none"
    let customerResults = document.getElementById("customerResults")
    customerResults.style.display = "none"
    let body = document.body

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

   // Start Results State

 function stateOne(){
  let mainpage = document.getElementById("mainpage")
  mainpage.style.display = "flex"
  let mainResults = document.getElementById("mainResults")
  mainResults.style.display = "none"
  let customerResults = document.getElementById("customerResults")
  customerResults.style.display = "none"
  let addCustomerWrapper = document.getElementById("addCustomerWrapper")
  addCustomerWrapper.style.display = "none"
  let body = document.body
  body.style = "width: 100%; height: 100%; margin-top: 0px; background:linear-gradient(rgba(17, 16, 16, 0.5), rgba(0, 0, 0, 0.5)), url(https://duofischbach.ch/wp-content/uploads/2016/05/Movie-Theater-Wallpaper-2016.jpg); padding-top: 0px; padding-bottom: 0px; margin-left: 0; background-position: center center; background-attachment: fixed; background-size: cover; background-repeat: no-repeat; background-color: rgb(56, 54, 54);"
}

// Movie Results State 

function stateTwo(){
 let mainpage = document.getElementById("mainpage")
 mainpage.style.display = "none"
 let mainResults = document.getElementById("mainResults")
 mainResults.style.display = "flex"
 let customerResults = document.getElementById("customerResults")
 customerResults.style.display = "none"
 let addCustomerWrapper = document.getElementById("addCustomerWrapper")
 addCustomerWrapper.style.display = "none"
 let body = document.body
 body.style = "width: 100%; height: 100%; margin-top: 0px; background:linear-gradient(rgba(17, 16, 16, 0.5), rgba(0, 0, 0, 0.5)), url(https://duofischbach.ch/wp-content/uploads/2016/05/Movie-Theater-Wallpaper-2016.jpg); padding-top: 0px; padding-bottom: 0px; margin-left: 0; background-position: center center; background-attachment: fixed; background-size: cover; background-repeat: no-repeat; background-color: rgb(56, 54, 54);"
}

// New Customer State

function stateThree(){
 let mainpage = document.getElementById("mainpage")
 mainpage.style.display = "none"
 let mainResults = document.getElementById("mainResults")
 mainResults.style.display = "none"
 let customerResults = document.getElementById("customerResults")
 customerResults.style.display = "none"
 let addCustomerWrapper = document.getElementById("addCustomerWrapper")
 addCustomerWrapper.style.display = "flex"
 let body = document.body
 body.style = "width: 100%; height: 100%; margin-top: 0px; background:linear-gradient(rgba(17, 16, 16, 0.5), rgba(0, 0, 0, 0.5)), url(https://media.timeout.com/images/105306356/image.jpg); padding-top: 0px; padding-bottom: 0px; margin-left: 0; background-position: center center; background-attachment: fixed; background-size: cover; background-repeat: no-repeat; background-color: rgb(56, 54, 54);"
}

// Customer Results State

function stateFour(){
let mainpage = document.getElementById("mainpage")
mainpage.style.display = "none"
let mainResults = document.getElementById("mainResults")
mainResults.style.display = "none"
let customerResults = document.getElementById("customerResults")
customerResults.style.display = "flex"
let addCustomerWrapper = document.getElementById("addCustomerWrapper")
addCustomerWrapper.style.display = "none"
let body = document.body
body.style = "width: 100%; height: 100%; margin-top: 0px; background:linear-gradient(rgba(17, 16, 16, 0.5), rgba(0, 0, 0, 0.5)), url(https://media.timeout.com/images/105306356/image.jpg); padding-top: 0px; padding-bottom: 0px; margin-left: 0; background-position: center center; background-attachment: fixed; background-size: cover; background-repeat: no-repeat; background-color: rgb(56, 54, 54);"
}

// Switch Customer / Moviesearch

function changeStyle(){
let m = document.getElementById("navSearch")
let c = document.getElementById("customerSearch")
let s = document.getElementById("styleChange")

if(s.innerHTML == "Kundensuche"){
 m.style.display = "none"
 c.style.display = "block"
 s.innerHTML = "Filmsuche"
} else{
 m.style.display = "block"
 c.style.display = "none"
 s.innerHTML = "Kundensuche"
}
}

   var style = 0
/*
   function changeStyle(){
    let b = document.body
    let k = document.getElementById("shoppingKartWrapper")
    let m = document.getElementById("navSearch")
    let c = document.getElementById("customerSearch")
    let s = document.getElementById("styleChange")
    let suggest = document.getElementById("suggestions")
    let input = document.getElementById("inputSuggestionsWrapper")
    let inputMovies = document.getElementById("inputSuggestion")
    let addCustomerWrapper = document.getElementById("addCustomerWrapper")
 //   let userInput = document.getElementById("userInput")
 //   let inputUsers = document.getElementById("inputUsers")
    let mainpage = document.getElementById("mainpage")
    let mainResults = document.getElementById("mainResults")
    let logoWrapper = document.getElementById("logoWrapper")
    let customerResults = document.getElementById("customerResults")
    console.log(inputMovies.innerHTML)
    if(style === 0){
      style = 1
      b.style = "width: 100%; height: 100%; margin-top: 0px; background:linear-gradient(rgba(17, 16, 16, 0.5), rgba(0, 0, 0, 0.5)), url(https://media.timeout.com/images/105306356/image.jpg); padding-top: 0px; padding-bottom: 0px; margin-left: 0; background-position: center center; background-attachment: fixed; background-size: cover; background-repeat: no-repeat; background-color: rgb(56, 54, 54);"
    //  k.style.display = "none"
      c.style.display = "block"
      m.style.display = "none"
      s.innerHTML = "Filme"
      customerResults.style.display = "none"
      mainResults.style.display = "none"
      addCustomerWrapper.style.display = "none"
      if(s.innerHTML === "Filme"){
        logoWrapper.setAttribute("onclick", 'stateOne()')
      }
      suggest.style.display = "none"
      input.style.display = "none"
      mainpage.style.display = "none"
      } 

      else {
      style = 0
      b.style = "width: 100%; height: 100%; margin-top: 0px; background:linear-gradient(rgba(17, 16, 16, 0.5), rgba(0, 0, 0, 0.5)), url(https://duofischbach.ch/wp-content/uploads/2016/05/Movie-Theater-Wallpaper-2016.jpg); padding-top: 0px; padding-bottom: 0px; margin-left: 0; background-position: center center; background-attachment: fixed; background-size: cover; background-repeat: no-repeat; background-color: rgb(56, 54, 54);"
      k.style.display = "block"
      c.style.display = "none"
      m.style.display = "block"
      s.innerHTML = "Kunden"
      customerResults.style.display = "none"
      mainResults.style.display = "none"
      addCustomerWrapper.style.display = "none"
      if(s.innerHTML === "Kunden"){
        logoWrapper.setAttribute("onclick", 'showMovieSuggestions()')
      }
     // userInput.style.display = "none"
     // mainpage.style.display = "flex"
      if(inputMovies.innerHTML === ""){
      input.style.display = "none"
      }  
      else{
        input.style.display = "flex"}
    }
   }  */

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

   function saveCustomerData(){
     console.log("saveCustomerData")
   }

  