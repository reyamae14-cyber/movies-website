import { Suspense } from "react"
import { useSelector } from "react-redux"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"

import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"

import PageWrapper from "./components/common/PageWrapper"
import MainLayout from "./components/layout/MainLayout"

import themeConfigs from "./configs/theme.configs"

import routes from "./routes/routes"

import "react-toastify/dist/ReactToastify.css"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

const App = () => {
  const { themeMode } = useSelector((state) => state.themeMode)

  return (
    <ThemeProvider theme={themeConfigs.custom({ mode: themeMode })}>
      {/* config toastify */}
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
        theme={themeMode}
      />
      {/* mui reset css */}
      <CssBaseline />

      {/* app routes */}
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              {
                routes?.map((route, index) => (
                  route.index ? (
                    <Route
                      index
                      key={index}
                      element={route.state ? (
                        <PageWrapper state={route.state}>{route.element}</PageWrapper>
                      ) : route.element}
                    />
                  ) : (
                    <Route
                      path={route.path}
                      key={index}
                      element={route.state ? (
                        <PageWrapper state={route.state}>{route.element}</PageWrapper>
                      ) : route.element}
                    />
                  )
                ))
              }
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
      {/* app routes */}
    </ThemeProvider>
  )
}

export default App