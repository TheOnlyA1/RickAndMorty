import React from "react";

import axios from "axios";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import "./main-container-styles.css";

const MainContainer = () => {
  const apiURL = "https://rickandmortyapi.com/api";

  const [characters, setCharacters] = React.useState([]);
  const [locations, setLocations] = React.useState([]);
  const [episodes, setEpisodes] = React.useState([]);

  React.useEffect(() => {
    if (characters.length === 0) {
      const fetchAllCharacterData = async () => {
        try {
          const response = await axios(apiURL + "/character");
          setCharacters(response?.data?.results);
        } catch (e) {
          console.error(e);
        }
      };
      fetchAllCharacterData();
    }

    if (locations.length === 0) {
      const fetchAllLocationData = async () => {
        try {
          const response = await axios(apiURL + "/location");
          setLocations(response?.data?.results);
        } catch (e) {
          console.error(e);
        }
      };
      fetchAllLocationData();
    }

    if (episodes.length === 0) {
      const fetchAllEpisodeData = async () => {
        try {
          let response = null,
            page = 0,
            results = [];

          do {
            response = await axios.get(`${apiURL}/episode?page=${page++}`);
            results = results.concat(response?.data?.results);
          } while (page < response?.data?.info?.pages);

          setEpisodes(results);
        } catch (e) {
          console.error(e);
        }
      };
      fetchAllEpisodeData();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid className="main-container" container spacing={5}>
      {characters &&
        locations &&
        episodes &&
        characters.map(({ id, name, image, species, origin, episode }) => {
          const charactersLocation = locations.find(
            (loc) => loc.name === origin.name
          );

          const allEpisodeNames = [];

          for (let x = 0; x < episode.length; x++) {
            const eachEpisodeURL = episode[x];

            for (let j = 0; j < episodes.length; j++) {
              const eachEpisodeObj = episodes[j];
              const { url, name } = eachEpisodeObj;

              if (eachEpisodeURL === url) allEpisodeNames.push(name);
            }
          }

          allEpisodeNames.sort((a, b) => a.localeCompare(b));

          return (
            <Grid item xs={4} key={id}>
              <Card className="card-container">
                <CardMedia component="img" height="250" image={image} />
                <CardContent className="card-content">
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    className="character-title"
                  >
                    {name}
                  </Typography>
                  <Typography color="text.secondary">Bio:</Typography>
                  <Typography
                    variant="body2"
                    color="text.primary"
                    className="card-text"
                  >
                    {`Species: ${species}
                  Origin: ${origin?.name}
                 `}
                  </Typography>

                  <Typography color="text.secondary">Location:</Typography>
                  <Typography
                    variant="body2"
                    color="text.primary"
                    className="card-text"
                  >
                    {`Name: ${
                      (charactersLocation && charactersLocation?.name) ||
                      "unknown"
                    }
                    Dimension: ${
                      (charactersLocation && charactersLocation?.dimension) ||
                      "unknown"
                    }
                    Amount of Residents: ${
                      (charactersLocation &&
                        charactersLocation?.residents.length) ||
                      "unknown"
                    }
                 `}
                  </Typography>

                  <Typography color="text.secondary">Episodes:</Typography>
                  <Typography
                    variant="body2"
                    color="text.primary"
                    className="episodes-container"
                  >
                    {allEpisodeNames.map((ep) => ep).join(", ")}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
    </Grid>
  );
};

export default MainContainer;
