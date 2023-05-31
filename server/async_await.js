const axios = require ('axios');

// we declare the function as async   

//async function oneAfterAnother(startingVal) {
//     const firstResult = await firstFunc(startingVal);
//     const secondResult = await secondFunc(firstResult);
//     return secondResult;
// }
// or 
// async function oneAfterAnother() {
//     try {
//         const firstResult = await firstFunc();
//         const secondResult = await secondFunc(firstResult);
//         return secondResult;
//     } catch(err) {
//         // do something with the error here
//     }
// }
async function fetchData(){
    try{
        const response  = await axios.get('https://api.example.com/data');
        // it means ok wait until we get data from axios and then go to console.log
        console.log(response.data)
    }
    catch(error){
        console.error('Error fetching data: ', error);
    }
}
fetchData();