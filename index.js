//access the element
const bookNameElement = document.getElementById('book-name');
const issueToElement = document.getElementById("issue-to");
const btnElement = document.getElementById('btn');
const tableBody =document.querySelector("tbody");
const books =[
   
];
function handleEdit(event){
    const buttonElement = event.target;
    const id = buttonElement.id;

    if(buttonElement.textContent === 'Edit'){
    event.target.textContent="Save";
    const parentElement = event.target.parentElement;
    parentElement.removeChild(parentElement.firstChild);
    const input = document.createElement("input");
    input.id ='status-inp';
    input.value = books[id-1].status;
    parentElement.insertBefore(input, event.target);
    }
    else{
        const statusElement = document.getElementById('status-inp');
        books[id-1].status = statusElement.value;
        renderBookInsideTable();
    }

}
function creatTableRow (data, tableBody ,bookId){
    //First create a tr 
    const tr =document.createElement("tr");
    //create 5 ths and add data inside it 
    const idTd =document.createElement("td");
    idTd.textContent =bookId;

    const bookNameTd =document.createElement("td");
    bookNameTd.textContent =data.name;
    const issueToTd =document.createElement("td");
    issueToTd.textContent =data.issuedTo;
    const issuedAtTd =document.createElement("td");
    issuedAtTd.textContent =data.issuedAt;
    const statusTd =document.createElement("td");
    const div = document.createElement('div');
    div.classList.add('flex');
    const button =document.createElement('button');
    const span =document.createElement('span');
    span.textContent =data.status;
    const className = data.status === "not returned" ? "red" : "green";
    span.classList.add(className);
    span.id =`span-${bookId}`;
   button.textContent='Edit';
   div.appendChild(span);
   div.appendChild(button);
   button.id=bookId;
   button.addEventListener("click" ,handleEdit);
   statusTd.appendChild(div);
    //add these ths in tr 
    tr.appendChild(idTd);
    tr.appendChild(bookNameTd);
    tr.appendChild(issueToTd);
    tr.appendChild(issuedAtTd);
    tr.appendChild(statusTd);
    //add  this tr in tbody
    tableBody.appendChild(tr);
}

//render all item present in the books into table
function renderBookInsideTable(){
    while(tableBody.firstChild){
        tableBody.removeChild(tableBody.firstChild)
    }
   books.map(function(book , index){
    //this will create a row and add it inside tbody
    creatTableRow(book ,tableBody,index+1);
   });
}

function handleFormSubmit(){
    // read book data
    const bookName = bookNameElement.value;
    // read issued to data
    const issuedTo = issueToElement.value;
    // create a book object with issuedAd and default status
    if(bookName && issuedTo){
    const book={
        name : bookName,
        issuedTo : issuedTo,
        issuedAt : new Date().toUTCString().substring(0 ,12),
        status:"not returned",
    };
    books.push(book);
    renderBookInsideTable();
    }
    else{
        alert("You are trying empty details");
    }
}


btnElement.addEventListener('click' ,handleFormSubmit);