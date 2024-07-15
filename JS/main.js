document.addEventListener('DOMContentLoaded', function () {
    // JavaScript para validación básica del formulario
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        // Validación de campos
        const email = document.getElementById('exampleInputEmail1').value;
        const nombre = document.getElementById('exampleInputNombre').value;
        const mensaje = document.getElementById('mensaje').value;

        if (!email || !nombre || !mensaje) {
            alert('Por favor completa todos los campos.');
            return;
        }

        // Simulación de envío del formulario
        alert('Formulario enviado correctamente.');
        form.reset();
    });
});
 //formulario
 document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const email = document.getElementById('exampleInputEmail1').value;
        const nombre = document.getElementById('exampleInputNombre').value;
        const mensaje = document.getElementById('mensaje').value;

        if (!email || !nombre || !mensaje) {
            alert('Por favor completa todos los campos.');
            return;
        }

        // Envío del formulario
        fetch('http://localhost:3000/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                nombre: nombre,
                mensaje: mensaje
            })
        })
        .then(response => response.text())
        .then(data => {
            alert(data);  // Mostrar mensaje de éxito o error
            form.reset(); // Limpiar formulario si se envía correctamente
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un error al enviar el mensaje.');
        });
    });
});