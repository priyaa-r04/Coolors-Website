import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Typography, Paper, Box, CircularProgress } from '@mui/material';
import Header from './Header';
import ColorToolbar from './ColorToolbar';

interface Color {
  name: string;
  hex_code: string;
}

const projectURL = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const key = import.meta.env.VITE_SUPABASE_API_KEY;

const supabase = createClient(projectURL, key);

const Colors = () => {
  const [colors, setColors] = useState<Color[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    insertColors(); 
    fetchColors(); 
  }, []);

  const fetchColors = async () => {
    try {
      const { data, error } = await supabase
        .from('colors')
        .select('name, hex_code');
      
      if (error) throw error;

      const uniqueColorsMap = new Map();
      (data as Color[]).forEach((color) => {
        uniqueColorsMap.set(color.hex_code, color); 
      });
      const uniqueColors = Array.from(uniqueColorsMap.values());

      const shuffled = uniqueColors.sort(() => 0.5 - Math.random());
    setColors(shuffled.slice(0, 5));
    setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching colors');
      setLoading(false);
    }
  };

  const insertColors = async () => {
    try {
      const { data, error } = await supabase
        .from('colors')
        .insert([
          { name: 'Light Pink', hex_code: '#FFB6C1' },
        { name: 'Pale Turquoise', hex_code: '#AFEEEE' },
        { name: 'Lavender', hex_code: '#E6E6FA' },
        { name: 'Light Yellow', hex_code: '#FFFFE0' },
        { name: 'Light Green', hex_code: '#90EE90' },
        { name: 'Light Coral', hex_code: '#F08080' },
        { name: 'Peach Puff', hex_code: '#FFDAB9' },
        { name: 'Light Sky Blue', hex_code: '#87CEFA' },
        { name: 'Misty Rose', hex_code: '#FFE4E1' },
        { name: 'Alice Blue', hex_code: '#F0F8FF' },
        { name: 'Light Goldenrod Yellow', hex_code: '#FAFAD2' },
        { name: 'Light Blue', hex_code: '#ADD8E6' },
        { name: 'Honeydew', hex_code: '#F0FFF0' },
        { name: 'Light Salmon', hex_code: '#FFA07A' },
        { name: 'Linen', hex_code: '#FAF0E6' },
        { name: 'Antique White', hex_code: '#FAEBD7' },
        { name: 'Pale Green', hex_code: '#98FB98' },
        { name: 'Light Steel Blue', hex_code: '#B0C4DE' },
        { name: 'Lavender Blush', hex_code: '#FFF0F5' },
        { name: 'Light Cyan', hex_code: '#E0FFFF' },
        { name: 'Light Pink 2', hex_code: '#FFB6C1' },
        { name: 'Light Blue 2', hex_code: '#ADD8E6' },
        { name: 'Sky Blue', hex_code: '#87CEEB' },
        { name: 'Blanched Almond', hex_code: '#FFEBCD' },
        { name: 'Medium Purple', hex_code: '#9370DB' },
        { name: 'Slate Blue', hex_code: '#6A5ACD' },
        { name: 'Peach', hex_code: '#FFDAB9' },
        { name: 'Thistle', hex_code: '#D8BFD8' },
        { name: 'Mint Cream', hex_code: '#F5FFFA' },
        { name: 'Sea Green', hex_code: '#2E8B57' },
        { name: 'Lavender Rose', hex_code: '#FBAED2' },
        { name: 'Medium Aquamarine', hex_code: '#66CDAA' },
        { name: 'Wheat', hex_code: '#F5DEB3' },
        { name: 'Plum', hex_code: '#DDA0DD' },
        { name: 'Rosy Brown', hex_code: '#BC8F8F' },
        { name: 'Powder Blue', hex_code: '#B0E0E6' },
        { name: 'Cornsilk', hex_code: '#FFF8DC' },
        { name: 'Papaya Whip', hex_code: '#FFEFD5' },
        { name: 'Burly Wood', hex_code: '#DEB887' },
        { name: 'Old Lace', hex_code: '#FDF5E6' },
        { name: 'Khaki', hex_code: '#F0E68C' },
        { name: 'Beige', hex_code: '#F5F5DC' },
        { name: 'Lemon Chiffon', hex_code: '#FFFACD' },
        { name: 'Aquamarine', hex_code: '#7FFFD4' },
        { name: 'Pale Violet Red', hex_code: '#DB7093' },
        { name: 'Orchid', hex_code: '#DA70D6' },
        { name: 'Light Sea Green', hex_code: '#20B2AA' },
        { name: 'Navajo White', hex_code: '#FFDEAD' },
        { name: 'Ivory', hex_code: '#FFFFF0' },
        { name: 'Ghost White', hex_code: '#F8F8FF' }
        ])
        .select();

      if (error) throw error;

      console.log('Colors inserted:', data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error inserting colors');
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <>
      <Header />
      <ColorToolbar />
      <Box 
        sx={{
          height: '100vh',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box',
          overflow: 'hidden',
        }}
      >
        <Box 
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flex: 1,
          }}
        >
          {colors.map((color, idx) => (
            <Box
              key={idx}
              component={Paper}
              sx={{
                backgroundColor: color.hex_code,
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              padding: 0,
              margin: 0,
              borderRadius: 0,
              }}
            >
              <Typography variant="h6"  sx={{
                  color: 'black', 
                  fontWeight: 'bold', 
                  fontSize: '25px', 
                }} >
              {color.hex_code.replace('#', '')}
              </Typography>
              <Typography variant="body1" color="black" sx={{ marginBottom: 1, color: 'black' , fontSize: '14px',}}>
              
                {color.name}
            
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Colors;
