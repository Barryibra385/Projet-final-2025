fetch("https://jsonplaceholder.typicode.com/users")
.then(function (res){
    console.log(res)
    return res.json()
})
 .then(function(data){
    console.log(data)
 })