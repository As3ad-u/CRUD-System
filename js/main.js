//function to calculate total
//function to create product
//save data in local storage
//reset all inputs after create product 
//display (Read data)
//delete
//Clean Data
//count
//update

//search


// set  variables 
let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let total=document.getElementById('total');
let count=document.getElementById('count');
let category=document.getElementById('category');
let createBTn=document.getElementById('create');
let allInputs=document.querySelectorAll('.inputs input');
let tableBody=document.querySelector('.tBody');
let btnMode='Create';
let glo; //global temp to store number of index 
let search=document.getElementById('search');
let searchMode='title';
// function to calc total 
function getTotal(){
    if(price.value !=''){
        let result =+price.value + +taxes.value + +ads.value + -discount.value                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     ;
        total.innerHTML=result;
        total.style.background = "green"
    }
    else{
        total.innerHTML=" ";
        total.style.background='chocolate';
    }
}

window.onload=function(){
    title.focus();
}
//create Products

let products;
// check localStorage empty or not 


if(localStorage.product!=null){
    products = JSON.parse(localStorage.product);
}

else{
    products=[]
    }
createBTn.addEventListener('click',function(){
    let newProduct={
        title :title.value.toLowerCase(),
        price :price.value,
        taxes :taxes.value,
        ads :ads.value,
        discount :discount.value,
        total :total.innerHTML,
        count :count.value,
        category:category.value.toLowerCase(),
    }

    // validate data

    if(title.value!=""
        &&price.value!=""
        &&taxes.value!=""
        &&ads.value!=""
        &&discount.value!=""
        &&count.value<=1000
        &&category.value!=""){
            //  if mode is Create , create product according to count number 
    
            if (btnMode==='create'){
                if(newProduct.count>1){
                    for(let i=0 ; i<newProduct.count ; i++){
                        products.push(newProduct);
                        }
                }
                else{
                    products.push(newProduct);
                }
            }
            else{
                products[glo]=newProduct;
                btnMode="create";
                count.style.display="block";
                createBTn.innerText="Create";
            }
            //reset All inputs field
            resetInputs();
        }

        else{
            swal({  
                title: " Oops!",  
                text: "you should fill all inputs",  
                icon: "error",  
                button: "Ok",  
                }); 
        }
    


    
    
    
    //save data in local storage

    localStorage.setItem('product' , JSON.stringify(products));
    
    //display Data after create product 
    displayData();

    
})

//reset all inputs after create product 

let resetInputs=function(){
    for(let i=0;i<allInputs.length;i++){
        allInputs[i].value="";
    }
    total.innerHTML='';
}

// Read(display) Data

function displayData(){
    let tr='';
    for(let i=0; i<products.length ; i++){
        tr+=`
        <tr>
            <td>${i+1}</td>
            <td>${products[i].title}</td>
            <td>${products[i].price}</td>
            <td>${products[i].taxes}</td>
            <td>${products[i].ads}</td>
            <td>${products[i].discount}</td>
            <td>${products[i].total}</td>
            <td>${products[i].category}</td>
            <td><i id="edit"  onclick=" updateProduct(${i})" class="fa-solid fa-edit edit"></i></td>
            <td><i id="delete" onclick=" deleteProduct(${i})" class="fa-solid fa-trash delete"></i></td>
        </tr>
        `;
    }
    tableBody.innerHTML=tr;
    let deleteAllDiv =document.querySelector('.delete-all-div')
    // create Delete All Btn if table body has elements 
    if(products.length>0){
        deleteAllDiv.innerHTML=`
        <button id="DeleteAll" onclick="deleteAllProducts()">
        Delete All Products (${products.length})
        </button>`
    }
    else{
        deleteAllDiv.innerHTML='';
    }
getTotal();
}
displayData();

// delete spicific product
function deleteProduct(index){
    //use splice function to delete product 
    products.splice(index,1);
    localStorage.product=JSON.stringify(products);
    displayData()
}

//delete All Data
function deleteAllProducts(){
    localStorage.clear();
    products.splice(0);
    displayData();
}

// update specicfic product 
function updateProduct(i){
    title.value=products[i].title;
    price.value=products[i].price;
    taxes.value=products[i].taxes;
    ads.value=products[i].ads;
    discount.value=products[i].discount;
    category.value=products[i].category;
    getTotal();
    count.style.display='none';
    createBTn.innerText='Update'
    btnMode='update';
    glo=i;
    scroll({
        top:0,
        behavior:'smooth',
    })
}

// search product by title or category


        // 1- get search mode 
function getSearchMode(id){
    if(id==='searchTitle'){
        searchMode="title";
    }
    else{
        searchMode="category";
    }
    search.placeholder=`search By ${searchMode}`;
    search.focus();
    search.value='';
    displayData();
}



function searchProduct(value){
    let tr='';
    for(let i=0;i<products.length;i++){
        if(searchMode=='title'){
        
            if(products[i].title.includes(value.toLowerCase())){
                tr+=`
        <tr>
            <td>${i+1}</td>
            <td>${products[i].title}</td>
            <td>${products[i].price}</td>
            <td>${products[i].taxes}</td>
            <td>${products[i].ads}</td>
            <td>${products[i].discount}</td>
            <td>${products[i].total}</td>
            <td>${products[i].category}</td>
            <td><i id="edit"  onclick=" updateProduct(${i})" class="fa-solid fa-edit edit"></i></td>
            <td><i id="delete" onclick=" deleteProduct(${i})" class="fa-solid fa-trash delete"></i></td>
        </tr>
        `;
            }
        
        tableBody.innerHTML=tr;

    }

    else{
        
            if(products[i].category.includes(value.toLowerCase())){
                tr+=`
        <tr>
            <td>${i+1}</td>
            <td>${products[i].title}</td>
            <td>${products[i].price}</td>
            <td>${products[i].taxes}</td>
            <td>${products[i].ads}</td>
            <td>${products[i].discount}</td>
            <td>${products[i].total}</td>
            <td>${products[i].category}</td>
            <td><i id="edit"  onclick=" updateProduct(${i})" class="fa-solid fa-edit edit"></i></td>
            <td><i id="delete" onclick=" deleteProduct(${i})" class="fa-solid fa-trash delete"></i></td>
        </tr>
        `;
            }
        
        tableBody.innerHTML=tr;

    }
    }
    
}

// // greate regex function 

// function validationFunction(){
//     let titleRegex=/^[A-Z]$/;
//     if(titleRegex.test(title.value)==true){
//         console.log("true");
//     }
//     else{
//         console.log(false);
//     }
// }
