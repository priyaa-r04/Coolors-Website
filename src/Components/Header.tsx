import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import logo from "../assets/logo.png";



// const supabaseUrl = `https://${project}.supabase.co", "${key}"`;
// const supabaseAnonKey = key;

// console.log(supabaseUrl)
// console.log(supabaseAnonKey)
function Header() {

// const project = import.meta.env.VITE_SUPABASE_PROJECT_NAME
// const key = import.meta.env.VITE_SUPABASE_API_KEY

// console.log("project ", project)
// console.log("key" ,key)

  
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "white",
        boxShadow: "none",
        borderBottom: "1px solid #ccc",
      }}
    >
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          minHeight: 5,
        }}
      >
        <Toolbar disableGutters>
          <Box
            component="a"
            href="/"
            sx={{
              display: { xs: "none", md: "flex" },
              flexGrow: 1,
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            <img src={logo} alt="Logo" style={{ height: 30 }} />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Link
              href="/tools"
              sx={{ color: "black", textDecoration: "none", fontFamily: "Inter, sans-serif" }}
            >
              Tools
            </Link>
            <Link
              href="/Gopro"
              sx={{
                color: "black",
                textDecoration: "none",
                ml: 2,
                fontWeight: 50,
                fontFamily: "Inter, sans-serif",
              }}
            >
              Go Pro
            </Link>
            <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
            <Link
              href="/signin"
              sx={{
                ml: 2,
                textDecoration: "none",
                color: "black",
                fontFamily: "Inter, sans-serif",
              }}
            >
              Sign In
            </Link>
            <Button
              variant="contained"
              sx={{
                ml: 2,
                backgroundColor: "blue",
                borderRadius: "10px",
                color: "white",
                textDecoration: "none",
                fontFamily: "Inter, sans-serif",
              }}
            >
              Sign Up
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
