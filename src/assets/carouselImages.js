// Importa automáticamente todas las imágenes de la carpeta @assets/images
const images = import.meta.glob('./*.{jpg,jpeg,png,gif}', { eager: true });
console.log(images); // verifica que aparezcan todas las imágenes
// Convierte el objeto en un arreglo con las rutas
export const carouselImages = Object.values(images).map((module) => module.default);
