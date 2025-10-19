// ...existing code...

// Place this after all imports and before Gallery component
import React, { useState, useEffect, useCallback } from 'react';
import { storage } from '../../firebaseConfig';
import { ref, listAll, getDownloadURL, getMetadata } from 'firebase/storage';

// Circular progress image loader
const ImageWithProgress = ({ src, alt, aspectRatio, idx, imgLoading, setImgLoading }) => {
  const [progress, setProgress] = useState(0);
  const [xhrDone, setXhrDone] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  useEffect(() => {
    let xhr;
  setProgress(0); // Start at 0% for dynamic loader
  setXhrDone(false);
  setImgLoaded(false);
    let objectUrl = null;
    xhr = new window.XMLHttpRequest();
    xhr.open('GET', src, true);
    xhr.responseType = 'blob';
    xhr.onprogress = (e) => {
      if (e.lengthComputable) {
        setProgress(Math.round((e.loaded / e.total) * 100));
      }
    };
    xhr.onload = () => {
      setProgress(100);
      setXhrDone(true);
      objectUrl = URL.createObjectURL(xhr.response);
      setBlobUrl(objectUrl);
    };
    xhr.onerror = () => {
      setXhrDone(true);
    };
    xhr.send();
    return () => {
      if (xhr) xhr.abort();
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [src, idx, setImgLoading]);

  const [blobUrl, setBlobUrl] = useState(null);

  // SVG circle progress
  const radius = 24;
  const stroke = 2;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <img
        src={blobUrl || src}
        alt={alt}
        className="w-full h-full object-cover relative z-10 transition-all duration-300"
        style={{
          aspectRatio: aspectRatio || 'auto',
          filter: imgLoaded ? 'none' : 'blur(20px)',
          opacity: imgLoaded ? 1 : 0.6
        }}
        onError={e => { if (blobUrl) e.target.src = src; }}
        onLoad={() => {
          setImgLoaded(true);
          setImgLoading(l => ({ ...l, [idx]: false }));
        }}
      />
      {!(xhrDone && imgLoaded) && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          {progress > 0 ? (
            <>
              <svg height={radius * 2} width={radius * 2}>
                <circle
                  stroke="#d1d5db"
                  fill="transparent"
                  strokeWidth={stroke}
                  r={normalizedRadius}
                  cx={radius}
                  cy={radius}
                  style={{ opacity: 0.5 }}
                />
                <circle
                  stroke="#d1d5db"
                  fill="transparent"
                  strokeWidth={stroke}
                  r={normalizedRadius}
                  cx={radius}
                  cy={radius}
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  style={{ transition: 'stroke-dashoffset 0.3s', opacity: 1 }}
                />
              </svg>
              <span className="absolute text-xs text-gray-300" style={{ top: '60%', left: '50%', transform: 'translate(-50%, -50%)' }}>{progress}%</span>
            </>
          ) : (
            <svg className="animate-spin h-8 w-8 block mx-auto" viewBox="0 0 24 24">
              <path className="opacity-75" fill="none" stroke="#d1d5db" strokeWidth="1" strokeLinecap="round" d="M12 2a10 10 0 1 1-10 10" />
            </svg>
          )}
        </div>
      )}
    </div>
  );
};


// Helper for browser cache
const CACHE_KEY = 'ccpc_gallery_images_v1';

async function getCachedImages() {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      return JSON.parse(cached);
    }
  } catch (e) {}
  return null;
}

async function setCachedImages(images) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(images));
  } catch (e) {}
}

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
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [modalImages, setModalImages] = useState([]); // Separate state for modal images
  // Track loading state for each image
  const [imgLoading, setImgLoading] = useState({});

  useEffect(() => {
    let isMounted = true;

    // 1. Try to load from cache first
    (async () => {
      const cached = await getCachedImages();
      if (isMounted && cached && Array.isArray(cached) && cached.length > 0) {
        setImages(cached);
        setDisplayImages(cached);
        setModalImages(cached);
      }
    })();

    // 2. Always fetch from Firebase in background and update cache
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
          setDisplayImages(imageList);
          setModalImages(imageList);
          setCachedImages(imageList);
        }
      } catch (err) {
        if (isMounted) {
          console.error('Error fetching images:', err);
        }
      } finally {
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
    }, 7000); // 7 seconds
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

  // Always show image cards, even if loading


  // Responsive: show 6 images on mobile, 9 on desktop
  // (removed duplicate isDesktop declaration)
  const imagesToShow = isDesktop ? 9 : 6;

  return (
    <div className="py-10 px-4 lg:px-16">
      <h1 className="text-white text-4xl text-center mb-8">Gallery</h1>
      <div
        className="gallery-grid gap-2"
        style={{ minHeight: '60vh' }}
      >
        {(displayImages.length > 0 ? displayImages : Array(imagesToShow).fill(null)).slice(0, imagesToShow).map((img, idx) => (
          <div
            key={img?.src || idx}
            className={`overflow-hidden rounded-2xl bg-gray-900/30 backdrop-blur-md border border-white/10 shadow-lg flex items-center justify-center cursor-pointer gallery-cell gallery-cell-${idx}`}
            onClick={() => img ? openModal(modalImages.findIndex(m => m.src === img.src)) : null}
            style={{ position: 'relative', minHeight: '200px' }}
          >
            {/* Glassomorphism background placeholder */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
            {img ? (
              <>
                <ImageWithProgress
                  src={img?.src}
                  alt={img?.alt}
                  aspectRatio={img?.aspectRatio}
                  idx={idx}
                  imgLoading={imgLoading}
                  setImgLoading={setImgLoading}
                />
              </>
            ) : (
              // Placeholder for empty slot
              <div className="w-full h-full flex items-center justify-center">
                <div className="h-12 w-12 rounded-xl border border-gray-300/30 bg-white/5 backdrop-blur-md"></div>
              </div>
            )}
          </div>
        ))}
      </div>

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
