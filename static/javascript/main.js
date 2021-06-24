<<<<<<< HEAD


let skip = 0;
=======
let id = 1;
{/* <div>
        <p>${element.discription}</p>
        <br>
        <p>Completed:${element.completed}</p>
        <button  onclick='deletetask(this)'>Delete</button>
        <button  onclick='edittask(this)'>Edit</button>
        <div class="updateSection" style="display:none">
            <input type="text">
            <input type="checkbox">
            <button id="update" onclick="update(this)">Update</button>
        </div>
        </div> */}
>>>>>>> 6bcc288e3920ff21fdcca7ac4ca0b06c4e19d7ad
const addcard = document.querySelector('.add-task-card');
const typewriter = document.querySelector('.automatic-type-writer');
const nav = document.querySelector('header nav');
const main = document.querySelector('.main-display');
<<<<<<< HEAD

window.onload = () => {
    skip = 0;
}

const tasks = async (element) => {
    let id = 1;
    const modified = document.getElementById('modified');
    const created = document.getElementById('created');
    const Ascending = document.getElementById('Ascending');
    const Descending = document.getElementById('Descending');
    const truetask = document.getElementById('truetask');
    const falsetask = document.getElementById('falsetask');
    let html = ``;
    let url = "/tasks?";
    if (element) {
        if (Ascending.checked == true) {
            Descending.setAttribute('disabled', true);
        }
        else if (Descending.checked == true) {
            Ascending.setAttribute('disabled', true);
        }
        else if (element.checked == false) {
            let parent = element.parentElement.parentElement.parentElement;
            for (var i = 0; i < 2; i++) {
                if (parent.children[i].children[1].children[0] != element) {
                    parent.children[i].children[1].children[0].removeAttribute('disabled');
                }
            }
        }
        if (truetask.checked == true) {
            falsetask.setAttribute('disabled', true);
            url += 'completed=true&';
        }
        else if (falsetask.checked == true) {
            truetask.setAttribute('disabled', true);
            url += 'completed=false&'
        }
        else if (element.checked == false) {
            let parent = element.parentElement.parentElement.parentElement;
            for (var i = 0; i < 2; i++) {
                if (parent.children[i].children[1].children[0] != element) {
                    parent.children[i].children[1].children[0].removeAttribute('disabled');
                }
            }
        }
        if (modified.checked == true) {
            created.setAttribute('disabled', true);
            if (Ascending.checked == true) {
                url += 'sortBy=updatedAt_asc&'
            }
            else {
                url += 'sortBy=updatedAt_desc&'
            }
        }
        else if (created.checked == true) {
            modified.setAttribute('disabled', true);
            if (Ascending.checked == true) {
                url += 'sortBy=createdAt_asc&'
            }
            else {
                url += 'sortBy=createdAt_desc&'
            }
        }
        else if (element.checked == false) {
            let parent = element.parentElement.parentElement.parentElement;
            for (var i = 0; i < 2; i++) {
                if (parent.children[i].children[1].children[0] != element) {
                    parent.children[i].children[1].children[0].removeAttribute('disabled');
                }
            }
        }
        if (element) {
            if (element.id == 'nextpage') {
                skip += 6;
=======
// window.onload = async () => {
//     
//     let image = document.querySelector('.profile .profile-image img');
//     const response = await fetch('/users/me/avtar');
//     const data = await response.json();
//   
// };
let skip = 0;
window.onload = () => {
    skip = 0;
}
const tasks = async (element) => {
    let id = 1;
    if (element) {
        if (element.id == 'nextpage') {
            skip += 6;
        }
        else if (element.id == 'prevpage') {
            skip -= 6;
        }
    }
    // const modified=document.getElementById('modified').checked;
    // const created=document.getElementById('created').checked;
    // const Ascending=document.getElementById('Ascending').checked;
    // const Descending=document.getElementById('Descending').checked;
    // const truetask = document.getElementById('truetask').checked;
    // const falsetask = document.getElementById('falsetask').checked;
    let html = ``;
    const truetask = false;
    const falsetask = false;
    let task = document.querySelector('.main-display');
    if (truetask == true) {
        let response = await fetch(`/tasks?completed=true&skip=${skip}`);
        let data = await response.json();

        data.array.forEach(element => {
            if (element.completed == true) {
                html += `<div>
                <div class="card">
                    <button id="close${id++}"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                        <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z" />
                    </svg></button>
                    <div class="task-header">
                        <h3>${element.title}</h3>
                    </div>
                    <div class="task-discription">
                        ${element.discription}
                    </div>
                    <div class="edit">
                        <a onclick="tasksoptions(this)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor"
                                class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                <path
                                    d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>`
            }
        })
        task.innerHTML = html;
        return
    }
    else if (falsetask == true) {
        let response = await fetch(`/tasks?completed=false&skip=${skip}`);
        let data = await response.json();
        data.array.forEach(element => {
            if (element.completed == false) {
                html += `<div>
                <div class="card">
                    <button id="close${id++}"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                        <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z" />
                    </svg></button>
                    <div class="task-header">
                        <h3>${element.title}</h3>
                    </div>
                    <div class="task-discription">
                        ${element.discription}
                    </div>
                    <div class="edit">
                        <a onclick="tasksoptions(this)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor"
                                class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                <path
                                    d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>`
>>>>>>> 6bcc288e3920ff21fdcca7ac4ca0b06c4e19d7ad
            }
            else if (element.id == 'prevpage') {
                skip -= 6;
            }
        }
    }

    url += `skip=${skip}`;
    let task = document.querySelector('.main-display');
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
        return alert(data.error.message);
    }
    id = id <= 6 ? id : 1;
    data.array.forEach(element => {
        let bgcolor;
        if (element.completed == true) {
            bgcolor = '#2962ff';
            bgcolor = '#FFD52E';
            display = 'none';
        }
        else {
            display = 'block';
            bgcolor = 'red';
        }
        html += `<div>
        <div class="card">
<<<<<<< HEAD
            <button id="close${id}"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
=======
            <button id="close1"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
>>>>>>> 6bcc288e3920ff21fdcca7ac4ca0b06c4e19d7ad
                    class="bi bi-x-lg" viewBox="0 0 16 16">
                    <path
                        d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z" />
                </svg></button>
            <div class="task-header"  style="background-color:${bgcolor}">
                <h3>${element.title}</h3>
<<<<<<< HEAD
                <input type="text">
=======
                <input type="text" name="" id="">
>>>>>>> 6bcc288e3920ff21fdcca7ac4ca0b06c4e19d7ad
            </div>
            <div class="task-discription">
                <p>
                ${element.discription}
                </p>
<<<<<<< HEAD
                <textarea name="dicription" cols="50" rows="50"></textarea>
=======
                <textarea name="dicription" id="update-discription" cols="30" rows="10"></textarea>
>>>>>>> 6bcc288e3920ff21fdcca7ac4ca0b06c4e19d7ad
            </div>
            <div class="edit">
                <a onclick="tasksoptions(this)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor"
                        class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                        <path
                            d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                    </svg>
                </a>
            </div>
            <button id="completed">
                <div class="scroll-effect">
                    <a onclick="donetask(this)" style="display:${display}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                            class="bi bi-check-lg" viewBox="0 0 16 16">
                            <path
                                d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z" />
                        </svg>
                    </a>
                    <a onclick="undotask(this)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                        class="bi bi-plus-lg" viewBox="0 0 16 16">
                        <path
                            d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
                    </svg>
                    </a>
                </div>
            </button>
            <button id="delete" onclick='deletetask(this)'>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                    class="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path
                        d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                </svg>
            </button>
            <button class="text-edit">
<<<<<<< HEAD
                <a id="updatebtn${id++}">
=======
                <a  id="updatebtn">
>>>>>>> 6bcc288e3920ff21fdcca7ac4ca0b06c4e19d7ad
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                    class="bi bi-save" viewBox="0 0 16 16">
                    <path
                        d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z" />
                </svg>
                </a>
                <a  onclick="update(this)">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                    class="bi bi-pencil" viewBox="0 0 16 16">
                    <path
                        d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                </svg>
                </a>
            </button>
        </div>
    </div>`
    })
    task.innerHTML = html;
}
window.onload = tasks;
console.log(document.querySelector('#falsetask'));
const addtask = async () => {
    const discription = document.querySelector('#discription').value;
    const header = document.querySelector('#header').value.toLowerCase();
    const response = await fetch('/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ discription, title: header })
    })
    const data = await response.json();
    if (data.error) {
<<<<<<< HEAD
        return alert(data.error.message);
=======
        return alert(`${data}`);
>>>>>>> 6bcc288e3920ff21fdcca7ac4ca0b06c4e19d7ad
    }
    typewriter.style.opacity = 1;
    nav.style.opacity = 1;
    main.style.opacity = 1;
    addcard.style.opacity = 0;
    // const Descending = document.getElementById('Descending');
    tasks();
}
const signout = async () => {
    await fetch('/users/signout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    window.location.href = "http://localhost:3000"
}

const deletetask = async (element) => {
    let task = element.parentElement.children[1].innerText.toLowerCase();
    const response = await fetch(`/tasks/${task}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    if (data.error) {
        return alert(data.error.message);
    }
    tasks('done');
}

// const edittask = async (element) => {
//     let parent = element.parentElement;
//     parent.children[5].style.display = 'block';
// }
const donetask = async (element) => {
    let title = element.parentElement.parentElement.parentElement.children[1].innerText.toLowerCase();
    console.log(title);
    // element.style.display = 'none';
    // element.parentElement.style.transform='translateY(46px)';
    data = {
        completed: true
    }
    const response = await fetch(`/tasks/${title}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
<<<<<<< HEAD
    if (data.error) {
        return alert(data.error.message);
    }
=======
    console.log(await response.json());
>>>>>>> 6bcc288e3920ff21fdcca7ac4ca0b06c4e19d7ad
    tasks();
}
const undotask = async (element) => {
    let title = element.parentElement.parentElement.parentElement.children[1].innerText.toLowerCase();
    data = {
        completed: false
    }
    const response = await fetch(`/tasks/${title}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
<<<<<<< HEAD
    if (data.error) {
        return alert(data.error.message);
    }
=======
    console.log(await response.json());
>>>>>>> 6bcc288e3920ff21fdcca7ac4ca0b06c4e19d7ad
    tasks();
}
const update = async (element) => {
    // let oldDisc = element.parentElement.parentElement.children[0].textContent;
    // let parent = element.parentElement.parentElement;
    // let discription = parent.children[5].children[0].value;
    // let completed = parent.children[5].children[1].checked;
    let title=element.parentElement.parentElement.children[1];
    let discription=element.parentElement.parentElement.children[2];
    let initialheader=title.children[0].innerText;
    title.children[1].style.display="block";
    discription.children[1].style.display="block";
    // let oldheader=title.children[0].innerText.toLowerCase();
    title.children[1].value=title.children[0].innerText;
    discription.children[1].value=discription.children[0].innerText;
    
    document.styleSheets[1].addRule('.card .text-edit a:nth-child(2)','opacity: 0;pointer-events:none');
    document.styleSheets[1].addRule('.card .text-edit a:first-child','opacity: 1;pointer-events:auto');
    title.children[0].innerText='';
    discription.children[0].innerText='';
    document.getElementById('updatebtn').addEventListener('click',async()=>{
        let heading=title.children[1].value;
        let newdisc=discription.children[1].value;
        console.log(heading.toLowerCase(),newdisc);
        let data={
            title:heading.toLowerCase(),
            discription:newdisc
        };
        
        const response = await fetch(`/tasks/${initialheader.toLowerCase()}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        console.log(await response.json());
        tasks();
    })
}

<<<<<<< HEAD

const update = async (element) => {
    console.log('hi');
    // let oldDisc = element.parentElement.parentElement.children[0].textContent;
    // let parent = element.parentElement.parentElement;
    // let discription = parent.children[5].children[0].value;
    // let completed = parent.children[5].children[1].checked;
    let title = element.parentElement.parentElement.children[1];
    let discription = element.parentElement.parentElement.children[2];
    let initialheader = title.children[0].innerText;
    title.children[1].style.display = "block";
    discription.children[1].style.display = "block";
    // let oldheader=title.children[0].innerText.toLowerCase();
    title.children[1].value = title.children[0].innerText;
    discription.children[1].value = discription.children[0].innerText;
    console.log('Dev')
    document.styleSheets[1].addRule('.card .text-edit a:nth-child(2)', 'opacity: 0;pointer-events:none');
    document.styleSheets[1].addRule('.card .text-edit a:first-child', 'opacity: 1;pointer-events:auto');
    title.children[0].innerText = '';
    discription.children[0].innerText = '';
    const updatefunction = async () => {
        console.log('Update');
        let heading = title.children[1].value;
        let newdisc = discription.children[1].value;
        title.children[0].innerText = heading;
        discription.children[0].innerText = newdisc;
        title.children[1].style.display = "none";
        discription.children[1].style.display = "none";
        document.styleSheets[1].addRule('.card .text-edit a:nth-child(2)', 'opacity: 1;pointer-events:auto');
        document.styleSheets[1].addRule('.card .text-edit a:first-child', 'opacity: 0;pointer-events:none');
        console.log(heading.toLowerCase(), newdisc);
        let data = {
            title: heading.toLowerCase(),
            discription: newdisc
        };

        const response = await fetch(`/tasks/${initialheader.toLowerCase()}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (data.error) {
            return alert(data.error.message);
        }
        // tasks();
    };
    if (document.querySelector('#updatebtn1')) {
        document.querySelector('#updatebtn1').addEventListener('click', updatefunction);
    }
    if (document.querySelector('#updatebtn2')) {
        document.querySelector('#updatebtn2').addEventListener('click', updatefunction);
    }
    if (document.querySelector('#updatebtn3')) {
        document.querySelector('#updatebtn3').addEventListener('click', updatefunction);
    }
    if (document.querySelector('#updatebtn4')) {
        document.querySelector('#updatebtn4').addEventListener('click', updatefunction);
    }
    if (document.querySelector('#updatebtn5')) {
        document.querySelector('#updatebtn5').addEventListener('click', updatefunction);
    }
    if (document.querySelector('#updatebtn6')) {
        document.querySelector('#updatebtn6').addEventListener('click', updatefunction);
    }

}
=======
const showsort = () => {
    document.querySelector('.sortBy').style.display = 'block';
};

>>>>>>> 6bcc288e3920ff21fdcca7ac4ca0b06c4e19d7ad
const showtaskcard = () => {

    typewriter.style.opacity = 0.3;
    nav.style.opacity = 0.3;
    main.style.opacity = 0.3;
    addcard.style.opacity = '1';
    document.addEventListener("mousedown", (event) => {

        if (concernedElement.contains(event.target)) {
<<<<<<< HEAD
=======
            // typewriter.style.opacity = 0.3;
            // nav.style.opacity = 0.3;
            // main.style.opacity = 0.3;
            // addcard.style.opacity = '1';
>>>>>>> 6bcc288e3920ff21fdcca7ac4ca0b06c4e19d7ad

        } else {
            typewriter.style.opacity = 1;
            nav.style.opacity = 1;
            main.style.opacity = 1;
            addcard.style.opacity = 0;
        }
    });
}
const concernedElement = document.querySelector(".add-task-card");
const textarea = document.querySelector("#discription");
const element = document.querySelector('.add-task-card h4');
const header = document.querySelector('#header');
document.addEventListener("mousedown", (event) => {

    if (textarea.contains(event.target)) {
        document.styleSheets[1].addRule('.discription h4::after', 'transform: scaleX(1)');
        document.styleSheets[1].addRule('.header h4::after', 'transform: scaleX(0)');
    }
    else if (header.contains(event.target)) {
        document.styleSheets[1].addRule('.discription h4::after', 'transform: scaleX(0)');
        document.styleSheets[1].addRule('.header h4::after', 'transform: scaleX(1)');
    } else {
        document.styleSheets[1].addRule('.add-task-card h4::after', 'transform: scaleX(0)');
    }
});

const tasksoptions = (element) => {

    let card = element.parentElement.parentElement;
    let parent = element.parentElement.parentElement.parentElement.parentElement;

    for (let i = 0; i < 6; i++) {

        if (parent.children[i]) {


            if (card == parent.children[i].children[0]) {
                card.style.zIndex = 10;
                card.children[0].style.opacity = 1;
                card.children[0].style.pointerEvents = 'auto';
                if (i == 0) {
                    card.style.transform = 'translate(110%,50%)'

                }
                else if (i == 1) {
                    card.style.transform = 'translate(0,50%)'
                }
                else if (i == 2) {
                    card.style.transform = 'translate(-110%,50%)'
                }
                else if (i == 3) {
                    card.style.transform = 'translate(110%,-50%)'
                }
                else if (i == 4) {
                    card.style.transform = 'translate(0,-50%)'
                }
                else {
                    card.style.transform = 'translate(-110%,-50%)'
                }
            }
            else {
                parent.children[i].children[0].style.opacity = 0;
                parent.children[i].children[0].style.pointerEvents = 'none';
            }
        }
    }
    card.children[3].style.opacity = '0';
    card.children[3].style.pointerEvents = 'none';
    card.children[5].style.opacity = '1';
    card.children[5].style.pointerEvents = 'auto';
    card.children[6].style.opacity = '1';
    card.children[6].style.pointerEvents = 'auto';
    typewriter.style.opacity = 0.2;
    nav.style.opacity = 0.2;
    const newfunction = () => {
<<<<<<< HEAD
=======


        // let parent = element.parentElement.parentElement.parentElement;
        // document.removeEventListener("mousedown", myfunction);
>>>>>>> 6bcc288e3920ff21fdcca7ac4ca0b06c4e19d7ad
        typewriter.style.opacity = 1;
        nav.style.opacity = 1;
        card.style.transform = 'translate(0,0)';
        for (let i = 0; i < 6; i++) {
            if (parent.children[i]) {
                parent.children[i].children[0].style.opacity = 1;
                parent.children[i].children[0].style.pointerEvents = 'auto';
            }
        }
        card.children[0].style.opacity = 0;
        card.children[0].style.pointerEvents = 'none';
        card.children[3].style.opacity = '1';
        card.children[5].style.opacity = '0';
        card.children[5].style.pointerEvents = 'none';
        card.children[3].style.pointerEvents = 'auto';
        card.children[6].style.opacity = '0';
        card.children[6].style.pointerEvents = 'none';
    }
<<<<<<< HEAD
=======
    // document.addEventListener("mousedown", myfunction);
>>>>>>> 6bcc288e3920ff21fdcca7ac4ca0b06c4e19d7ad
    if (document.querySelector('#close1')) {
        document.querySelector('#close1').addEventListener("click", newfunction);
    }
    if (document.querySelector('#close2')) {
        document.querySelector('#close2').addEventListener("click", newfunction);
    }
    if (document.querySelector('#close3')) {
        document.querySelector('#close3').addEventListener("click", newfunction);
    }
    if (document.querySelector('#close4')) {
        document.querySelector('#close4').addEventListener("click", newfunction);
    }
    if (document.querySelector('#close5')) {
        document.querySelector('#close5').addEventListener("click", newfunction);
    }
    if (document.querySelector('#close6')) {
        document.querySelector('#close6').addEventListener("click", newfunction);
    }
}
<<<<<<< HEAD
=======

const editbtn=()=>{
    console.log('edit');
}

{/* <div>
    <div class="card">
        <button id="close1"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
            <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z" />
        </svg></button>
        <div class="task-header">
            <h3>1</h3>
        </div>
        <div class="task-discription">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam unde iusto beatae odio nostrum cumque,
            recusandae ad nihil saepe sequi, commodi fugit, voluptatem error dolor a omnis minima modi ut.
        </div>
        <div class="edit">
            <a onclick="tasksoptions(this)">
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor"
                    class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                    <path
                        d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                </svg>
            </a>
        </div>
    </div>
</div> */}
>>>>>>> 6bcc288e3920ff21fdcca7ac4ca0b06c4e19d7ad
