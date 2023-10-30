import { useState, useEffect } from 'react';
import ImageGallery from './ImageGallery';

const IMAGE_COUNT = 12;

function App() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const loadImages = async () => {
      for (let i = 0; i < IMAGE_COUNT; i++) {
        const blob = await fetch('https://picsum.photos/400/400').then(res => res.blob());
        const image = URL.createObjectURL(blob);
        setImages(prev => [ ...prev, image ]);
      }
    }
    loadImages();
  }, []);

  return (
    <div className="app">
      {images.length === IMAGE_COUNT ? <ImageGallery images={images} /> : null}
    </div>
  );
}

export default App;
