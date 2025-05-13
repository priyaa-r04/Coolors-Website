import { Box, Typography, Link, Divider, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

function Footer() {
  return (
    <Box
      sx={{ bgcolor: "#f7f7f8", p: 6, minHeight: "500px" }}
      component="footer"
    >
      <Box
        sx={{
          maxWidth: "1200px",
          mx: "auto",
           px: 2,
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <Box sx={{ flex: "1 1 250px", minWidth: "200px" }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 900, fontSize: "22px", mb: 3 }}
          >
            Tools
          </Typography>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {[
              "Generate your palettes",
              "Explore more palettes",
              "Extract palette from image",
              "Contrast checker",
              "Preview palettes on designs",
              "Recolor your own design",
              "Color pickers",
              "Browse free fonts",
            ].map((text, idx) => (
              <li key={idx}>
                <Link
                  href="#"
                  sx={{
                    display: "block",
                    color: "black",
                    textDecoration: "none",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "1.1em",
                    mb: 2,
                    "&:hover": {
                      color: "#0073e6",
                    },
                  }}
                >
                  {text}
                </Link>
              </li>
            ))}
          </ul>
        </Box>

        <Box sx={{ flex: "1 1 250px", minWidth: "200px" }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, fontSize: "22px", mb: 3 }}
          >
            More
          </Typography>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {[
              "List of colors",
              "Browse gradients",
              "Create a gradient",
              "Make a gradient palette",
              "Image converter",
              "Create a collage",
              "Font generator",
            ].map((text, idx) => (
              <li key={idx}>
                <Link
                  href="#"
                  sx={{
                    display: "block",
                    color: "black",
                    textDecoration: "none",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "1.1em",
                    mb: 2,
                    "&:hover": {
                      color: "#0073e6",
                    },
                  }}
                >
                  {text}
                </Link>
              </li>
            ))}
          </ul>
        </Box>

        <Box sx={{ flex: "1 1 250px", minWidth: "200px" }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, fontSize: "22px", mb: 3 }}
          >
            Jobs
          </Typography>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {["Find your next job", "Post your job"].map((text, idx) => (
              <li key={idx}>
                <Link
                  href="#"
                  sx={{
                    display: "block",
                    color: "black",
                    textDecoration: "none",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "1.1em",
                    mb: 2,
                    "&:hover": {
                      color: "#0073e6",
                    },
                  }}
                >
                  {text}
                </Link>
              </li>
            ))}
          </ul>

          <Typography
            variant="h6"
            sx={{ fontWeight: 900, fontSize: "22px", mt: 4, mb: 3 }}
          >
            Apps
          </Typography>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {["iOS", "Android", "Figma", "Adobe", "Chrome", "Instagram"].map(
              (text, idx) => (
                <li key={idx}>
                  <Link
                    href="#"
                    sx={{
                      display: "block",
                      color: "black",
                      textDecoration: "none",
                      fontFamily: "Inter, sans-serif",
                      fontSize: "1.1em",
                      mb: 2,
                      "&:hover": {
                        color: "#0073e6",
                      },
                    }}
                  >
                    {text}
                  </Link>
                </li>
              )
            )}
          </ul>
        </Box>

        <Box sx={{ flex: "1 1 250px", minWidth: "200px" , mr: 0}}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, fontSize: "22px", mb: 3 }}
          >
            Company
          </Typography>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {[
              "Pricing",
              "License",
              "Terms of Services",
              "Privacy Policy",
              "Cookie Policy",
              "Manage Cookies",
              "Help Center",
              "Advertise",
              "Affiliate",
              "Contact",
            ].map((text, idx) => (
              <li key={idx}>
                <Link
                  href="#"
                  sx={{
                    display: "block",
                    color: "black",
                    textDecoration: "none",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "1.1em",
                    mb: 2,
                    "&:hover": {
                      color: "#0073e6",
                    },
                  }}
                >
                  {text}
                </Link>
              </li>
            ))}
          </ul>
        </Box>
      </Box>

      <Box sx={{ maxWidth: "1200px", mx: "auto" }}>
        <Divider sx={{ my: 4, borderColor: "#ccc" }} />
      </Box>
      <Box
        sx={{
          maxWidth: "1200px",
          mx: "auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Typography
          sx={{
            fontSize: "14px",
            color: "#333",
            fontFamily: "Inter, sans-serif",
          }}
        >
          © {new Date().getFullYear()} Coolors by <strong>Priya Reddy</strong>. From a creative
          to all the others.
        </Typography>

        <Box>
          <IconButton
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: "#3b5998" }}
          >
            <FacebookIcon />
          </IconButton>
          <IconButton
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: "#1DA1F2" }}
          >
            <TwitterIcon />
          </IconButton>
          <IconButton
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: "#C13584" }}
          >
            <InstagramIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;
