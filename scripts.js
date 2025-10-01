// scripts.js

// 1. CONFIGURACIÓN DE SUPABASE
const SUPABASE_URL = 'https://pxcqznlunqmiplgahaqn.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4Y3F6bmx1bnFtaXBsZ2FoYXFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkwNjY4MTAsImV4cCI6MjA3NDY0MjgxMH0.PIVHeXXPQYMkgOsdVXZC259bhGgcIy0-Rn6oomVfcUE'; 

// 🎯 SOLUCIÓN: Acceder a la función createClient directamente desde 'window.supabase'
// o simplemente usando 'window.supabase.createClient' o 'supabase.createClient'
// ya que la CDN la hace global. La forma más segura es la siguiente:
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);


// 2. FUNCIÓN PARA MANEJAR EL ENVÍO DEL FORMULARIO
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Evita que la página se recargue

    // A. Captura de valores del formulario
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value;
    
    // B. Preparación del objeto de datos
    // Los nombres COINCIDEN con las columnas de tu tabla 'contact_messages'.
    const dataToInsert = {
        nombre_completo: name, 
        correo: email, 
        servicio_interes: service,
        mensaje: message,
    };

    // C. Realizar la inserción en la tabla 'contact_messages'
    const { data, error } = await supabase
        .from('contact_messages') 
        .insert([dataToInsert]);
    
    // D. Manejar la respuesta
    if (error) {
        console.error('Error de Supabase:', error);
        alert(`❌ Error: La conexión falló. Verifica la Consola (F12) para el código de error.`);
    } else {
        console.log('Registro exitoso:', data);
        alert('✅ ¡Solicitud enviada con éxito! Revisa tu base de datos.');
        contactForm.reset(); 
    }
});