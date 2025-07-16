const materias = [
  { codigo: "1023", nombre: "Análisis Matemático I", correlativas: [] },
  { codigo: "1027", nombre: "Álgebra y Geometría Analítica I", correlativas: [] },
  { codigo: "1024", nombre: "Elementos de Programación", correlativas: [] },
  { codigo: "1026", nombre: "Tecnología, Ingeniería y Sociedad", correlativas: [] },
  { codigo: "1030", nombre: "Fundamentos de TIC's", correlativas: [] },
  { codigo: "1028", nombre: "Matemática Discreta", correlativas: [] },
  { codigo: "1025", nombre: "Sistemas de Representación", correlativas: [] },
  { codigo: "1029", nombre: "Química General", correlativas: [] },
  { codigo: "1033", nombre: "Análisis Matemático II", correlativas: ["1023"] },
  { codigo: "1031", nombre: "Física I", correlativas: ["1023"] },
  { codigo: "1032", nombre: "Álgebra y Geometría Analítica II", correlativas: ["1027"] },
  { codigo: "3016", nombre: "Probabilidad y Estadística", correlativas: ["1023"] },
  { codigo: "3017", nombre: "Química Industrial", correlativas: ["1029"] },
  { codigo: "3018", nombre: "Estabilidad I", correlativas: ["1031"] },
  { codigo: "3019", nombre: "Cálculo Numérico", correlativas: ["1033"] },
  { codigo: "1035", nombre: "Física II", correlativas: ["1031"] },
  { codigo: "3020", nombre: "Termodinámica", correlativas: ["1035", "3017"] },
  { codigo: "3021", nombre: "Física III", correlativas: ["1035"] },
  { codigo: "3022", nombre: "Matemática Avanzada", correlativas: ["1032", "3019"] },
  { codigo: "3023", nombre: "Costos Industriales", correlativas: ["1023"] },
  { codigo: "3024", nombre: "Mecánica General", correlativas: ["1031", "3022"] },
  { codigo: "3025", nombre: "Máquinas Térmicas", correlativas: ["3020"] },
  { codigo: "3026", nombre: "Estabilidad II", correlativas: ["3018"] },
  { codigo: "3027", nombre: "Organización Industrial", correlativas: ["3023"] },
  { codigo: "3028", nombre: "Mecánica de los Fluidos", correlativas: ["3020", "3022", "3024"] },
  { codigo: "3029", nombre: "Estabilidad III", correlativas: ["3022", "3026"] },
  { codigo: "3030", nombre: "Metalurgia Física I", correlativas: ["3017", "3021"] },
  { codigo: "3031", nombre: "Electrotecnia y Electrónica", correlativas: ["3021"] },
  { codigo: "3032", nombre: "Elementos de Máquinas", correlativas: ["3024", "3026"] },
  { codigo: "3033", nombre: "Automación I", correlativas: ["3031"] },
  { codigo: "3034", nombre: "Trabajado Mecánico I", correlativas: ["3026", "3030"] },
  { codigo: "3035", nombre: "Metalurgia Física II", correlativas: ["3030"] },
  { codigo: "3036", nombre: "Trabajado Mecánico II", correlativas: ["3034", "3035"] },
  { codigo: "3037", nombre: "Elementos de Economía", correlativas: ["3023"] },
  { codigo: "3038", nombre: "Automación II", correlativas: ["3033", "3034"] },
  { codigo: "3039", nombre: "Máquinas Eléctricas", correlativas: ["3031"] },
  { codigo: "3040", nombre: "Metrología y Gestión de la Calidad", correlativas: ["3016", "3032", "3034"] },
  { codigo: "3041", nombre: "Higiene y Seguridad en el Trabajo", correlativas: ["3025", "3039"] },
  { codigo: "3042", nombre: "Instalaciones Industriales", correlativas: ["3025", "3028"] },
  { codigo: "3043", nombre: "Legislación General", correlativas: ["1026"] },
];

const grid = document.querySelector(".grid");
const estadoMaterias = {};

function crearMateria(m) {
  const div = document.createElement("div");
  div.className = "materia bloqueada";
  div.dataset.codigo = m.codigo;
  div.innerHTML = `
    <div class="codigo">${m.codigo}</div>
    <div class="nombre">${m.nombre}</div>
  `;
  div.addEventListener("click", () => {
    if (!div.classList.contains("bloqueada")) {
      div.classList.toggle("aprobada");
      estadoMaterias[m.codigo] = div.classList.contains("aprobada");
      actualizarDesbloqueo();
    }
  });
  grid.appendChild(div);
  estadoMaterias[m.codigo] = false;
}

function actualizarDesbloqueo() {
  materias.forEach((m) => {
    const div = document.querySelector(`[data-codigo="${m.codigo}"]`);
    const puedeCursarse = m.correlativas.every((cod) => estadoMaterias[cod]);
    if (puedeCursarse || m.correlativas.length === 0) {
      div.classList.remove("bloqueada");
    } else {
      div.classList.remove("aprobada");
      div.classList.add("bloqueada");
      estadoMaterias[m.codigo] = false;
    }
  });
}

materias.forEach(crearMateria);
actualizarDesbloqueo();

