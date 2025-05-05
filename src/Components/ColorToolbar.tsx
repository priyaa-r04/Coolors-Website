import { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Tooltip,
  Divider,
  Button,
} from "@mui/material";
import {
  MoreVert,
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
} from "@mui/icons-material";

const ColorToolbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 2,
          marginBottom:2
        }}
      >
        <Typography variant="subtitle1" color="lightgrey"
        sx={{
            ml:2
        }}>
          Press the spacebar to generate color palettes!
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Tooltip title="More">
            <IconButton>
              <MoreVert />
            </IconButton>
          </Tooltip>
          <Tooltip title="Create palette from photo">
            <IconButton>
              <CameraAlt />
            </IconButton>
          </Tooltip>

          <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

          <Tooltip title="Undo">
            <IconButton>
              <Undo />
            </IconButton>
          </Tooltip>
          <Tooltip title="Redo">
            <IconButton>
              <Redo />
            </IconButton>
          </Tooltip>

          <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

          <Tooltip title="View palette variations">
            <IconButton>
              <GridOn />
            </IconButton>
          </Tooltip>

          <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

          <Tooltip title="Check palette contrast">
            <IconButton>
              <CheckCircle />
            </IconButton>
          </Tooltip>

          <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

          <Tooltip title="Adjust Brightness">
            <IconButton onClick={() => setSidebarOpen(true)}>
              <Brightness4 />
            </IconButton>
          </Tooltip>

          {sidebarOpen && (
            <Box
              sx={{
                position: "absolute",
                right: 0,
                top: 60,
                width: 250,
                backgroundColor: "#fff",
                boxShadow: 3,
                padding: 2,
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

          <Button startIcon={<Visibility />} variant="text">
            View
          </Button>
          <Button startIcon={<CloudDownload />} variant="text">
            Export
          </Button>
          <Button startIcon={<Favorite />} variant="text">
            Save
          </Button>

          <Tooltip title="Open Sidebar">
            <IconButton>
              <MenuIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </>
  );
};

export default ColorToolbar;
