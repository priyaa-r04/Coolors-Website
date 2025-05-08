import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import {
  Typography,
  Paper,
  Box,
  CircularProgress,
  Button,
} from "@mui/material";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { setColors, removeColor, undo, redo } from "../redux/colorSlice";
import CloseIcon from "@mui/icons-material/Close";
import ColorToolbar from "./ColorToolbar";
import { RootState } from "../redux/store";

interface Color {
  name: string;
  hex_code: string;
}

const projectURL = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const key = import.meta.env.VITE_SUPABASE_API_KEY;
const supabase = createClient(projectURL, key);

function blendColors(hex1: string, hex2: string): string {
  const c1 = parseInt(hex1.slice(1), 16);
  const c2 = parseInt(hex2.slice(1), 16);

  const r = ((c1 >> 16) + (c2 >> 16)) >> 1;
  const g = (((c1 >> 8) & 0xff) + ((c2 >> 8) & 0xff)) >> 1;
  const b = ((c1 & 0xff) + (c2 & 0xff)) >> 1;

  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

const Colors = () => {
  const dispatch = useDispatch();
  const { colors, historyIndex, history } = useSelector(
    (state: RootState) => state.colors
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    insertColors();
    fetchColors();
  }, []);

  const fetchColors = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("colors")
        .select("name, hex_code");

      if (error) throw error;

      const uniqueColorsMap = new Map();
      (data as Color[]).forEach((color) => {
        uniqueColorsMap.set(color.hex_code, color);
      });
      const uniqueColors = Array.from(uniqueColorsMap.values());
      const shuffled = uniqueColors.sort(() => 0.5 - Math.random());

      dispatch(setColors(shuffled.slice(0, 5)));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error fetching colors");
    } finally {
      setLoading(false);
    }
  };

  const insertColors = async () => {
    try {
      await supabase.from("colors").insert([
        { name: "Light Pink", hex_code: "#FFB6C1" },
        { name: "Pale Turquoise", hex_code: "#AFEEEE" },
        { name: "Lavender", hex_code: "#E6E6FA" },
        { name: "Light Yellow", hex_code: "#FFFFE0" },
        { name: "Light Green", hex_code: "#90EE90" },
        { name: "Light Coral", hex_code: "#F08080" },
        { name: "Peach Puff", hex_code: "#FFDAB9" },
        { name: "Light Sky Blue", hex_code: "#87CEFA" },
        { name: "Misty Rose", hex_code: "#FFE4E1" },
        { name: "Alice Blue", hex_code: "#F0F8FF" },
        { name: "Light Goldenrod Yellow", hex_code: "#FAFAD2" },
        { name: "Light Blue", hex_code: "#ADD8E6" },
        { name: "Honeydew", hex_code: "#F0FFF0" },
        { name: "Light Salmon", hex_code: "#FFA07A" },
        { name: "Linen", hex_code: "#FAF0E6" },
        { name: "Antique White", hex_code: "#FAEBD7" },
        { name: "Pale Green", hex_code: "#98FB98" },
        { name: "Light Steel Blue", hex_code: "#B0C4DE" },
        { name: "Lavender Blush", hex_code: "#FFF0F5" },
        { name: "Light Cyan", hex_code: "#E0FFFF" },
        { name: "Sky Blue", hex_code: "#87CEEB" },
        { name: "Blanched Almond", hex_code: "#FFEBCD" },
        { name: "Medium Purple", hex_code: "#9370DB" },
        { name: "Slate Blue", hex_code: "#6A5ACD" },
        { name: "Peach", hex_code: "#FFDAB9" },
        { name: "Thistle", hex_code: "#D8BFD8" },
        { name: "Mint Cream", hex_code: "#F5FFFA" },
        { name: "Sea Green", hex_code: "#2E8B57" },
        { name: "Lavender Rose", hex_code: "#FBAED2" },
        { name: "Medium Aquamarine", hex_code: "#66CDAA" },
        { name: "Wheat", hex_code: "#F5DEB3" },
        { name: "Plum", hex_code: "#DDA0DD" },
        { name: "Rosy Brown", hex_code: "#BC8F8F" },
        { name: "Powder Blue", hex_code: "#B0E0E6" },
        { name: "Cornsilk", hex_code: "#FFF8DC" },
        { name: "Papaya Whip", hex_code: "#FFEFD5" },
        { name: "Burly Wood", hex_code: "#DEB887" },
        { name: "Old Lace", hex_code: "#FDF5E6" },
        { name: "Khaki", hex_code: "#F0E68C" },
        { name: "Beige", hex_code: "#F5F5DC" },
        { name: "Lemon Chiffon", hex_code: "#FFFACD" },
        { name: "Aquamarine", hex_code: "#7FFFD4" },
        { name: "Pale Violet Red", hex_code: "#DB7093" },
        { name: "Orchid", hex_code: "#DA70D6" },
        { name: "Light Sea Green", hex_code: "#20B2AA" },
        { name: "Navajo White", hex_code: "#FFDEAD" },
        { name: "Ivory", hex_code: "#FFFFF0" },
        { name: "Ghost White", hex_code: "#F8F8FF" },
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inserting colors");
    }
  };

  const handleRemoveColor = (index: number) => {
    dispatch(removeColor(index)); // Use dispatch with removeColor action
  };

  const handleUndo = () => {
    dispatch(undo());
  };

  const handleRedo = () => {
    dispatch(redo());
  };

  // if (!colors.length) return <CircularProgress />;

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!colors.length) return <Typography>No colors available.</Typography>;
  return (
    <>
      <Header />
      <ColorToolbar />
      <Box
        sx={{
          height: "100vh",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          boxSizing: "border-box",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {colors.map((color: Color, idx: number) => (
          <Box
            key={`color-${idx}`}
            sx={{
              position: "relative",
              flex: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              component={Paper}
              sx={{
                backgroundColor: color.hex_code,
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                position: "relative",
                borderRadius: 0,
                overflow: "hidden",
                height: "100%",
                "&:hover .removeIcon": {
                  opacity: 1,
                  transform: "translateY(0)",
                },
              }}
            >
              <CloseIcon
                className="removeIcon"
                onClick={() => handleRemoveColor(idx)}
                sx={{
                  position: "absolute",
                  top: "40%",
                  transform: "translateY(-100%)",
                  cursor: "pointer",
                  color: "black",
                  fontSize: "20px",
                  opacity: 0,
                  transition: "all 0.3s ease-in-out",
                  zIndex: 2,
                }}
              />
              <Typography
                variant="h6"
                sx={{ color: "black", fontWeight: "bold", fontSize: "25px" }}
              >
                {color.hex_code.replace("#", "")}
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "black", fontSize: "14px" }}
              >
                {color.name}
              </Typography>
            </Box>

            {idx < colors.length - 1 && colors.length < 15 && (
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  right: "-4px",
                  width: "8px",
                  height: "100%",
                  zIndex: 10,
                  "&:hover .plusIcon": {
                    opacity: 1,
                    transform: "translate(-50%, -50%) scale(1)",
                  },
                }}
              >
                <Box
                  className="plusIcon"
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%) scale(0)",
                    transition: "all 0.3s ease",
                    opacity: 0,
                    zIndex: 11,
                    backgroundColor: "#fff",
                    borderRadius: "50%",
                    width: "40px",
                    height: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 0 6px rgba(0,0,0,0.25)",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    const blendedHex = blendColors(
                      color.hex_code,
                      colors[idx + 1].hex_code
                    );
                    const newColor: Color = {
                      name: "Blend",
                      hex_code: blendedHex,
                    };
                    const newColors = [...colors];
                    newColors.splice(idx + 1, 0, newColor);
                    dispatch(setColors(newColors));
                  }}
                >
                  <Typography sx={{ fontSize: "24px", fontWeight: "bold" }}>
                    +
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
        ))}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
        <Button
          variant="contained"
          onClick={handleUndo}
          disabled={historyIndex <= 0}
        >
          Undo
        </Button>
        <Button
          variant="contained"
          onClick={handleRedo}
          disabled={historyIndex >= history.length - 1}
          sx={{ marginLeft: 2 }}
        >
          Redo
        </Button>
      </Box>
    </>
  );
};

export default Colors;
