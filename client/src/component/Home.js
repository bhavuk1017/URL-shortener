import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Link
} from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";

const FrontendUrl = "http://localhost:3000/"
const BackendUrl = "http://localhost:4000";

function Home() {
  const [URL, setURL] = useState("");
  const [showNewURL, setShowNewURL] = useState("");
  const [showCustomURL, setShowCustomURL] = useState(false);
  const [customURL, setCustomURL] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BackendUrl}/save`, { URL, customURL });
      console.log(response.data);
      toast.success("Your shortened URL has been generated");
      setShowNewURL(response.data);
    } catch (error) {
      if (error.response?.status === 409) {
        toast.error("Custom URL already exists");
        console.log(error.response);
      } else {
        console.error("Error saving data:", error);
      }
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "20vh" }}>
      <Paper elevation={3} style={{ padding: "2em" }}>
        <Typography variant="h4" gutterBottom>
          URL Shortener
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            id="URL"
            name="URL"
            label="Enter the URL you want to shorten"
            variant="outlined"
            margin="normal"
            value={URL}
            onChange={(e) => setURL(e.target.value)}
            required
          />

          {showCustomURL && (
            <TextField
              fullWidth
              id="customURL"
              name="customURL"
              label="Custom URL"
              variant="outlined"
              margin="normal"
              value={customURL}
              onChange={(e) => setCustomURL(e.target.value)}
            />
          )}

          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setShowCustomURL(!showCustomURL)}
            >
              {showCustomURL ? "Hide Custom URL" : "Custom URL"}
            </Button>
          </Box>
        </form>

        {showNewURL && (
            <Box mt={4} textAlign="center">
              <Typography variant="h6">
                Shortened URL:
              </Typography>
              <Link href={`${FrontendUrl}${showNewURL}`} target="_blank" rel="noopener noreferrer" variant="body1" color="primary" display="block">
                {FrontendUrl}{showNewURL}
              </Link>
              <Button
                color="secondary"
                variant="contained"
                style={{ marginTop: "10px" }}
                onClick={async () => {
                  await navigator.clipboard.writeText(`${FrontendUrl}${showNewURL}`);
                  toast.success("URL copied to clipboard");
                }}
              >
                Copy URL
              </Button>
            </Box>
          )}
      </Paper>
    </Container>
  );
}

export default Home;
