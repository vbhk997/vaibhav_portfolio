import React, { useState, useEffect, useCallback } from 'react';
import './GalleryModal.css';

const GalleryModal = ({ isOpen, onClose, images, projectTitle, initialIndex = 0 }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
    }
  }, [isOpen, initialIndex]);

  const nextImage = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, [images.length]);

  const prevImage = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }, [images.length]);

  const goToImage = (index) => {
    setCurrentIndex(index);
  };

  // Helper function to determine if a file is a video
  const isVideo = (url) => {
    return url && (url.endsWith('.mp4') || url.endsWith('.webm') || url.endsWith('.ogg') || url.endsWith('.mov'));
  };

  // Infer a MIME type from extension for better compatibility
  const getVideoType = (url) => {
    if (!url) return undefined;
    if (url.endsWith('.mp4') || url.endsWith('.mov')) return 'video/mp4';
    if (url.endsWith('.webm')) return 'video/webm';
    if (url.endsWith('.ogg')) return 'video/ogg';
    return undefined;
  };

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'Escape') onClose();
  }, [prevImage, nextImage, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !images || images.length === 0) return null;

  return (
    <div className="gallery-modal-overlay" onClick={onClose}>
      <div className="gallery-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="gallery-modal-header">
          <h2 className="gallery-modal-title">Project Gallery</h2>
          <p className="gallery-modal-subtitle">{projectTitle}</p>
          <button className="gallery-modal-close" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <div className="gallery-main-container">
          <button className="gallery-nav-button gallery-nav-prev" onClick={prevImage}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className="gallery-main-image-container">
            {isVideo(images[currentIndex]) ? (
              <video
                key={images[currentIndex]} 
                className="gallery-main-image"
                controls
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              >
                <source src={images[currentIndex]} type={getVideoType(images[currentIndex])} />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img 
                src={images[currentIndex]} 
                alt={`Gallery ${currentIndex + 1}`}
                className="gallery-main-image"
              />
            )}
            <div className="gallery-image-counter">
              {currentIndex + 1} / {images.length}
            </div>
          </div>
          <button className="gallery-nav-button gallery-nav-next" onClick={nextImage}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <div className="gallery-thumbnails-container">
          <div className="gallery-thumbnails">
            {images.map((image, index) => (
              <button
                key={index}
                className={`gallery-thumbnail ${index === currentIndex ? 'active' : ''}`}
                onClick={() => goToImage(index)}
              >
                {isVideo(image) ? (
                  <video
                    key={image}
                    className="gallery-thumbnail-image"
                    muted
                    playsInline
                    preload="metadata"
                  >
                    {/* FIX: Appending #t=0.1 forces the browser to show the first frame as a thumbnail */}
                    <source src={`${image}#t=0.1`} type={getVideoType(image)} />
                  </video>
                ) : (
                  <img 
                    src={image} 
                    alt={`Thumbnail ${index + 1}`}
                    className="gallery-thumbnail-image"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
        <div className="gallery-modal-footer">
          <div className="gallery-controls-info">
            <p>🖱️ Click thumbnails to navigate</p>
            <p>⌨️ Use arrow keys or click navigation buttons</p>
            <p>⌨️ Press ESC to close</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryModal;