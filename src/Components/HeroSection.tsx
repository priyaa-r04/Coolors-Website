import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import homepageImg from "../assets/homepage.png";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "space-between",
        alignItems: "flex-start",
        mt: 10,
        ml: { xs: 2, md: 13 },
        mr: { xs: 2, md: 5 },
      }}
    >
      <Box sx={{ maxWidth: 500, ml: { xs: 2, md: 10 }, mb: { xs: 4, md: 0 } }}>
        <Typography
          variant="h1"
          gutterBottom
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "40px", md: "70px" },
            textAlign: "center",
            lineHeight: 1.2,
            color: "#000000",
            fontFamily: "Inter, sans-serif",
            marginRight: "20px",
          }}
        >
          The super fast color palettes generator!
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mt: 2,
            fontSize: { xs: "16px", md: "20px" },
            textAlign: "center",
            lineHeight: 1.6,
            fontWeight: 400,
          }}
        >
          Create the perfect palette or get inspired by thousands of beautiful
          color schemes.
        </Typography>
        <Box
          sx={{
            width: "100%",
            maxWidth: 500,
            mt: 3,
            mx: "auto",
            textAlign: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            onClick={() => navigate("/Colors")}
            sx={{
              backgroundColor: "blue",
              color: "white",
              fontWeight: "bold",
              padding: "12px 24px",
              fontSize: { xs: "12px", md: "13px" },
              width: "250px",
              borderRadius: "10px",
            }}
          >
            Start the Generator!
          </Button>
          <Button
            variant="outlined"
            sx={{
              color: "black",
              borderColor: "grey",
              fontWeight: "bold",
              padding: "12px 24px",
              fontSize: { xs: "12px", md: "12px" },
              width: "250px",
              borderRadius: "10px",
            }}
          >
            Explore Trending Palettes
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          height: { xs: 300, md: 500 },
          width: { xs: "100%", md: 800 },
          overflow: "hidden",
          position: "relative",
          border: "10px solid black",
          borderRadius: "10px",
          marginTop: { xs: 3, md: 0 },
          marginLeft: {xs:"-9px"}, 
          mx: { md: 2 },
        }}
      >
        <Box
          sx={{
            animation: "scrollImages 40s linear infinite",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <img src={homepageImg} alt="scroll" style={{ width: "100%" }} />
          <img src={homepageImg} alt="scroll" style={{ width: "100%" }} />
          <img src={homepageImg} alt="scroll" style={{ width: "100%" }} />
        </Box>
      </Box>
    </Box>
  );
}

export default HeroSection;
