import { useState, useEffect } from 'react';
import './ImageGallery.css';

let io;
const ImageGallery = ({ images }) => {
  const [renderedImages, setRenderedImages] = useState(images.slice(0, 3));
  const [line, setLine] = useState(0);

  useEffect(() => {
    let options = {
      root: document.querySelector('.image-container'),
      rootMargin: '0px',
      threshold: 0.5,
    };
    io = new IntersectionObserver((entries, observer) => {
      if (entries.every(entry => entry.isIntersecting)) {
        setLine(prev => prev + 1);
        entries.forEach(entry => {
          const img = entry.target;
          observer.unobserve(img);
        });
      }
    }, options);
  }, []);

  useEffect(() => {
    if (line === 0) {
      return;
    }
    setRenderedImages(prev => prev.concat(images.slice(line * 3, line * 3 + 3)));
  }, [line]);

  useEffect(() => {
    document.querySelectorAll('img').forEach((el, index) => {
      if (index < line * 3) {
        return;
      }
      io.observe(el);
    });
  }, [renderedImages]);

  return (
    <div className="container">
      <div className="viewport"></div>
      <div className="image-container">
        <div className="empty"></div>
        <div className="wrapper">
          {renderedImages.map((image, index) => <img className={index} src={image} />)}
        </div>
      </div>
    </div>
  )
}

export default ImageGallery;