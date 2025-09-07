import { useState, useEffect, useCallback } from "react"
import { toast } from "react-toastify"

import { LoadingButton } from "@mui/lab"
import { Box, Button, ButtonGroup, Stack, TextField, Toolbar } from "@mui/material"

import mediaApi from "../api/modules/media.api"

import MediaGrid from "../components/common/MediaGrid"

import uiConfigs from "../configs/ui.configs"

const mediaTypes = ["movie", "tv", "people"]
let timer
const timeout = 500

const MediaSearch = () => {
  const [query, setQuery] = useState("")
  const [onSearch, setOnSearch] = useState(false)
  const [mediaType, setMediaType] = useState(mediaTypes[0])
  const [medias, setMedias] = useState([])
  const [page, setPage] = useState(1)

  const search = useCallback(
    async () => {
      setOnSearch(true)

      const { response, err } = await mediaApi.search({
        mediaType,
        query,
        page
      })

      setOnSearch(false)

      if (err) toast.error(err.message)
      if (response) {
        if (page > 1) setMedias(m => [...m, ...(response.results || [])])
        else setMedias([...(response.results || [])])
      }
    },
    [mediaType, query, page],
  )

  useEffect(() => {
    if (query.trim().length === 0) {
      setMedias([])
      setPage(1)
    } else search()
  }, [search, query, mediaType, page])

  useEffect(() => {
    setMedias([])
    setPage(1)
  }, [mediaType])

  const onCategoryChange = (selectedCategory) => setMediaType(selectedCategory)

  const onQueryChange = (e) => {
    const newQuery = e.target.value
    clearTimeout(timer)

    timer = setTimeout(() => {
      setQuery(newQuery)
    }, timeout)
  }

  return (
    <>
      <Toolbar />
      <Stack
        spacing={2}
        sx={{
          p: 2,
          px: { xs: 2, lg: 12 },
          position: "fixed",
          width: "100%",
          zIndex: 100,
          backgroundColor: "background.paper"
        }}
      >
        <Stack
          spacing={2}
          direction="row"
          justifyContent="center"
          sx={{ width: "100%" }}
        >
          <ButtonGroup
            sx={{ width: { xs: "100%", sm: "50%", md: "50%" } }}
          >
            {
              mediaTypes.map((item, index) => (
                <Button
                  fullWidth
                  size="large"
                  key={index}
                  variant={mediaType === item ? "contained" : "text"}
                  sx={{
                    color: mediaType === item ? "primary.contrastText" : "text.primary"
                  }}
                  onClick={() => onCategoryChange(item)}
                >
                  {item}
                </Button>
              ))
            }
          </ButtonGroup>
        </Stack>
        <TextField
          color="success"
          placeholder="Search MoonFlix"
          sx={{ width: "100%" }}
          autoFocus
          onChange={onQueryChange}
        />
      </Stack>
      <Box sx={{ ...uiConfigs.style.mainContent, mb: 2 }}>
        <Box
          sx={{
            mt: 19
          }}
        >
          <MediaGrid medias={medias} mediaType={mediaType} />
          {
            medias.length !== 0 && <LoadingButton
              sx={{ mt: { xs: 2, lg: 3 } }}
              loading={onSearch}
              fullWidth
              color="primary"
              onClick={() => setPage((prev) => prev + 1)}
            >
              load more
            </LoadingButton>
          }
        </Box>
      </Box>
    </>
  )
}

export default MediaSearch