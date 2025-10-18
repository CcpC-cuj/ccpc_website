import React, { useState, useEffect } from 'react';
import { storage } from '../../firebaseConfig';
import { ref, listAll, getDownloadURL, getMetadata, getBlob } from 'firebase/storage';
import heic2any from 'heic2any';

const formatAltFromName = (name) => {
  const withoutExtension = name.replace(/\.[^/.]+$/, '');
  const withoutTimestamp = withoutExtension.replace(/-\d+$/, '');
  const spaced = withoutTimestamp.replace(/[-_]+/g, ' ');
  return spaced.replace(/\b\w/g, (char) => char.toUpperCase()) || 'Gallery Image';
};

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const storageRef = ref(storage, 'gallery/');
        const result = await listAll(storageRef);
        const imagePromises = result.items.map(async (itemRef) => {
          const metadata = await getMetadata(itemRef);
          const altFromMetadata = metadata.customMetadata?.alt;
          let src;
          if (itemRef.name.toLowerCase().endsWith('.heic') || metadata.contentType === 'image/heic') {
            try {
              const blob = await getBlob(itemRef);
              const convertedBlob = await heic2any({ blob });
              src = URL.createObjectURL(convertedBlob);
            } catch (error) {
              console.error('Error converting HEIC:', error);
              // Fallback to download URL
              src = await getDownloadURL(itemRef);
            }
          } else {
            src = await getDownloadURL(itemRef);
          }
          return { src, alt: altFromMetadata || formatAltFromName(itemRef.name) };
        });
        const imageList = await Promise.all(imagePromises);
        setImages(imageList);
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
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="break-inside-avoid overflow-hidden rounded-2xl bg-gray-900/70 border border-white/5 shadow-lg transition-transform duration-300 hover:-translate-y-1"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;
