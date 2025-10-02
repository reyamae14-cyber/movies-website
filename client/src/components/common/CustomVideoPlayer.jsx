import { useEffect, useRef } from "react"
import { Box } from "@mui/material"

const CustomVideoPlayer = ({ mediaType, mediaId, seasonNumber, episodeNumber }) => {
  const iframeRef = useRef()

  useEffect(() => {
    if (iframeRef.current) {
      const height = iframeRef.current.offsetWidth * 9 / 16 + "px"
      iframeRef.current.setAttribute("height", height)
    }
  }, [mediaType, mediaId, seasonNumber, episodeNumber])

  const getVideoUrl = () => {
    const baseUrl = "https://samxerz-zeticuz.vercel.app/"
    
    if (mediaType === "movie") {
      return `${baseUrl}/movie/${mediaId}`
    } else if (mediaType === "tv" && seasonNumber && episodeNumber) {
      return `${baseUrl}/tv/${mediaId}/${seasonNumber}/${episodeNumber}`
    }
    return null
  }

  const videoUrl = getVideoUrl()

  if (!videoUrl) {
    return (
      <Box sx={{ 
        height: "max-content", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        minHeight: "300px",
        backgroundColor: "#000",
        color: "#fff"
      }}>
        <p>Video not available for this content</p>
      </Box>
    )
  }

  return (
    <Box sx={{ height: "max-content", position: "relative" }}>
      <iframe
        src={videoUrl}
        ref={iframeRef}
        width="100%"
        title={`${mediaType}-${mediaId}`}
        style={{ 
          border: 0,
          minHeight: "400px"
        }}
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>
    </Box>
  )
}

export default CustomVideoPlayer
