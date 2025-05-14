import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';

interface InputFileUploadProps {
  onUpload: (file: File) => void;
}

const InputFileUpload: React.FC<InputFileUploadProps> = ({ onUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type (optional: checking for image files)
      if (!file.type.startsWith('image/')) {
        setError('Please upload a valid image file.');
        return;
      }
      
      setSelectedFile(file);
      setError(null); // Reset error on valid file
      onUpload(file); // Call the onUpload function with the file
    }
  };

  return (
    <div>
      <Button
        component="label"
        variant="outlined"
        startIcon={<CloudUpload />}
        sx={{
          width: '100%',
          justifyContent: 'center',
          maxWidth: 250,  // Optional: limit button width on large screens
        }}
      >
        Upload Image
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </Button>

      {selectedFile && (
        <Typography variant="body2" sx={{ mt: 2 }}>
          Selected file: {selectedFile.name}
        </Typography>
      )}

      {error && (
        <Typography variant="body2" color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
    </div>
  );
};

export default InputFileUpload;
