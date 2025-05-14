import { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Tooltip,
  Divider,
  Button,
  Modal,
  styled,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  CameraAlt,
  Undo,
  Redo,
  GridOn,
  CheckCircle,
  Brightness4,
  CloudDownload,
  Menu as MenuIcon,
  Favorite,
  Visibility,
  CloudUpload,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import AuthModal from "../Components/AuthModal";
import Tab from "@mui/material/Tab";
import { TabContext, TabList } from "@mui/lab";
import SignupModal from "./SignupModal";
import { undo, redo, selectCanUndo, selectCanRedo } from "../redux/colorSlice";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const InputFileUpload = () => {
  return (
    <Button
      component="label"
      variant="outlined"
      startIcon={<CloudUpload />}
      sx={{ width: "100%", justifyContent: "center" }}
    >
      Upload Image
      <VisuallyHiddenInput
        type="file"
        accept="image/*"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) {
            console.log("Selected file:", file);
          }
        }}
      />
    </Button>
  );
};

const hexToRgb = (hex: string) => {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgb(${r}, ${g}, ${b})`;
};

const hexToHsl = (hex: string) => {
  const r = parseInt(hex.substring(1, 3), 16) / 255;
  const g = parseInt(hex.substring(3, 5), 16) / 255;
  const b = parseInt(hex.substring(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(
    l * 100
  )}%)`;
};

