import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import AppleIcon from "@mui/icons-material/Apple";
import AndroidIcon from "@mui/icons-material/Android";
import ExtensionIcon from "@mui/icons-material/Extension";
import ChromeReaderModeIcon from "@mui/icons-material/ChromeReaderMode";
import BrushIcon from "@mui/icons-material/Brush";

const cards = [
  {
    id: 1,
    title: "iOS App",
    description: "Create, browse and save palettes on the go.",
    icon: <AppleIcon sx={{ fontSize: 40, mb: 1 }} />,
    hoverColor: "#cfe2f3",
  },
  {
    id: 2,
    title: "Android App",
    description: "Thousands of palettes in your pocket.",
    icon: <AndroidIcon sx={{ fontSize: 40, mb: 1 }} />,
    hoverColor: "#f4cccc",
  },
  {
    id: 3,
    title: "Figma Plugin",
    description: "All palettes right in your workspace.",
    icon: <ExtensionIcon sx={{ fontSize: 40, mb: 1 }} />,
    hoverColor: "#ad93cc",
  },
  {
    id: 4,
    title: "Chrome Extension",
    description: "Get and edit a palette every new tab.",
    icon: <ChromeReaderModeIcon sx={{ fontSize: 40, mb: 1 }} />,
    hoverColor: "#d0e0e3",
  },
  {
    id: 5,
    title: "Adobe Extension",
    description: "Use Coolors with your favorite tools.",
    icon: <BrushIcon sx={{ fontSize: 40, mb: 1 }} />,
    hoverColor: "#ffffcc",
  },
];

function CardsSection() {
  return (
    <Box
      sx={{
        mt: 7,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 4,
        width: "100%",
        px: 4,
        boxSizing: "border-box",
      }}
    >
      {cards.map((card) => (
        <Box
          key={card.id}
          sx={{
            flex: "1 0 20%",
            width: "100%",
            maxWidth: { xs: 260, sm: 280 },
            minWidth: { xs: 160, sm: 220 },
            mb: 3,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Card
            sx={{
              backgroundColor: "#f0f0f0",
              transition: "background-color 0.3s ease",
              "&:hover": {
                backgroundColor: card.hoverColor,
              },
              height: { xs: 180, sm: 200, md: 240 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 2,
              boxShadow: 3,
              p: 2,
            }}
          >
            <CardContent sx={{ textAlign: "center" }}>
              {card.icon}
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {card.title}
              </Typography>
              <Typography variant="body2" sx={{ mt: 2 }}>
                {card.description}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      ))}
    </Box>
  );
}

export default CardsSection;
