
function addUser(name , tasksArr){

    var task = {
        name: name, 
    };

    tasksArr.push(task);
    localStorage.setItem('Tasks' , JSON.stringify(tasksArr))
    showUsers(tasksArr);
   
}



function deleteUserByID(taskIndex , tasksArr){
    tasksArr.splice(taskIndex, 1)
    localStorage.setItem('Tasks' , JSON.stringify(tasksArr))
    if(Tasks.length==0){
        tasksContainer.classList.add('d-none')
    }
    else
    {
        showUsers(tasksArr)

     
    }
}


/* Session 5 */

const nameField = document.getElementById("firstName")
const tasksContainer = document.getElementById("div-container")
const addBtn = document.getElementById("addbtn")

let Tasks = JSON.parse(localStorage.getItem('Tasks'))
if (Tasks !=null ){
    console.table(Tasks)
    showUsers(Tasks)
}
else{
    Tasks =[]
}


addBtn.addEventListener("click",(e)=>{
    e.preventDefault()
    addUser(nameField.value , Tasks)
    console.table(Tasks)
})

function showUsers(tasksArr){
    tasksContainer.classList.remove('d-none')
    tasksContainer.innerText=""
    tasksArr.forEach((element ,i)=>{
        // create row elements 
        let newCard  = document.createElement('div')
        newCard.className = 'task-card card mb-3 col-12 col-auto my-5 shadow-lg'
        let cardHeader = document.createElement('h5')
        cardHeader.className = ' align-self-center text-center mb-5 mt-3'
        cardHeader.innerHTML = element.name
        let removeBtn = document.createElement('button')
        removeBtn.innerText = 'Delete'
        removeBtn.className = 'delete-btn btn rounded-pill col-4 col-md-2 align-self-center mb-2 '
        let taskToggle = document.createElement("input");
        taskToggle.setAttribute("type", "checkbox");
        // add eventListeners 

        removeBtn.addEventListener("click", ()=>{
            setTimeout(()=>removeBtn.parentElement.classList.add('removing'), 10)
            deleteUserByID(i, Tasks)
            console.table(Tasks)
        });

        taskToggle.addEventListener('change', ()=>{

            taskToggle.parentElement.classList.toggle('completed');

            
        });

      

        // append elements in parent 
        newCard.appendChild(cardHeader)
        newCard.appendChild(removeBtn)
        newCard.appendChild(taskToggle)
        tasksContainer.appendChild(newCard)
        

    })
}