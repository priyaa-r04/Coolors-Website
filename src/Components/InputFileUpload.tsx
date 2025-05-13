import React from 'react';
import { Button } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';

interface InputFileUploadProps {
  onUpload: (file: File) => void;  
}

const InputFileUpload: React.FC<InputFileUploadProps> = ({ onUpload }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onUpload(file); 
    }
  };

  return (
    <Button
      component="label"
      variant="outlined"
      startIcon={<CloudUpload />}
      sx={{ width: '100%', justifyContent: 'center' }}
    >
      Upload Image
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}  
      />
    </Button>
  );
};

export default InputFileUpload;
