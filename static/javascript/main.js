let id = 1;
const addcard = document.querySelector('.add-task-card');
const typewriter = document.querySelector('.automatic-type-writer');
const nav = document.querySelector('header nav');
const main = document.querySelector('.main-display');
window.onload = async () => {
    console.log('hi');
    let image = document.querySelector('.profile .profile-image img');
    const response = await fetch('/users/me/avtar');
    const data = await response.json();
    console.log(data);
};
let skip = 0;
window.onload = () => {
    skip = 0;
}
const tasks = async (element) => {

    if (element) {
        if (element.id == 'nextpage') {
            skip += 5;
        }
        else if (element.id == 'prevpage') {
            skip -= 5;
        }
    }
    // const modified=document.getElementById('modified').checked;
    // const created=document.getElementById('created').checked;
    // const Ascending=document.getElementById('Ascending').checked;
    // const Descending=document.getElementById('Descending').checked;
    const truetask = document.getElementById('truetask').checked;
    const falsetask = document.getElementById('falsetask').checked;
    let html = ``;
    let task = document.querySelector('.tasks');
    if (truetask == true) {
        let response = await fetch(`/tasks?completed=true&skip=${skip}`);
        let data = await response.json();

        data.array.forEach(element => {
            if (element.completed == true) {
                html += `<div>
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
        </div>
        <hr>`
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
                    </div>
                    <hr>`
            }
        })
        task.innerHTML = html;
        return
    }
    const response = await fetch(`/tasks?skip=${skip}`);
    const data = await response.json();
    if (data.error) {
        return alert('Please Log in Again');
    }
    data.array.forEach(element => {
        html += `<div>
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
        </div>
        <hr>`
    })
    task.innerHTML = html;
}
window.onload = tasks;

const addtask = async () => {
    const discription = document.querySelector('#discription').value;
    const response = await fetch('/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ discription })
    })
    const data = await response.json();
    if (data.error) {
        return alert('Please Log in Again');
    }
    typewriter.style.opacity = 1;
    nav.style.opacity = 1;
    main.style.opacity = 1;
    addcard.style.opacity = 0;
    tasks();
}
const signout = async () => {
    await fetch('/users/signout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    window.location.href = "https://dev-jb-007-task-manager.herokuapp.com"
}

const deletetask = async (element) => {
    let task = element.parentElement.children[0].textContent;
    const response = await fetch(`/tasks/${task}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    if (data.error) {
        return alert('Please Log in Again');
    }
    tasks();
}

const edittask = async (element) => {
    let parent = element.parentElement;
    parent.children[5].style.display = 'block';
}
const update = async (element) => {
    let oldDisc = element.parentElement.parentElement.children[0].textContent;
    let parent = element.parentElement.parentElement;
    let discription = parent.children[5].children[0].value;
    let completed = parent.children[5].children[1].checked;
    let data;
    if (discription.length == 0) {
        data = {
            completed
        }
    }
    else {
        data = {
            discription,
            completed
        }
    }
    const response = await fetch(`/tasks/${oldDisc}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    tasks();
}

const showsort = () => {
    document.querySelector('.sortBy').style.display = 'block';
};
const showtaskcard = () => {

    typewriter.style.opacity = 0.3;
    nav.style.opacity = 0.3;
    main.style.opacity = 0.3;
    addcard.style.opacity = '1';
}
const concernedElement = document.querySelector(".add-task-card");

document.addEventListener("mousedown", (event) => {

    if (concernedElement.contains(event.target)) {
        typewriter.style.opacity = 0.3;
        nav.style.opacity = 0.3;
        main.style.opacity = 0.3;
        addcard.style.opacity = '1';

    } else {
        typewriter.style.opacity = 1;
        nav.style.opacity = 1;
        main.style.opacity = 1;
        addcard.style.opacity = 0;
    }
});
const textarea = document.querySelector("#discription");
const element = document.querySelector('.add-task-card h4');
const header = document.querySelector('#header');
document.addEventListener("mousedown", (event) => {

    if (textarea.contains(event.target)) {
        document.styleSheets[1].addRule('.discription h4::after','transform: scaleX(1)');
        document.styleSheets[1].addRule('.header h4::after','transform: scaleX(0)');
    }
    else if(header.contains(event.target))
    {   document.styleSheets[1].addRule('.discription h4::after','transform: scaleX(0)');
        document.styleSheets[1].addRule('.header h4::after','transform: scaleX(1)');
    } else {
        document.styleSheets[1].addRule('.add-task-card h4::after','transform: scaleX(0)');
    }
});