import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Typography, Paper, Box, CircularProgress } from '@mui/material';
import Header from './Header';
import ColorToolbar from './ColorToolbar';
import CloseIcon from '@mui/icons-material/Close';

interface Color {
  name: string;
  hex_code: string;
}

const projectURL = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const key = import.meta.env.VITE_SUPABASE_API_KEY;
const supabase = createClient(projectURL, key);

function blendColors(hex1: string, hex2: string): string {
  const c1 = parseInt(hex1.slice(1), 16);
  const c2 = parseInt(hex2.slice(1), 16);

  const r = ((c1 >> 16) + (c2 >> 16)) >> 1;
  const g = (((c1 >> 8) & 0xff) + ((c2 >> 8) & 0xff)) >> 1;
  const b = ((c1 & 0xff) + (c2 & 0xff)) >> 1;

  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

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
      await supabase
        .from('colors')
        .insert([
          { name: 'Light Pink', hex_code: '#FFB6C1' },
          { name: 'Pale Turquoise', hex_code: '#AFEEEE' },
          { name: 'Lavender', hex_code: '#E6E6FA' },
          { name: 'Light Yellow', hex_code: '#FFFFE0' },
          { name: 'Light Green', hex_code: '#90EE90' },
          { name: 'Peach Puff', hex_code: '#FFDAB9' },
          { name: 'Light Sky Blue', hex_code: '#87CEFA' },
          { name: 'Misty Rose', hex_code: '#FFE4E1' },
          { name: 'Sky Blue', hex_code: '#87CEEB' },
          { name: 'Thistle', hex_code: '#D8BFD8' }
        ]);
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
          flexDirection: 'row',
          boxSizing: 'border-box',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        {colors.map((color, idx) => (
          <Box
            key={`color-${idx}`}
            sx={{
              position: 'relative',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              '&:hover .plusIcon': {
                opacity: 1,
                transform: 'translate(-50%, -50%) scale(1)',
              },
            }}
          >
            <Box
              component={Paper}
              sx={{
                backgroundColor: color.hex_code,
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                position: 'relative',
                borderRadius: 0,
                overflow: 'hidden',
                height: '100%',
                '&:hover .removeIcon': {
                  opacity: 1,
                  transform: 'translateY(0)',
                },
              }}
            >
              <CloseIcon
                className="removeIcon"
                onClick={() => {
                  setColors((prevColors) => prevColors.filter((_, i) => i !== idx));
                }}
                sx={{
                  position: 'absolute',
                  top: '40%',
                  transform: 'translateY(-100%)',
                  cursor: 'pointer',
                  color: 'black',
                  fontSize: '20px',
                  opacity: 0,
                  transition: 'all 0.3s ease-in-out',
                  zIndex: 2,
                }}
              />
              <Typography variant="h6" sx={{ color: 'black', fontWeight: 'bold', fontSize: '25px' }}>
                {color.hex_code.replace('#', '')}
              </Typography>
              <Typography variant="body1" sx={{ color: 'black', fontSize: '14px' }}>
                {color.name}
              </Typography>
            </Box>

            {idx < colors.length - 1 && colors.length < 15 && (
              <Box
                className="plusIcon"
                sx={{
                  position: 'absolute',
                  top: '50%',
                  right: 0,
                  transform: 'translate(-50%, -50%) scale(0)',
                  transition: 'all 0.3s ease',
                  opacity: 0,
                  zIndex: 3,
                  backgroundColor: '#fff',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 0 4px rgba(0,0,0,0.2)',
                }}
                onClick={() => {
                  const blendedHex = blendColors(color.hex_code, colors[idx + 1].hex_code);
                  const newColor: Color = {
                    name: 'Blend',
                    hex_code: blendedHex,
                  };
                  setColors((prev) => {
                    const updated = [...prev];
                    updated.splice(idx + 1, 0, newColor);
                    return updated;
                  });
                }}
              >
                <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>+</Typography>
              </Box>
            )}
          </Box>
        ))}
      </Box>
    </>
  );
};

export default Colors;