const hexToHsb = (hex: string) => {
  const r = parseInt(hex.substring(1, 3), 16) / 255;
  const g = parseInt(hex.substring(3, 5), 16) / 255;
  const b = parseInt(hex.substring(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let h = 0;
  if (delta !== 0) {
    if (max === r) h = (g - b) / delta + (g < b ? 6 : 0);
    else if (max === g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;
    h /= 6;
  }

  const s = max === 0 ? 0 : delta / max;
  const v = max;

  return `hsb(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(
    v * 100
  )}%)`;
};

const ColorToolbar = () => {
  const dispatch = useDispatch();
  const colors = useSelector((state: RootState) => state.colors.colors);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState<"upload" | "url">("upload");
  const [imageURL, setImageURL] = useState("");

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [signupModalOpen, setSignupModalOpen] = useState(false);

  const canUndo = useSelector(selectCanUndo);
  const canRedo = useSelector(selectCanRedo);

  const generatePaletteUrl = () => {
    return `http://localhost:5173/Colors`;
  };

  const handleExportClick = () => {
    const paletteUrl = generatePaletteUrl();

    navigator.clipboard
      .writeText(paletteUrl)
      .then(() => {
        setSnackbarOpen(true);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 2,
          mb: 2,
          px: 2,
          flexWrap: "wrap",
          flexDirection: { xs: "column", sm: "row" },
          position: { xs: "fixed", sm: "static" },
          bottom: { xs: 0, sm: "auto" },
          width: { xs: "100%", sm: "auto" },
          backgroundColor: { xs: "white", sm: "transparent" },
          zIndex: 999,
          boxShadow: { xs: "0 -2px 10px rgba(0,0,0,0.1)", sm: "none" },
          py: { xs: 1, sm: 0 },
        }}
      >
        <Typography variant="subtitle1" color="lightgrey" sx={{ ml: 2 }}>
          Press the spacebar to generate color palettes!
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Tooltip title="Create palette from photo">
            <IconButton onClick={() => setImageModalOpen(true)}>
              <CameraAlt
                sx={{
                  color: "#36454F",
                  backgroundColor: "transparent",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#f0f0f0",
                    color: "#000",
                  },
                }}
              />
            </IconButton>
          </Tooltip>

          <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

          <Tooltip title="Undo">
            <IconButton onClick={() => dispatch(undo())}>
              <Undo
                sx={{
                  color: canUndo ? "#36454F" : "lightgrey",
                  backgroundColor: "transparent",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: canUndo ? "#f0f0f0" : "transparent",
                    color: canUndo ? "#000" : "lightgrey",
                  },
                }}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title="Redo">
            <IconButton onClick={() => dispatch(redo())}>
              <Redo
                sx={{
                  color: canRedo ? "#36454F" : "lightgrey",
                  backgroundColor: "transparent",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: canRedo ? "#f0f0f0" : "transparent",
                    color: canRedo ? "#000" : "lightgrey",
                  },
                }}
              />
            </IconButton>
          </Tooltip>

          <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

          <Tooltip title="View palette variations">
            <IconButton>
              <GridOn
                sx={{
                  color: "#36454F",
                  backgroundColor: "transparent",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#f0f0f0",
                    color: "#000",
                  },
                }}
              />
            </IconButton>
          </Tooltip>

          <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

          <Tooltip title="Check palette contrast">
            <IconButton>
              <CheckCircle
                sx={{
                  color: "#36454F",
                  backgroundColor: "transparent",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#f0f0f0",
                    color: "#000",
                  },
                }}
              />
            </IconButton>
          </Tooltip>

          <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

          <Tooltip title="Adjust Brightness">
            <IconButton onClick={() => setSidebarOpen(true)}>
              <Brightness4
                sx={{
                  color: "#36454F",
                  backgroundColor: "transparent",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#f0f0f0",
                    color: "#000",
                  },
                }}
              />
            </IconButton>
          </Tooltip>

          {sidebarOpen && (
            <Box
              sx={{
                position: "absolute",
                right: 0,
                top: 60,
                width: 250,
                bgcolor: "#fff",
                boxShadow: 3,
                p: 2,
                zIndex: 10,
              }}
            >
              <Typography gutterBottom>Brightness</Typography>
              <IconButton size="small" onClick={() => setSidebarOpen(false)}>
                Close
              </IconButton>
            </Box>
          )}

          <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

          <Button
            startIcon={<Visibility />}
            variant="text"
            onClick={() => setModalOpen(true)}
            sx={{
              color: "#36454F",
              backgroundColor: "transparent",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#f0f0f0",
                color: "#000",
              },
            }}
          >
            View
          </Button>
          <Button
            startIcon={<CloudDownload />}
            variant="text"
            onClick={handleExportClick}
            sx={{
              color: "#36454F",
              backgroundColor: "transparent",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#f0f0f0",
                color: "#000",
              },
            }}
          >
            Export
          </Button>

          <Snackbar
            open={snackbarOpen}
            autoHideDuration={2000}
            onClose={() => setSnackbarOpen(false)}
          >
            <Alert severity="success" onClose={() => setSnackbarOpen(false)}>
              URL copied to clipboard!
            </Alert>
          </Snackbar>
          <Button
            startIcon={<Favorite />}
            variant="text"
            onClick={() => setAuthModalOpen(true)}
            sx={{
              color: "Black",
              backgroundColor: "transparent",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#f0f0f0",
                color: "#000",
              },
            }}
          >
            Save
          </Button>

          <AuthModal
            open={authModalOpen}
            onClose={() => setAuthModalOpen(false)}
            openSignupModal={() => {
              setAuthModalOpen(false);
              setSignupModalOpen(true);
            }}
          />
          <Tooltip title="Open Sidebar">
            <IconButton>
              <MenuIcon
                sx={{
                  color: "#36454F",
                  backgroundColor: "transparent",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#f0f0f0",
                    color: "#000",
                  },
                }}
              />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Quick View
          </Typography>

          {selectedColor && (
            <>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body1">
                  <strong>Hex:</strong> {selectedColor.hex_code}
                </Typography>
                <Typography variant="body1">
                  <strong>RGB:</strong> {hexToRgb(selectedColor.hex_code)}
                </Typography>
                <Typography variant="body1">
                  <strong>HSL:</strong> {hexToHsl(selectedColor.hex_code)}
                </Typography>
                <Typography variant="body1">
                  <strong>HSB:</strong> {hexToHsb(selectedColor.hex_code)}
                </Typography>
              </Box>

              <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
              >
                {colors.map((color, idx) => (
                  <Box
                    key={idx}
                    onClick={() => setSelectedColor(color)}
                    sx={{
                      width: 40,
                      height: 40,
                      bgcolor: color.hex_code,
                      border:
                        color.hex_code === selectedColor.hex_code
                          ? "2px solid black"
                          : "1px solid #ccc",
                      cursor: "pointer",
                      borderRadius: 1,
                    }}
                  />
                ))}
              </Box>
            </>
          )}
        </Box>
      </Modal>

      <Modal open={imageModalOpen} onClose={() => setImageModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            height: 300,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Select Image
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TabContext value={selectedTab}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={(_, newValue: string) =>
                    setSelectedTab(newValue as "upload" | "url")
                  }
                  aria-label="image source tabs"
                >
                  <Tab label="Upload" value="upload" />
                  <Tab label="URL" value="url" />
                </TabList>
              </Box>
            </TabContext>

            {selectedTab === "upload" ? (
              <InputFileUpload />
            ) : (
              <input
                type="text"
                placeholder="Enter image URL"
                value={imageURL}
                onChange={(e) => setImageURL(e.target.value)}
                style={{
                  padding: "10px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                  width: "100%",
                }}
              />
            )}

            <Button
              variant="contained"
              onClick={() => {
                console.log(
                  selectedTab === "upload"
                    ? "Image uploaded (not implemented)"
                    : `Image URL: ${imageURL}`
                );
                setImageModalOpen(false);
              }}
            >
              OK
            </Button>
          </Box>
        </Box>
      </Modal>

      <SignupModal
        open={signupModalOpen}
        onClose={() => setSignupModalOpen(false)}
        onSwitchToSignIn={() => {
          setSignupModalOpen(false);
          setAuthModalOpen(true);
        }}
      />
    </>
  );
};

export default ColorToolbar;
