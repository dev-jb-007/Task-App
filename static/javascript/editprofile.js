const editcontent=(element) => {
    const inputfield=element.parentElement.children[0].children[0];
    inputfield.removeAttribute('disabled');
}
const changeprofileimage=(element) => {
    console.log('Hello');
    document.querySelector("input[type='file']").dispatchEvent('click');
}
const getinfo=async () => {
    const name=document.getElementById('name');
    const age=document.getElementById('age');
    const email=document.getElementById('email');
    const password=document.getElementById('password');
    const response=await fetch('../users/me');
    const data=await response.json();
    name.value=data.name;
    age.value=data.age;
    email.value=data.email;
    password.value='';
}
window.onload=getinfo;