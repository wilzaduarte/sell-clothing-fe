import React, { useState, useEffect, useCallback } from 'react';
import './SlideShow.css'; 

const SlideShow = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
 
  // Avança para a próxima imagem
  const nextImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  },[ setCurrentImageIndex, images.length]);

  // Retrocede para a imagem anterior
  const prevImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );

  }, [setCurrentImageIndex, images.length]);

 

  // Autoplay
  useEffect(() => {
    const interval = setInterval(() => nextImage(), 3000); // Altera a cada 3 segundos
    return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
  }, [nextImage]);

  return (
    <div className="slideshow">
      <button className="prev" onClick={prevImage}> &#10094;</button>
   
      <button className="next" onClick={nextImage}>&#10095;</button>
        
      <div className="slides">
          <div  
          >
            <img src={ images[currentImageIndex]} alt={`Slide ${currentImageIndex}`} />
          </div>
       
      </div>
    </div>
  );
};

export default SlideShow;