document.getElementById('hamburger').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('myMenu').style.height = '100%';
});

document.getElementById('buttonX').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('myMenu').style.height = '0%';
});