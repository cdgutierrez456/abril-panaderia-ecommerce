// Formato internacional sin + ni espacios: es lo que exige wa.me.
// 57 = Colombia.
const WHATSAPP = "573006749548";

export const whatsappUrl = (mensaje: string) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensaje)}`;

// El número se muestra derivado de la constante, no escrito aparte: cambiarlo
// arriba lo cambia en el pie, en "Visítanos" y en el botón de llamar.
export const telefono = WHATSAPP.replace(/^57/, "");
export const telefonoLegible = telefono.replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3");
export const telUrl = `tel:+${WHATSAPP}`;

export const NEGOCIO = {
  nombre: "Abril Pastelería",
  direccion: "Av. Principal La Sultana",
  ciudad: "Manizales, Caldas",
  email: "hola@abrilpasteleria.co",
  horarios: [
    { dias: "Lunes a sábado", horas: "7:00 – 20:00" },
    { dias: "Domingos", horas: "8:00 – 15:00" },
    { dias: "Domicilios", horas: "Toda la ciudad" },
  ],
};

export const REDES = {
  instagram:
    "https://www.instagram.com/scale.automatization/?utm_source=ig_web_button_share_sheet",
  // ponytail: sin página propia todavía; apunta al inicio de Facebook.
  facebook: "https://facebook.com",
};
