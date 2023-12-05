const form = document.getElementById('registerForm');

form.addEventListener('submit', e =>{
    e.preventDefault();
    const data = new FormData(form);
    const obj = {};
    //{
    //    first_name: xxxxx
    //    last_name: xxxxx
    //    age:123
    //}
    data.forEach((value, key) => obj[key] = value); // armando nuestro objetos first_name: value
    fetch('/api/sessions/register', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result =>{
        if(result.status === 201){
            window.location.replace('/');
        }
    });
});