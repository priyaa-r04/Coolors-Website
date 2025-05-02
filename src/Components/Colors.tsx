import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

import { Typography, Paper, Box, CircularProgress } from '@mui/material';

interface Color {
  name: string;
  hash: string;
}

interface ColorData {
  color1: Color;
  color2: Color;
  color3: Color;
  color4: Color;
  color5: Color;
}

const projectURL = import.meta.env.VITE_SUPABASE_PROJECT_URL
const key = import.meta.env.VITE_SUPABASE_API_KEY

console.log("url" , projectURL)
console.log("key" , key)

const supabase = createClient(projectURL, key);


const Colors = () => {
  const [colors, setColors] = useState<ColorData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchColors();
  }, []);

  const fetchColors = async () => {
    try {
      const { data, error } = await supabase
        .from('colors')
        .select('color1, color2, color3, color4, color5');

      if (error) throw error;

      console.log("data   ", data);

      setColors((data as ColorData[]) || []);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setLoading(false);
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <Box sx={{ padding: 2 }}>
      {colors.map((row, rowIndex) => (
        <Box
          key={rowIndex}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 2,
            gap: 2,
          }}
        >
          {[row.color1, row.color2, row.color3, row.color4, row.color5].map(
            (color, idx) => (
              <Box
                key={idx}
                component={Paper}
                sx={{
                  flex: 1,
                  backgroundColor: color.hash,
                  height: 200,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 2,
                  padding: 2,
                }}
              >
                <Typography variant="h6" color="white">
                  {color.name}
                </Typography>
              </Box>
            )
          )}
        </Box>
      ))}
    </Box>
  );
};

export default Colors;
