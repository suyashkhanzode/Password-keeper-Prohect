function handleFormSubmit(event){
    event.preventDefault();
     const title = document.getElementById("title").value
     const pass = document.getElementById("pass").value
     document.getElementById("title").value = ""
     document.getElementById("pass").value = ""
      axios.post("https://crudcrud.com/api/3f228df5fa004d5faa09129843c6dc50/passwords",{
        title : title,
        pass : pass
     })
     .then((res) =>{
       handleOnLoad();
     })
     .catch((err)=>{
        console.log(err);
     })
}
function handleOnLoad(){
    axios.get("https://crudcrud.com/api/3f228df5fa004d5faa09129843c6dc50/passwords")
    .then((res) =>{
        const siteList = document.querySelector("ul");
            siteList.innerHTML = ""; 
            const ele = document.getElementById("count");
            ele.textContent = "";
            ele.textContent = "Total Passwords :"+ res.data.length
            res.data.forEach((item) => {
                displayList(item, siteList);
            });
    })
    .catch((err) =>{
        console.log(err)
    })

    function displayList(list,siteList){
        const listItem = document.createElement("li");
        listItem.appendChild( document.createTextNode(`${list.title} > ${list.pass}`))

        const deleteBtn = document.createElement("button");
        deleteBtn.appendChild(document.createTextNode("Delete"));
        listItem.appendChild(deleteBtn);
        deleteBtn.addEventListener("click",()=>{
               deleteSite(list._id)
        })
        const editBtn = document.createElement("button");
        editBtn.appendChild(document.createTextNode("Edit"));
        listItem.appendChild(editBtn);
        editBtn.addEventListener("click",()=>{
             editSite(list);
        })

        
        siteList.appendChild(listItem);
    }
}

function deleteSite(id){
    axios.delete(`https://crudcrud.com/api/3f228df5fa004d5faa09129843c6dc50/passwords/${id}`)
    .then(() =>{
       handleOnLoad();
    })
    .catch((err)=>{
        console.log(err)
    })
}

function editSite(list){
     document.getElementById("title").value = list.title
     document.getElementById("pass").value = list.pass;
    const form = document.querySelector("form");
    form.onsubmit = (event) =>{ updateSite(event,list._id)}
}

function updateSite(event,id){
     event.preventDefault();
    const updatetitle = document.getElementById("title").value
    const updatepass = document.getElementById("pass").value 
   
    document.getElementById("title").value = ""
     document.getElementById("pass").value = ""
    axios.put(`https://crudcrud.com/api/3f228df5fa004d5faa09129843c6dc50/passwords/${id}`,{
        title : updatetitle,
        pass : updatepass
    })
    .then((res)=>{
        handleOnLoad();
    })
    .catch((err)=>{
        console.log(err)
    })

}

function searchPassword(serachText){
    const list = document.querySelector("ul");
    const passwords = list.getElementsByTagName("li");

   for(let pass of passwords){
    const title = pass.textContent.split(":")[0];
    if (title.toLowerCase().includes(serachText.toLowerCase())) {
        pass.style.display = "block"; 
    } else {
        pass.style.display = "none"; 
    }
   }
}

window.onload = handleOnLoad();