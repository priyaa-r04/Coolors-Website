import React from 'react';
import { Button } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';

interface InputFileUploadProps {
  onUpload: (file: File) => void;  // Callback to handle the file upload
}

const InputFileUpload: React.FC<InputFileUploadProps> = ({ onUpload }) => {
  // Handle file selection and pass the file to parent component
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onUpload(file); // Pass the selected file to parent
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
        style={{ display: 'none' }}  // Hide the default file input element
      />
    </Button>
  );
};

export default InputFileUpload;
