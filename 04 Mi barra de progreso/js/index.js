window.addEventListener('load', () => {
    const progreso = document.getElementById('progreso');
    requestAnimationFrame(update);
    
});

function update() {
    progreso.style.width = `${((window.scrollY) / (document.body.scrollHeight - window.innerHeight) * 100)}%`
    requestAnimationFrame(update);
}