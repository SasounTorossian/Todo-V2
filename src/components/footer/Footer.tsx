import { Box, Link, Paper, Typography } from "@mui/material";
import githubDark from "../../assets/github-dark.png";
import githubLight from "../../assets/github-light.png";
import { useThemeContext } from "../../hooks/useThemeContext";

const Footer = () => {
  const { mode } = useThemeContext();
  return (
    <Paper className="flex justify-center items-center p-2 gap-3">
      <Typography variant="body2">
        A Project By Sasoun Torossian, 2025.
      </Typography>
      <Link href="https://github.com/SasounTorossian">
        <Box
          component="img"
          sx={{
            height: 25,
            width: 25,
            transition: "transform 0.1s ease-in-out",
            "&:hover": { transform: "scale(1.1)" },
          }}
          alt="Github Logo"
          src={mode === "light" ? githubLight : githubDark}
        />
      </Link>
    </Paper>
  );
};

export default Footer;
