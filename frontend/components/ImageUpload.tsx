'use client';

import { useState, useRef } from 'react';
import { uploadRecipeImage, deleteRecipeImage, updateRecipeImage } from '@/lib/api';

interface ImageUploadProps {
  recipeId?: string;
  currentImageUrl?: string | null;
  onImageUploaded?: (imageUrl: string) => void;
  onImageChange?: (file: File | null) => void;
}

export default function ImageUpload({ recipeId, currentImageUrl, onImageUploaded, onImageChange }: ImageUploadProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(currentImageUrl || null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validation
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setError('Image must be less than 5MB');
      return;
    }

    setError('');

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);

    // If recipeId is provided, upload immediately
    if (recipeId) {
      setUploading(true);
      try {
        console.log('Starting image upload for recipe:', recipeId);
        const url = await uploadRecipeImage(file, recipeId);
        console.log('Image uploaded to storage, URL:', url);
        
        setImageUrl(url);
        
        console.log('Updating recipe with image URL...');
        await updateRecipeImage(recipeId, url);
        console.log('Recipe updated successfully!');
        
        if (onImageUploaded) onImageUploaded(url);
        setPreviewUrl(null);
      } catch (err: any) {
        console.error('Image upload error:', err);
        setError(err.message || 'Failed to upload image');
      } finally {
        setUploading(false);
      }
    } else {
      // Pass file to parent for later upload
      if (onImageChange) onImageChange(file);
    }
  };

  const handleRemove = async () => {
    if (imageUrl && recipeId) {
      try {
        await deleteRecipeImage(imageUrl);
        await updateRecipeImage(recipeId, '');
        setImageUrl(null);
        if (onImageUploaded) onImageUploaded('');
      } catch (err: any) {
        setError(err.message || 'Failed to remove image');
      }
    } else {
      setPreviewUrl(null);
      if (onImageChange) onImageChange(null);
    }
  };

  const displayUrl = previewUrl || imageUrl;

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-text-primary">
        📸 Recipe Image (optional)
      </label>

      {displayUrl ? (
        <div className="relative">
          <img
            src={displayUrl}
            alt="Recipe"
            className="w-full h-48 object-cover rounded-lg border border-border"
          />
          {!uploading && (
            <button
              onClick={handleRemove}
              className="absolute top-2 right-2 p-2 bg-error hover:bg-error/90 text-white rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          {uploading && (
            <div className="absolute inset-0 bg-background/80 rounded-lg flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
            </div>
          )}
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-accent hover:bg-muted transition-colors"
        >
          <svg className="w-12 h-12 text-text-secondary mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-sm text-text-primary font-medium mb-1">Click to upload image</p>
          <p className="text-xs text-text-secondary">PNG, JPG, GIF or WEBP up to 5MB</p>
        </div>
      )}

      {error && (
        <p className="text-sm text-error">{error}</p>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}

