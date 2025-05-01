import Box from "@mui/material/Box";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import AppleIcon from '@mui/icons-material/Apple';
import AndroidIcon from '@mui/icons-material/Android';
import ExtensionIcon from '@mui/icons-material/Extension';
import ChromeReaderModeIcon from '@mui/icons-material/ChromeReaderMode';
import BrushIcon from '@mui/icons-material/Brush';

const cards = [
  {
    id: 1,
    title: 'iOS App',
    description: 'Create, browse and save palettes on the go.',
    icon: <AppleIcon sx={{ fontSize: 40, mb: 1 }} />,
    hoverColor: '#cfe2f3',
  },
  {
    id: 2,
    title: 'Android App',
    description: 'Thousands of palettes in your pocket.',
    icon: <AndroidIcon sx={{ fontSize: 40, mb: 1 }} />,
    hoverColor: '#f4cccc',
  },
  {
    id: 3,
    title: 'Figma Plugin',
    description: 'All palettes right in your workspace.',
    icon: <ExtensionIcon sx={{ fontSize: 40, mb: 1 }} />,
    hoverColor: '#ad93cc',
  },
  {
    id: 4,
    title: 'Chrome Extension',
    description: 'Get and edit a palette every new tab.',
    icon: <ChromeReaderModeIcon sx={{ fontSize: 40, mb: 1 }} />,
    hoverColor: '#d0e0e3',
  },
  {
    id: 5,
    title: 'Adobe Extension',
    description: 'Use Coolors with your favorite tools.',
    icon: <BrushIcon sx={{ fontSize: 40, mb: 1 }} />,
    hoverColor:'#ffffcc',
  },
];

function CardsSection() {
  return (
    <Box
      sx={{
        ml: 30,
        mt: 7,
        height: '25vh',
        display: 'grid',
        cursor: 'pointer',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))',
        gap: 6,
      }}
    >
      {cards.map((card) => (
        <Card
          key={card.id}
          sx={{
            backgroundColor: '#f0f0f0',
            transition: 'background-color 0.3s ease',
            '&:hover': {
              backgroundColor: card.hoverColor,
            },
          }}
        >
          <CardContent sx={{ height: '100%', textAlign: 'center' , mt:'20px' }}>
            {card.icon}
            <Typography variant="h5" component="div">
              {card.title}
            </Typography>
            <Typography variant="body2"
            sx={{
              mt:'20px'
            }}>
              {card.description}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default CardsSection;
