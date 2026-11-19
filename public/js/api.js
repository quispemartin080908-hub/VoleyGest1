
async function obtenerUsuarios() {
    let { data: jugadores, error } = await supabaseClient
        .from('jugadores')
        .select('*')
        .order('id', { ascending: false });

    if (error) {
        console.error("Error al obtener los jugadores:", error);
        return;
    }

    renderizarTablaJugadores(jugadores);
}

function renderizarTablaJugadores(jugadores) {
    const tbody = document.querySelector('.user-table tbody');
    if (!tbody) return;
    
    tbody.innerHTML = ''; 

    jugadores.forEach(jugador => {
        const fila = `
            <tr>
                <td>${jugador.nombre_completo}</td>
                <td>DNI: ${jugador.dni}</td>
                <td><span class="badge badge-trainer">${jugador.categoria}</span></td>
                <td class="status-active"><i class="fas fa-circle status-icon"></i> Activo</td>
                <td>
                    <button class="btn-action" onclick="editarJugador(${jugador.id})"><i class="fas fa-edit"></i></button>
                    <button class="btn-action delete" onclick="eliminarJugador(${jugador.id})"><i class="fas fa-trash-alt"></i></button>
                </td>
            </tr>
        `;
        tbody.innerHTML += fila;
    });
}

// ==========================================
// OPERACIÓN CREATE (Registrar nuevo jugador)
// ==========================================
async function registrarJugador(event) {
    event.preventDefault(); // Evita que la página se recargue sola

    // Capturamos los valores de los inputs del formulario en registrar-usuario.html
    const inputs = document.querySelectorAll('.config-box-register input');
    const nombre = inputs[0].value;
    const dni = inputs[1].value;
    const categoria = inputs[2].value;

    const { data, error } = await supabaseClient
        .from('jugadores')
        .insert([
            { nombre_completo: nombre, dni: dni, categoria: categoria }
        ]);

    if (error) {
        alert("Error al registrar el jugador: " + error.message);
        console.error(error);
        return;
    }

    alert("¡Jugador registrado con éxito!");
    window.location.href = 'usuarios.html'; // Redirige a la vista de la tabla
}

// ==========================================
// OPERACIÓN DELETE (Eliminar registro)
// ==========================================
async function eliminarJugador(id) {
    const confirmar = confirm("¿Estás seguro de eliminar este registro?");
    if (!confirmar) return;

    const { error } = await supabaseClient
        .from('jugadores')
        .delete()
        .eq('id', id);

    if (error) {
        alert("Error al eliminar: " + error.message);
        return;
    }

    // Recargamos la lista actualizada
    obtenerUsuarios();
}