const form = document.getElementById('loginForm');

form.addEventListener('submit', e =>{
    e.preventDefault();
    const data = new FormData(form);
    const obj = {};
    //{
    //    email: xxxxx
    //    password: xxxxx
    //}

    data.forEach((value, key) => obj[key] = value); // armando nuestro objetos first_name: value
    fetch('/api/sessions/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    }).then(result =>{
        if(result.status === 200){
            window.location.replace('/products');
        }
    });
});