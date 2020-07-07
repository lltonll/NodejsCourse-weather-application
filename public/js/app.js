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


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    // console.log(location)
    messageOne.textContent = 'Loading'
    messageTwo.textContent = ''
    fetch('http://localhost:3000/weather?address='+encodeURIComponent(location)).then((response)=> {
        // console.log(encodeURIComponent(location))
        response.json().then((data)=>{
        if(data.error){
            messageOne.textContent = 'Error'
            messageTwo.textContent = data.error
            // console.log(data.error)
        } else {
            messageOne.textContent = data.temperature
            messageTwo.textContent = data.feelslike
            // console.log(data.temperature)
            // console.log(data.feelslike)
        } 
    })
})
})