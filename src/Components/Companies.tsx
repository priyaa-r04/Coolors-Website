import { Box, Link, Typography } from "@mui/material";
import disneyLogo from "../assets/disneyLogo.png";
import dreamworks from "../assets/dreamworks.png";
import warnerbros from "../assets/warnerbros.png";
import netflix from "../assets/netflix.png";
import airbnb from "../assets/airbnb.png";
import dropbox from "../assets/dropbox.png";
import hasbro from "../assets/hasbro.png";
import ubisoft from "../assets/ubisoft.png";
import ea from "../assets/ea.png";
import apple from "../assets/apple.png";
import microsoft from "../assets/microsoft.png";

function Companies() {
  const CompanyData = [
    { name: "Disney", logo: disneyLogo, website: "https://disney.com/" },
    {
      name: "Dreamworks",
      logo: dreamworks,
      website: "https://dreamworks.com/",
    },
    {
      name: "Warnerbros",
      logo: warnerbros,
      website: "https://warnerbros.com/",
    },
    { name: "Netflix", logo: netflix, website: "https://netflix.com/" },
    { name: "Airbnb", logo: airbnb, website: "https://airbnb.com/" },
    { name: "Dropbox", logo: dropbox, website: "https://dropbox.com/" },
    { name: "Hasbro", logo: hasbro, website: "https://hasbro.com/" },
    { name: "Ubisoft", logo: ubisoft, website: "https://ubisoft.com/" },
    { name: "Ea", logo: ea, website: "https://ea.com/" },
    { name: "Apple", logo: apple, website: "https://apple.com/" },
    { name: "Microsoft", logo: microsoft, website: "https://microsoft.com/" },
  ];

  return (
    <>
      <Box
        sx={{
          mt: 10,
          mb: 6,
          px: 2,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            fontWeight: 500,
            maxWidth: "100%",
          }}
        >
          Used by 5+ million designers and by top companies
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          gap: { xs: 2, sm: 3, md: 4 },
          px: { xs: 2, sm: 4 },
          mb: 8,
        }}
      >
        {CompanyData.map((company, index) => (
          <Link
            href={company.website}
            target="_blank"
            rel="noopener noreferrer"
            key={index}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: { xs: "80px", sm: "100px" },
              height: "60px",
              p: 1,
              backgroundColor: "#fff",
              borderRadius: "8px",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "translateY(-5px)",
              },
            }}
          >
            <img
              src={company.logo}
              alt={company.name}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
              }}
            />
          </Link>
        ))}
      </Box>
    </>
  );
}

export default Companies;
