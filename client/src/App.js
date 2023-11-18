import React, { useState, useEffect } from "react"
import useSWR from "swr"
import axios from "axios"
import TopicSelector from "./components/TopicSelector"
import "./App.css"
import {
  createTheme,
  ThemeProvider,
} from '@mui/material/styles';
import { yellow, grey } from '@mui/material/colors';

const theme = createTheme({
  typography: {
    fontFamily: "Inter, sans-serif"
  },
  palette: {
    mode: "dark",
    primary: yellow,
    text: {
      primary: "#fff",
      secondary: grey[500]
    }
  }
})

const get = async url => {
  const response = await axios.get(url)
  return response.data
}

function App() {

  const { data, error, isLoading } = useSWR("http://localhost:5000/getdata", get)

  if (error) return <div>Error</div>
  if (isLoading) return <div>loading</div>

  const topics = data.topics
  const translations = data.translations

  return (
    <ThemeProvider theme={theme}>
      <div className="app-container">
        <TopicSelector topics={topics} translations={translations}/>
      </div>
    </ThemeProvider>
  )

}

export default App;