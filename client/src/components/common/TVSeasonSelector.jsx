import React, { useState } from "react"
import { 
  Box, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Typography, 
  Card, 
  CardContent,
  Grid,
  Button
} from "@mui/material"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import tmdbConfigs from "../../api/configs/tmdb.configs"

const TVSeasonSelector = ({ seasons, onEpisodeSelect, currentSeason = 1, currentEpisode = 1 }) => {
  const [selectedSeason, setSelectedSeason] = useState(currentSeason)
  const [selectedEpisode, setSelectedEpisode] = useState(currentEpisode)

  const handleSeasonChange = (event) => {
    const seasonNum = event.target.value
    setSelectedSeason(seasonNum)
    setSelectedEpisode(1) // Reset to first episode when season changes
    if (onEpisodeSelect) {
      onEpisodeSelect(seasonNum, 1)
    }
  }

  const handleEpisodeChange = (event) => {
    const episodeNum = event.target.value
    setSelectedEpisode(episodeNum)
    if (onEpisodeSelect) {
      onEpisodeSelect(selectedSeason, episodeNum)
    }
  }

  const handleEpisodeClick = (seasonNum, episodeNum) => {
    setSelectedSeason(seasonNum)
    setSelectedEpisode(episodeNum)
    if (onEpisodeSelect) {
      onEpisodeSelect(seasonNum, episodeNum)
    }
  }

  const currentSeasonData = seasons?.find((_, index) => index + 1 === selectedSeason)
  const currentEpisodeData = currentSeasonData?.episodes?.find((_, index) => index + 1 === selectedEpisode)

  return (
    <Box sx={{ mt: 3 }}>
      {/* Dropdown Selectors */}
      <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Season</InputLabel>
          <Select
            value={selectedSeason}
            label="Season"
            onChange={handleSeasonChange}
          >
            {seasons?.map((season, index) => (
              <MenuItem key={index} value={index + 1}>
                {season.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Episode</InputLabel>
          <Select
            value={selectedEpisode}
            label="Episode"
            onChange={handleEpisodeChange}
            disabled={!currentSeasonData?.episodes}
          >
            {currentSeasonData?.episodes?.map((episode, index) => (
              <MenuItem key={index} value={index + 1}>
                Episode {index + 1}: {episode.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Current Episode Info */}
      {currentEpisodeData && (
        <Card sx={{ mb: 3, backgroundColor: "background.paper" }}>
          <CardContent>
            <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
              {currentEpisodeData.still_path && (
                <Box
                  component="img"
                  src={tmdbConfigs.backdropPath(currentEpisodeData.still_path)}
                  alt={currentEpisodeData.name}
                  sx={{
                    width: 200,
                    height: 112,
                    objectFit: "cover",
                    borderRadius: 1,
                    flexShrink: 0
                  }}
                />
              )}
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" gutterBottom>
                  S{selectedSeason}E{selectedEpisode}: {currentEpisodeData.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Air Date: {currentEpisodeData.air_date}
                </Typography>
                <Typography variant="body2">
                  {currentEpisodeData.overview}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Episodes Grid */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        {currentSeasonData?.name} Episodes
      </Typography>
      <Grid container spacing={2}>
        {currentSeasonData?.episodes?.map((episode, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card 
              sx={{ 
                cursor: "pointer",
                transition: "all 0.2s",
                border: selectedEpisode === index + 1 ? 2 : 0,
                borderColor: "primary.main",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: 4
                }
              }}
              onClick={() => handleEpisodeClick(selectedSeason, index + 1)}
            >
              <Box sx={{ position: "relative" }}>
                {episode.still_path && (
                  <Box
                    component="img"
                    src={tmdbConfigs.backdropPath(episode.still_path)}
                    alt={episode.name}
                    sx={{
                      width: "100%",
                      height: 140,
                      objectFit: "cover"
                    }}
                  />
                )}
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(0,0,0,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: 0,
                    transition: "opacity 0.2s",
                    "&:hover": { opacity: 1 }
                  }}
                >
                  <Button
                    variant="contained"
                    startIcon={<PlayArrowIcon />}
                    size="small"
                  >
                    Play
                  </Button>
                </Box>
              </Box>
              <CardContent sx={{ p: 2 }}>
                <Typography variant="subtitle2" noWrap>
                  {index + 1}. {episode.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {episode.air_date}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    mt: 1,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden"
                  }}
                >
                  {episode.overview}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default TVSeasonSelector