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
  const [images, setImages] = useState([]);
  const [displayImages, setDisplayImages] = useState([]); // 8 images for grid
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [modalImages, setModalImages] = useState([]); // Separate state for modal images

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

  return (
    <div className="py-10 px-4 lg:px-16"> 
      <h1 className="text-white text-4xl text-center mb-8">Gallery</h1>
      {images.length === 0 ? (
        <div className="text-center text-gray-400">
          {error ? 'No images to display right now. Please check back soon.' : 'No images in gallery yet.'}
        </div>
      ) : (
        <div
          className="grid grid-cols-6 grid-rows-4 gap-2"
          style={{ minHeight: '60vh' }}
        >
          {/* a: cols 1-3, rows 1-2 (landscape preferred) */}
          <div className="overflow-hidden rounded-2xl bg-gray-900/70 border border-white/5 shadow-lg col-span-3 row-span-2 flex items-center justify-center cursor-pointer"
            style={{ gridColumn: '1/4', gridRow: '1/3' }}
            onClick={() => openModal(displayImages[0] ? modalImages.findIndex(img => img.src === displayImages[0].src) : 0)}>
            <img src={displayImages[0]?.src} alt={displayImages[0]?.alt} className="w-full h-full object-cover" style={{ aspectRatio: displayImages[0]?.aspectRatio || 'auto' }} loading="lazy" />
          </div>
          {/* b: cols 4, row 1 (square preferred) */}
          <div className="overflow-hidden rounded-2xl bg-gray-900/70 border border-white/5 shadow-lg col-span-1 row-span-1 flex items-center justify-center cursor-pointer"
            style={{ gridColumn: '4/5', gridRow: '1/2' }}
            onClick={() => openModal(displayImages[1] ? modalImages.findIndex(img => img.src === displayImages[1].src) : 0)}>
            <img src={displayImages[1]?.src} alt={displayImages[1]?.alt} className="w-full h-full object-cover" style={{ aspectRatio: displayImages[1]?.aspectRatio || '1/1' }} loading="lazy" />
          </div>
          {/* i: cols 4, row 2 (square preferred) */}
          <div className="overflow-hidden rounded-2xl bg-gray-900/70 border border-white/5 shadow-lg col-span-1 row-span-1 flex items-center justify-center cursor-pointer"
            style={{ gridColumn: '4/5', gridRow: '2/3' }}
            onClick={() => openModal(displayImages[2] ? modalImages.findIndex(img => img.src === displayImages[2].src) : 0)}>
            <img src={displayImages[2]?.src} alt={displayImages[2]?.alt} className="w-full h-full object-cover" style={{ aspectRatio: displayImages[2]?.aspectRatio || '1/1' }} loading="lazy" />
          </div>
          {/* c: cols 5-6, row 1 (landscape preferred) */}
          <div className="overflow-hidden rounded-2xl bg-gray-900/70 border border-white/5 shadow-lg col-span-2 row-span-1 flex items-center justify-center cursor-pointer"
            style={{ gridColumn: '5/7', gridRow: '1/2' }}
            onClick={() => openModal(displayImages[3] ? modalImages.findIndex(img => img.src === displayImages[3].src) : 0)}>
            <img src={displayImages[3]?.src} alt={displayImages[3]?.alt} className="w-full h-full object-cover" style={{ aspectRatio: displayImages[3]?.aspectRatio || 'auto' }} loading="lazy" />
          </div>
          {/* d: cols 5-6, row 2-3 (portrait preferred) */}
          <div className="overflow-hidden rounded-2xl bg-gray-900/70 border border-white/5 shadow-lg col-span-2 row-span-2 flex items-center justify-center cursor-pointer"
            style={{ gridColumn: '5/7', gridRow: '2/4' }}
            onClick={() => openModal(displayImages[4] ? modalImages.findIndex(img => img.src === displayImages[4].src) : 0)}>
            <img src={displayImages[4]?.src} alt={displayImages[4]?.alt} className="w-full h-full object-cover" style={{ aspectRatio: displayImages[4]?.aspectRatio || 'auto' }} loading="lazy" />
          </div>
          {/* e: cols 1-2, rows 3-4 (landscape preferred) */}
          <div className="overflow-hidden rounded-2xl bg-gray-900/70 border border-white/5 shadow-lg col-span-2 row-span-2 flex items-center justify-center cursor-pointer"
            style={{ gridColumn: '1/3', gridRow: '3/5' }}
            onClick={() => openModal(displayImages[5] ? modalImages.findIndex(img => img.src === displayImages[5].src) : 0)}>
            <img src={displayImages[5]?.src} alt={displayImages[5]?.alt} className="w-full h-full object-cover" style={{ aspectRatio: displayImages[5]?.aspectRatio || 'auto' }} loading="lazy" />
          </div>
          {/* f: cols 3-4, row 3 (square/landscape) */}
          <div className="overflow-hidden rounded-2xl bg-gray-900/70 border border-white/5 shadow-lg col-span-2 row-span-1 flex items-center justify-center cursor-pointer"
            style={{ gridColumn: '3/5', gridRow: '3/4' }}
            onClick={() => openModal(displayImages[6] ? modalImages.findIndex(img => img.src === displayImages[6].src) : 0)}>
            <img src={displayImages[6]?.src} alt={displayImages[6]?.alt} className="w-full h-full object-cover" style={{ aspectRatio: displayImages[6]?.aspectRatio || 'auto' }} loading="lazy" />
          </div>
          {/* g: cols 3-4, row 4 (square/landscape) */}
          <div className="overflow-hidden rounded-2xl bg-gray-900/70 border border-white/5 shadow-lg col-span-2 row-span-1 flex items-center justify-center cursor-pointer"
            style={{ gridColumn: '3/5', gridRow: '4/5' }}
            onClick={() => openModal(displayImages[7] ? modalImages.findIndex(img => img.src === displayImages[7].src) : 0)}>
            <img src={displayImages[7]?.src} alt={displayImages[7]?.alt} className="w-full h-full object-cover" style={{ aspectRatio: displayImages[7]?.aspectRatio || 'auto' }} loading="lazy" />
          </div>
          {/* h: cols 5-6, row 4 (square/landscape) */}
                    <div className="overflow-hidden rounded-2xl bg-gray-900/70 border border-white/5 shadow-lg col-span-2 row-span-1 flex items-center justify-center cursor-pointer"
            style={{ gridColumn: '5/7', gridRow: '4/5' }}
            onClick={() => openModal(displayImages[8] ? modalImages.findIndex(img => img.src === displayImages[8].src) : 0)}>
            <img src={displayImages[8]?.src} alt={displayImages[8]?.alt} className="w-full h-full object-cover" style={{ aspectRatio: displayImages[8]?.aspectRatio || 'auto' }} loading="lazy" />
          </div>
        </div>
      )}

      {/* Modal Viewer */}
      {modalOpen && modalImages.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm" onClick={closeModal}>
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

          {/* Image Container */}
          <div className="relative max-w-7xl max-h-[90vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
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
