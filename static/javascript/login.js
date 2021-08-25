
// Backend side javascript
let authToken;

const login=async () =>
{   
    let email=document.querySelector('#logemail').value;
    let password=document.querySelector('#logpassword').value;
    let data={
        email,
        password
    }
    console.log(data);
    let response=await fetch('/users/login',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(data)
    });
    let answer=await response.json();
    // if(Object.keys(answer).length==0){
    //     let error=document.querySelector('#error');
    //     error.style.width='max-content';
    //     error.innerHTML=`wrong details`
    //     return;
    // }
    window.location.href='/mainpage';

    // console.log(answer);
}

const signup=async () =>{
    let name=document.querySelector('#signame').value;
    let email=document.querySelector('#sigemail').value;
    let password=document.querySelector('#sigpassword').value;
    let age=document.querySelector('#sigage').value;
    let data={
        name,
        age,
        email,
        password
    }
    console.log(data);
    let response=await fetch('/users',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(data)
    });
    window.location.href='/mainpage';

    // console.log(response);
}
window.addEventListener('load', ()=>{
    document.querySelector('.loader').style.display ='none';
})


// Client side javascript
const logsection=document.getElementById('login-section');
const signsection=document.querySelector('#signup-section');
const text=document.querySelector('.animation-card');
const card=document.querySelector('.animation-text');
const options={
    threshold:0.2
};
const observer=new IntersectionObserver((entries,observer) => {
    entries.forEach((entry) => {
        if(!entry.isIntersecting)
        {
            return
        }
        console.log(entry.target);
        card.style.transform ='translateX(0)';
        text.style.transform ='translateX(0)';
        observer.unobserve(entry.target);
    })
},options)
observer.observe(logsection);

const observer2=new IntersectionObserver((entries,observer) => {
    entries.forEach((entry) => {
        if(!entry.isIntersecting)
        {
            return
        }
        console.log(entry.target);
        document.getElementById('signup-card').style.transform ='translateX(0)';
        document.getElementById('signup-text').style.transform ='translateX(0)';
        observer.unobserve(entry.target);
    })
},options)
observer2.observe(signsection);

const scrollDownlogin =()=>{
    window.scrollBy(0,800);
}
const scrollDownsignup=()=>{
    window.scrollBy(0,1600);
}