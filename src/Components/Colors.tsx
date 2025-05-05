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
    fetchColors();
  }, []);

  const fetchColors = async () => {
    try {
      const { data, error } = await supabase
        .from('colors')
        .select('name, hex_code');
      
      if (error) throw error;

      setColors(data as Color[]);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'error');
      setLoading(false);
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <>
    <Header/>
    <ColorToolbar/>
    <Box 
      sx={{
        display: 'flex', 
        flexDirection: 'column', 
        height: '100vh',
        width: '100%', 
        boxSizing: 'border-box', 
      }}
    >
    
      <Box 
        sx={{
          display: 'flex', 
          justifyContent: 'space-between', 
          flex: 1,
          margin: 0, 
          padding: 0, 
        }}
      >
        {colors.slice(0, 5).map((color, idx) => (
          <Box
            key={idx}
            component={Paper}
            sx={{
              backgroundColor: color.hex_code,
              flex: 1, 
              height: '100%', 
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 2,
              color: '#fff',
              marginBottom: 90, 
              borderRadius: 0, 
            }}
          >
           
            <Typography variant="h6" sx={{ marginBottom: 1, 
              color:'black'
            }}>
              {color.name}
            </Typography>

            <Typography variant="body1" color='black'>
              {color.hex_code}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
    </>
  );
};

export default Colors;
