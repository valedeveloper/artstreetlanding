//Con el getelement selecciona ese div, se almacena en la costante section
//Se valida que haya una section, y con la función se dice: "ve allá"
export const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};


//Aquí es casi lo mismo, pero se le dice ve a, en este caso donde top=0
export const handleBackToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
