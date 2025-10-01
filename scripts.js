// scripts.js

// 1. CONFIGURACIÓN DE SUPABASE (Tus claves proporcionadas)
const SUPABASE_URL = 'https://pxcqznlunqmiplgahaqn.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4Y3F6bmx1bnFtaXBsZ2FoYXFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkwNjY4MTAsImV4cCI6MjA3NDY0MjgxMH0.PIVHeXXPQYMkgOsdVXZC259bhGgcIy0-Rn6oomVfcUE'; 

// Inicializamos el cliente de Supabase
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);


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
    // 💥 ¡AQUÍ ESTÁ LA CLAVE! Los nombres de la izquierda COINCIDEN 
    // EXACTAMENTE con las columnas de tu tabla 'contact_messages'.
    const dataToInsert = {
        nombre_completo: name, 
        correo: email, 
        servicio_interes: service,
        mensaje: message,
        // created_at no es necesario, ya que Supabase lo añade automáticamente con 'now()'
    };

    // C. Realizar la inserción
    // La tabla se llama 'contact_messages'
    const { data, error } = await supabase
        .from('contact_messages') 
        .insert([dataToInsert]);
    
    // D. Manejar la respuesta
    if (error) {
        console.error('Error de Supabase:', error);
        // Si el error es 403, ¡el problema es RLS!
        alert(`❌ Error al enviar. Posiblemente un problema con la seguridad (RLS). Mensaje: ${error.message}`);
    } else {
        console.log('Registro exitoso:', data);
        alert('✅ ¡Solicitud enviada con éxito! Revisa tu base de datos.');
        contactForm.reset(); // Limpia el formulario
    }
});