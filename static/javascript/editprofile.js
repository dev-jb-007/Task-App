const editcontent=(element) => {
    const inputfield=element.parentElement.children[0].children[0];
    inputfield.removeAttribute('disabled');
}
// const loader=()=>{
//     document.querySelector('.loader').style.display = 'none';
// }

const getinfo=async () => {
    const name=document.getElementById('name');
    const age=document.getElementById('age');
    const email=document.getElementById('email');
    const password=document.getElementById('password');
    const response=await fetch('http://localhost:3000/users/me');
    const data=await response.json();
    
    name.value=data.name;
    age.value=data.age;
    email.value=data.email;
    password.value='';
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

window.onload=getinfo;