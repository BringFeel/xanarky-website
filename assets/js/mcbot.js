// Definición de comandos
const comandos = {
  Utilidad: [
    {comando: "Coords", descripcion: "Muestra las coordenadas actuales del bot", uso: "?coords"},
    {comando: "Wiki", descripcion: "Busca y muestra información de Wikipedia", uso: "?wiki [tema]"},
    {comando: "Hora", descripcion: "Muestra la hora actual en un país", uso: "?hora [país]"},
    {comando: "Traducir", descripcion: "Traduce texto al idioma especificado", uso: "?traducir [idioma] [texto]", infoAdicional: "Algunos idiomas disponibles son: es ,en ,hi ,ar ,bn ,pt ,ru ,ja ,de ,zh-cn"},
    {comando: "Jd", descripcion: "Muestra la fecha y hora exacta de la primera vez que un jugador se unió al servidor", uso: "?jd [Nombre]"},
    {comando: "Calcular Overworld", descripcion: "Convierte coordenadas del Nether al Overworld", uso: "?calcularover [X Y Z]"},
    {comando: "Calcular Nether", descripcion: "Convierte coordenadas del Overworld al Nether", uso: "?calcularnether [X Y Z]"},
    {comando: "Ayuda", descripcion: "Muestra los comandos disponibles", uso: "?ayuda"}
  ],
  Entretenimiento: [
    {comando: "Decir", descripcion: "Repite el mensaje especificado", uso: "?decir [mensaje]"},
    {comando: "Tirar una moneda", descripcion: "Lanza una moneda para obtener cara o cruz", uso: "?tirar una moneda"},
    {comando: "Tirar un dado", descripcion: "Lanza un dado y muestra el resultado", uso: "?tirar un dado"},
    {comando: "Trivia", descripcion: "Inicia una trivia o responde a una pregunta", uso: "?trivia"},
    {comando: "Chiste", descripcion: "Cuenta un chiste aleatorio", uso: "?chiste"},
    {comando: "Deberia", descripcion: "Da una respuesta total mente hacertada a tu pregunta", uso: "?Deberia"},
    {comando: "Ven", descripcion: "Teletransporta al bot hacia un jugador", uso: "?ven"},
    {comando: "Kill", descripcion: "Hace que el bot se suicide", uso: "?kill"}
  ]
};

function cargarCategorias() {
  const categoriasElement = document.getElementById('categorias');
  Object.keys(comandos).forEach((categoria, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `<td class="categoria" data-categoria="${categoria}">${categoria}</td>`;
    categoriasElement.appendChild(row);
  });
}

function mostrarComandos(categoria) {
  const comandosElement = document.getElementById('comandos');
  comandosElement.innerHTML = '';

  comandos[categoria].forEach(cmd => {
    const row = document.createElement('tr');
    row.className = 'comando-row';
    row.setAttribute('data-info', cmd.infoAdicional || '');
    row.innerHTML = `
      <td>${cmd.comando}</td>
      <td>${cmd.descripcion}</td>
      <td>${cmd.uso}</td>
    `;
    comandosElement.appendChild(row);
  });

  // Actualizar la categoría activa
  document.querySelectorAll('.categoria').forEach(cat => {
    cat.classList.remove('active-category');
    if(cat.textContent.trim().toLowerCase() === categoria.toLowerCase()) {
      cat.classList.add('active-category');
    }
  });

  // Agregar eventos para mostrar información adicional
  agregarEventosInfoAdicional();
}

function agregarEventosInfoAdicional() {
  const filas = document.querySelectorAll('.comando-row');
  filas.forEach(fila => {
    fila.addEventListener('mouseenter', mostrarInfoAdicional);
    fila.addEventListener('mouseleave', ocultarInfoAdicional);
  });
}

function mostrarInfoAdicional(event) {
  const info = event.currentTarget.getAttribute('data-info');
  if (info) {
    const infoElement = document.createElement('div');
    infoElement.className = 'info-adicional';
    infoElement.textContent = info;
    infoElement.style.position = 'absolute';
    infoElement.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    infoElement.style.color = '#00aaff';
    infoElement.style.padding = '5px 10px';
    infoElement.style.borderRadius = '3px';
    infoElement.style.zIndex = '1000';
    infoElement.style.fontSize = '0.9em';
    infoElement.style.fontFamily = "'Orbitron', sans-serif";
    infoElement.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
    
    document.body.appendChild(infoElement);
    
    const rect = event.currentTarget.getBoundingClientRect();
    infoElement.style.left = `${rect.left}px`;
    infoElement.style.top = `${rect.bottom + 5}px`;
  }
}

function ocultarInfoAdicional() {
  const infoElement = document.querySelector('.info-adicional');
  if (infoElement) {
    infoElement.remove();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  cargarCategorias();
  
  // Agregar evento de clic a las categorías
  document.getElementById('categorias').addEventListener('click', (event) => {
    if (event.target.classList.contains('categoria')) {
      const categoria = event.target.getAttribute('data-categoria');
      mostrarComandos(categoria);
    }
  });

  // Mostrar comandos de "Utilidad" por defecto
  mostrarComandos('Utilidad');
});