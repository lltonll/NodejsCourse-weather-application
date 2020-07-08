// console.log('Client side javascript file is loaded!')

// fetch('http://puzzle.mead.io/puzzle').then((response)=> {
//     response.json().then((data)=>{
//         console.log(data)
//     })
    
// })



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    // console.log(location)
    messageOne.textContent = 'Loading'
    messageTwo.textContent = ''
    messageThree.textContent = ''
    // http://localhost:3000/weather?address='+encodeURIComponent(location) this is before heroku
    fetch('/weather?address='+encodeURIComponent(location)).then((response)=> {
        // console.log(encodeURIComponent(location))
        response.json().then((data)=>{
        if(data.error){
            messageOne.textContent = 'Error'
            messageTwo.textContent = data.error
            // console.log(data.error)
        } else {
            messageOne.textContent = 'Right now temperature is ' + data.temperature + 'degrees and UV index is ' + data.uv_index
            messageTwo.textContent = data.feelslike
            messageThree.textContent = 'Request location is ' + data.PlaceName

            // console.log(data.temperature)
            // console.log(data.feelslike)
        } 
    })
})
})