import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../supabaseClient';

// Simple image loader with spinner and blur effect
const ImageWithProgress = ({ src, alt, aspectRatio, idx }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const stroke = 1;
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover relative z-10 transition-all duration-300"
        style={{
          aspectRatio: aspectRatio || 'auto',
          filter: imgLoaded ? 'none' : 'blur(20px)',
          opacity: imgLoaded ? 1 : 0.6
        }}
        onLoad={() => {
          setImgLoaded(true);
        }}
      />
      {!imgLoaded && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <svg className="animate-spin h-8 w-8 block mx-auto" viewBox="0 0 24 24">
            <path className="opacity-75" fill="none" stroke="#d1d5db" strokeWidth={stroke} strokeLinecap="round" d="M12 2a10 10 0 1 1-10 10" />
          </svg>
        </div>
      )}
    </div>
  );

  // (removed duplicated/invalid block)
};

// Helper to format alt text from filename
const formatAltFromName = (name) => {
  const withoutExtension = name ? name.replace(/\.[^/.]+$/, '') : '';
  const withoutTimestamp = withoutExtension.replace(/-\d+$/, '');
  const spaced = withoutTimestamp.replace(/[-_]+/g, ' ');
  return (spaced.replace(/\b\w/g, (c) => c.toUpperCase()) || 'Gallery Image');
};

// Gallery component
const Gallery = () => {
  // Responsive: show 6 images on mobile, 9 on desktop
  const [isDesktop, setIsDesktop] = useState(() => typeof window !== 'undefined' ? window.innerWidth >= 768 : true);
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [images, setImages] = useState([]);
  const [displayImages, setDisplayImages] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [modalImages, setModalImages] = useState([]);

  // Fetch images from Supabase Storage (bucket: 'CcpC', folder: 'gallery') and update state
  useEffect(() => {
    let isMounted = true;
    const fetchImages = async () => {
      try {
        // List all files in the 'gallery' folder of the 'CcpC' bucket
        const { data, error } = await supabase.storage.from('CcpC').list('gallery', { limit: 100 });
        if (error) throw error;
        if (!data) return;
        // Only keep image files
        const imageFiles = data.filter(item => item.name && /\.(jpg|jpeg|png|gif|webp)$/i.test(item.name));
        const imagePromises = imageFiles.map(async (item) => {
          const { data: urlData } = supabase.storage.from('CcpC').getPublicUrl(`gallery/${item.name}`);
          return {
            src: urlData.publicUrl,
            alt: formatAltFromName(item.name),
            aspectRatio: 1,
          };
        });
        const imageList = await Promise.all(imagePromises);
        // Preload images for instant display
        imageList.forEach(img => {
          const preloadImg = new window.Image();
          preloadImg.src = img.src;
        });
        if (isMounted) {
          setImages(imageList);
          setDisplayImages(imageList);
          setModalImages(imageList);
        }
      } catch (err) {
        console.error('Error fetching images from Supabase:', err);
      }
    };
    fetchImages();
    const interval = setInterval(fetchImages, 10000);
    return () => { isMounted = false; clearInterval(interval); };
  }, []);

  // Assign images to grid areas based on aspect ratio
  const assignGridAreas = (imgList) => {
    if (!imgList || imgList.length === 0) return [];
    const landscape = imgList.filter(img => img.aspectRatio > 1.2);
    const portrait = imgList.filter(img => img.aspectRatio < 0.8);
    const square = imgList.filter(img => img.aspectRatio >= 0.8 && img.aspectRatio <= 1.2);
    const result = [];
    result[0] = landscape[0] || square[0] || portrait[0] || imgList[0];
    result[1] = square[1] || landscape[1] || imgList[1] || imgList[0];
    result[2] = square[2] || imgList[2] || imgList[0];
    result[3] = landscape[2] || square[3] || imgList[3] || imgList[0];
    result[4] = portrait[0] || imgList[4] || imgList[0];
    result[5] = landscape[3] || imgList[5] || imgList[0];
    result[6] = square[4] || imgList[6] || imgList[0];
    result[7] = square[5] || imgList[7] || imgList[0];
    result[8] = imgList[8] || imgList[0];
    return result;
  };

  // Rotate images every 7 seconds (shuffle)
  useEffect(() => {
    if (images.length === 0) return;
    const interval = setInterval(() => {
      const shuffled = [...images].sort(() => 0.5 - Math.random());
      setDisplayImages(assignGridAreas(shuffled));
    }, 7000);
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
      if (Math.abs(diff) > 50) {
        if (diff > 0) nextImage(); else prevImage();
      }
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  const closeModal = useCallback(() => setModalOpen(false), []);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % modalImages.length);
  }, [modalImages.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + modalImages.length) % modalImages.length);
  }, [modalImages.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!modalOpen) return;
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalOpen, nextImage, prevImage, closeModal]);

  const imagesToShow = isDesktop ? 9 : 6;

  return (
    <div className="py-10 px-4 lg:px-16">
      <h1 className="text-white text-4xl text-center mb-8">Gallery</h1>
      <div className="gallery-grid gap-2" style={{ minHeight: '60vh' }}>
        {(displayImages.length > 0 ? displayImages : Array(imagesToShow).fill(null)).slice(0, imagesToShow).map((img, idx) => (
          <div
            key={img?.src || idx}
            className={`overflow-hidden rounded-2xl bg-gray-900/30 backdrop-blur-md border border-white/10 shadow-lg flex items-center justify-center cursor-pointer gallery-cell gallery-cell-${idx}`}
            onClick={() => img ? openModal(modalImages.findIndex(m => m.src === img.src)) : null}
            style={{ position: 'relative', minHeight: '200px' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
            {img ? (
              <ImageWithProgress
                src={img?.src}
                alt={img?.alt}
                aspectRatio={img?.aspectRatio}
                idx={idx}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="h-12 w-12 rounded-xl border border-gray-300/30 bg-white/5 backdrop-blur-md"></div>
              </div>
            )}
          </div>
        ))}
      </div>

      {modalOpen && modalImages.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm" onClick={closeModal}>
          <button onClick={closeModal} className="absolute top-4 right-4 z-50 text-white/80 hover:text-white text-4xl font-light w-12 h-12 flex items-center justify-center rounded-full hover:bg-white/10 transition-all" aria-label="Close modal">×</button>
          <button onClick={(e) => { e.stopPropagation(); prevImage(); }} className="absolute left-4 z-50 text-white/80 hover:text-white text-5xl font-light w-14 h-14 flex items-center justify-center rounded-full hover:bg-white/10 transition-all" aria-label="Previous image">‹</button>
          <div className="relative max-w-7xl max-h-[90vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
            <img src={modalImages[currentImageIndex]?.src} alt={modalImages[currentImageIndex]?.alt} className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl" />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm">{currentImageIndex + 1} / {modalImages.length}</div>
          </div>
          <button onClick={(e) => { e.stopPropagation(); nextImage(); }} className="absolute right-4 z-50 text-white/80 hover:text-white text-5xl font-light w-14 h-14 flex items-center justify-center rounded-full hover:bg-white/10 transition-all" aria-label="Next image">›</button>
        </div>
      )}
    </div>
  );
};

export default Gallery;
