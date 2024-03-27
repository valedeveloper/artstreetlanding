// Función para construir el enlace de WhatsApp
export const buildWhatsAppLink = () => {
  const phoneNumber = "3170299336";
  const message = "Hola, Art Street. Quiero más información de tu servicio";
  const whatsAppUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
    message
  )}`;
  console.log("Damco");

  window.open(whatsAppUrl, "_blank");
};
