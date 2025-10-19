import React, { useState, useEffect, useCallback } from 'react';
import { storage } from '../../firebaseConfig';
import { ref, listAll, getDownloadURL, getMetadata } from 'firebase/storage';

const formatAltFromName = (name) => {
  const withoutExtension = name.replace(/\.[^/.]+$/, '');
  const withoutTimestamp = withoutExtension.replace(/-\d+$/, '');
  const spaced = withoutTimestamp.replace(/[-_]+/g, ' ');
  return spaced.replace(/\b\w/g, (char) => char.toUpperCase()) || 'Gallery Image';
};


const Gallery = () => {
  // Responsive: show 6 images on mobile, 9 on desktop
  const [isDesktop, setIsDesktop] = useState(() => typeof window !== 'undefined' ? window.innerWidth >= 768 : true);
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [images, setImages] = useState([]);
  const [displayImages, setDisplayImages] = useState([]); // 8 images for grid
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [modalImages, setModalImages] = useState([]); // Separate state for modal images
  // Track loading state for each image
  const [imgLoading, setImgLoading] = useState({});

  useEffect(() => {
    let isMounted = true;
    let isInitialLoad = true;
    const fetchImages = async () => {
      try {
        const storageRef = ref(storage, 'gallery/');
        const result = await listAll(storageRef);
        const imagePromises = result.items.map(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          const metadata = await getMetadata(itemRef);
          const altFromMetadata = metadata.customMetadata?.alt;
          // Detect aspect ratio
          return new Promise((resolve) => {
            const img = new window.Image();
            img.src = url;
            img.onload = () => {
              const aspectRatio = img.width / img.height;
              resolve({
                src: url,
                alt: altFromMetadata || formatAltFromName(itemRef.name),
                aspectRatio,
              });
            };
            img.onerror = () => {
              resolve({
                src: url,
                alt: altFromMetadata || formatAltFromName(itemRef.name),
                aspectRatio: 1,
              });
            };
          });
        });
        let imageList = await Promise.all(imagePromises);
        // Remove limit, show all images
        if (isMounted) {
          setImages(imageList);
          // Only set displayImages on initial load, not on re-fetch
          if (isInitialLoad) {
            setDisplayImages(imageList);
            setModalImages(imageList); // Set modal images on initial load
            isInitialLoad = false;
          } else {
            // Update modal images on re-fetch without disrupting modal
            setModalImages(imageList);
          }
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          console.error('Error fetching images:', err);
          setError('Gallery is temporarily unavailable.');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchImages();
    const interval = setInterval(fetchImages, 10000); // re-fetch every 10s
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // Assign images to grid areas based on aspect ratio
  const assignGridAreas = (imgList) => {
    // Sort images by aspect ratio: landscape > square > portrait
    const landscape = imgList.filter(img => img.aspectRatio > 1.2);
    const portrait = imgList.filter(img => img.aspectRatio < 0.8);
    const square = imgList.filter(img => img.aspectRatio >= 0.8 && img.aspectRatio <= 1.2);
    // Assign to grid: a, b, i, c, d, e, f, g, h
    // a: large area, landscape only
    // b: square area, prefer square
    // i: square area, prefer square
    // c: wide area, landscape only
    // d: tall area, portrait only
    // e: wide area, landscape only
    // f,g,h: square areas, prefer square
    const result = [];
    result[0] = landscape[0] || landscape[1] || square[0] || portrait[0]; // a
    result[3] = landscape[1] || landscape[2] || square[1] || portrait[1]; // c
    result[5] = landscape[2] || landscape[3] || square[2] || portrait[2]; // e
    result[4] = portrait[0] || portrait[1] || landscape[4] || square[3]; // d
    // Fill square areas
    result[1] = square[0] || landscape[5] || portrait[2]; // b
    result[2] = square[1] || landscape[6] || portrait[3]; // i
    result[6] = square[2] || landscape[7] || portrait[4]; // f
    result[7] = square[3] || landscape[8] || portrait[5]; // g
    result[8] = square[4] || landscape[9] || portrait[6]; // h
    // Fill missing slots with any image
    for (let i = 0; i < 9; i++) {
      if (!result[i]) {
        result[i] = imgList[i] || imgList[0];
      }
    }
    return result;
  };

  // Rotate images every 5 seconds
  useEffect(() => {
    if (images.length === 0) return;
    const interval = setInterval(() => {
      // Shuffle and assign grid areas
      const shuffled = [...images].sort(() => 0.5 - Math.random());
      setDisplayImages(assignGridAreas(shuffled));
    }, 5000);
    return () => clearInterval(interval);
  }, [images]);


  // Modal handlers
  const openModal = (index) => {
    setCurrentImageIndex(index);
    setModalOpen(true);
  };

  // Swipe gesture state for modal
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  // Handle swipe in modal
  const handleTouchStart = (e) => {
    if (e.touches && e.touches.length === 1) {
      setTouchStartX(e.touches[0].clientX);
      setTouchEndX(null);
    }
  };
  const handleTouchMove = (e) => {
    if (e.touches && e.touches.length === 1) {
      setTouchEndX(e.touches[0].clientX);
    }
  };
  const handleTouchEnd = () => {
    if (touchStartX !== null && touchEndX !== null) {
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) { // minimum swipe distance
        if (diff > 0) {
          // Swiped left
          nextImage();
        } else {
          // Swiped right
          prevImage();
        }
      }
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % modalImages.length);
  }, [modalImages.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + modalImages.length) % modalImages.length);
  }, [modalImages.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!modalOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalOpen, nextImage, prevImage, closeModal]);

  if (loading) {
    return (
      <div className="py-10 px-4 lg:px-16">
        <h1 className="text-white text-4xl text-center mb-8">Gallery</h1>
        <div className="flex justify-center items-center h-40">
          <svg className="animate-spin h-10 w-10 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
          </svg>
        </div>
      </div>
    );
  }


  // Responsive: show 6 images on mobile, 9 on desktop
  // (removed duplicate isDesktop declaration)
  const imagesToShow = isDesktop ? 9 : 6;

  return (
    <div className="py-10 px-4 lg:px-16">
      <h1 className="text-white text-4xl text-center mb-8">Gallery</h1>
      {images.length === 0 ? (
        <div className="text-center text-gray-400">
          {error ? 'No images to display right now. Please check back soon.' : 'No images in gallery yet.'}
        </div>
      ) : (
        <div
          className="gallery-grid gap-2"
          style={{ minHeight: '60vh' }}
        >
          {displayImages.slice(0, imagesToShow).map((img, idx) => (
            <div
              key={img?.src || idx}
              className={`overflow-hidden rounded-2xl bg-gray-900/70 border border-white/5 shadow-lg flex items-center justify-center cursor-pointer gallery-cell gallery-cell-${idx}`}
              onClick={() => openModal(img ? modalImages.findIndex(m => m.src === img.src) : 0)}
              style={{ position: 'relative' }}
            >
              <img
                src={img?.src}
                alt={img?.alt}
                className="w-full h-full object-cover"
                style={{ aspectRatio: img?.aspectRatio || 'auto', filter: imgLoading[idx] === false ? 'none' : 'blur(10px)' }}
                loading="lazy"
                onLoad={() => setImgLoading(l => ({ ...l, [idx]: false }))}
                onError={() => setImgLoading(l => ({ ...l, [idx]: false }))}
              />
              {imgLoading[idx] !== false && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <svg className="animate-spin h-8 w-8 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Modal Viewer */}
      {modalOpen && modalImages.length > 0 && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
          onClick={closeModal}
        >
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 z-50 text-white/80 hover:text-white text-4xl font-light w-12 h-12 flex items-center justify-center rounded-full hover:bg-white/10 transition-all"
            aria-label="Close modal"
          >
            ×
          </button>

          {/* Previous Button */}
          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 z-50 text-white/80 hover:text-white text-5xl font-light w-14 h-14 flex items-center justify-center rounded-full hover:bg-white/10 transition-all"
            aria-label="Previous image"
          >
            ‹
          </button>

          {/* Image Container with swipe handlers */}
          <div
            className="relative max-w-7xl max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <img
              src={modalImages[currentImageIndex]?.src}
              alt={modalImages[currentImageIndex]?.alt}
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            />
            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm">
              {currentImageIndex + 1} / {modalImages.length}
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 z-50 text-white/80 hover:text-white text-5xl font-light w-14 h-14 flex items-center justify-center rounded-full hover:bg-white/10 transition-all"
            aria-label="Next image"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
};

export default Gallery;
