let form = document.querySelector('form');
let table1 = document.getElementById('table1');
let table2 = document.getElementById('table2');
let table3 = document.getElementById('table3');
form.addEventListener('submit', function handleForm(event){
    event.preventDefault();
    let price = event.target.price.value;
    let dish = event.target.dish.value;
    let tablenumber = event.target.tablenumber.value;

    let orderDetails = {price,dish,tablenumber};
    axios.post(`https://crudcrud.com/api/868c90fe0ae14b5bb8a3ca3236537d5f/restaurantorder`,orderDetails)
    .then((res)=>{
        displayOrder(res.data);
    })
    
    document.getElementById('price').value = "";
    document.getElementById('dish').value = "";
    document.getElementById('tablenumber').value = "";


})

function displayOrder(orderDetails){
    let order = document.createElement('p');
    order.innerText = `${orderDetails.price} - ${orderDetails.dish} - ${orderDetails.tablenumber}`;
    let deletebtn = document.createElement('button');
    deletebtn.className = 'delete-btn';
    deletebtn.innerText = 'Delete';
    deletebtn.onclick = ()=>{
        axios.delete(`https://crudcrud.com/api/868c90fe0ae14b5bb8a3ca3236537d5f/restaurantorder/${orderDetails._id}`)
        .then((res)=> deleteOrder(order))
        .catch((error)=>console.log(error))

        
    }
    order.append(deletebtn);
    if(orderDetails.tablenumber == 'table1'){
        table1.append(order);
    } else if(orderDetails.tablenumber == 'table2'){
        table2.append(order);
    } else{
        table3.append(order);
    }
}

window.addEventListener('DOMContentLoaded',()=>{
    axios.get(`https://crudcrud.com/api/868c90fe0ae14b5bb8a3ca3236537d5f/restaurantorder`)
    .then((res)=>{
        for(let i=0;i<res.data.length;i++){
            displayOrder(res.data[i]);
        }
    })
    .catch((error)=>console.log(error))
})
function deleteOrder(order){
    order.remove()
}