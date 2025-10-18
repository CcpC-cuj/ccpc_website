import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
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
  imageList = imageList.slice(0, 8); // max 8 images
  setImages(imageList);
  setDisplayImages(imageList); // initial display: all 8
        setError(null);
      } catch (err) {
        console.error('Error fetching images:', err);
        setError('Gallery is temporarily unavailable.');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
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

  // Rotate images every 3 seconds
  useEffect(() => {
    if (images.length < 9) return;
    const interval = setInterval(() => {
      // Shuffle and assign grid areas
      const shuffled = [...images].sort(() => 0.5 - Math.random());
      setDisplayImages(assignGridAreas(shuffled));
    }, 3000);
    return () => clearInterval(interval);
  }, [images]);

  if (loading) {
    return (
      <div className="py-10 px-4 lg:px-16">
        <h1 className="text-white text-4xl text-center mb-8">Gallery</h1>
        <div className="text-center text-gray-400">Loading images...</div>
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
          <div className="overflow-hidden rounded-2xl bg-gray-900/70 border border-white/5 shadow-lg col-span-3 row-span-2 flex items-center justify-center"
            style={{ gridColumn: '1/4', gridRow: '1/3' }}>
            <img src={displayImages[0]?.src} alt={displayImages[0]?.alt} className="w-full h-full object-cover" style={{ aspectRatio: displayImages[0]?.aspectRatio || 'auto' }} />
          </div>
          {/* b: cols 4, row 1 (square preferred) */}
          <div className="overflow-hidden rounded-2xl bg-gray-900/70 border border-white/5 shadow-lg col-span-1 row-span-1 flex items-center justify-center"
            style={{ gridColumn: '4/5', gridRow: '1/2' }}>
            <img src={displayImages[1]?.src} alt={displayImages[1]?.alt} className="w-full h-full object-cover" style={{ aspectRatio: displayImages[1]?.aspectRatio || '1/1' }} />
          </div>
          {/* i: cols 4, row 2 (square preferred) */}
          <div className="overflow-hidden rounded-2xl bg-gray-900/70 border border-white/5 shadow-lg col-span-1 row-span-1 flex items-center justify-center"
            style={{ gridColumn: '4/5', gridRow: '2/3' }}>
            <img src={displayImages[2]?.src} alt={displayImages[2]?.alt} className="w-full h-full object-cover" style={{ aspectRatio: displayImages[2]?.aspectRatio || '1/1' }} />
          </div>
          {/* c: cols 5-6, row 1 (landscape preferred) */}
          <div className="overflow-hidden rounded-2xl bg-gray-900/70 border border-white/5 shadow-lg col-span-2 row-span-1 flex items-center justify-center"
            style={{ gridColumn: '5/7', gridRow: '1/2' }}>
            <img src={displayImages[3]?.src} alt={displayImages[3]?.alt} className="w-full h-full object-cover" style={{ aspectRatio: displayImages[3]?.aspectRatio || 'auto' }} />
          </div>
          {/* d: cols 5-6, row 2-3 (portrait preferred) */}
          <div className="overflow-hidden rounded-2xl bg-gray-900/70 border border-white/5 shadow-lg col-span-2 row-span-2 flex items-center justify-center"
            style={{ gridColumn: '5/7', gridRow: '2/4' }}>
            <img src={displayImages[4]?.src} alt={displayImages[4]?.alt} className="w-full h-full object-cover" style={{ aspectRatio: displayImages[4]?.aspectRatio || 'auto' }} />
          </div>
          {/* e: cols 1-2, rows 3-4 (landscape preferred) */}
          <div className="overflow-hidden rounded-2xl bg-gray-900/70 border border-white/5 shadow-lg col-span-2 row-span-2 flex items-center justify-center"
            style={{ gridColumn: '1/3', gridRow: '3/5' }}>
            <img src={displayImages[5]?.src} alt={displayImages[5]?.alt} className="w-full h-full object-cover" style={{ aspectRatio: displayImages[5]?.aspectRatio || 'auto' }} />
          </div>
          {/* f: cols 3-4, row 3 (square/landscape) */}
          <div className="overflow-hidden rounded-2xl bg-gray-900/70 border border-white/5 shadow-lg col-span-2 row-span-1 flex items-center justify-center"
            style={{ gridColumn: '3/5', gridRow: '3/4' }}>
            <img src={displayImages[6]?.src} alt={displayImages[6]?.alt} className="w-full h-full object-cover" style={{ aspectRatio: displayImages[6]?.aspectRatio || 'auto' }} />
          </div>
          {/* g: cols 3-4, row 4 (square/landscape) */}
          <div className="overflow-hidden rounded-2xl bg-gray-900/70 border border-white/5 shadow-lg col-span-2 row-span-1 flex items-center justify-center"
            style={{ gridColumn: '3/5', gridRow: '4/5' }}>
            <img src={displayImages[7]?.src} alt={displayImages[7]?.alt} className="w-full h-full object-cover" style={{ aspectRatio: displayImages[7]?.aspectRatio || 'auto' }} />
          </div>
          {/* h: cols 5-6, row 4 (square/landscape) */}
          <div className="overflow-hidden rounded-2xl bg-gray-900/70 border border-white/5 shadow-lg col-span-2 row-span-1 flex items-center justify-center"
            style={{ gridColumn: '5/7', gridRow: '4/5' }}>
            <img src={displayImages[8]?.src} alt={displayImages[8]?.alt} className="w-full h-full object-cover" style={{ aspectRatio: displayImages[8]?.aspectRatio || 'auto' }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
