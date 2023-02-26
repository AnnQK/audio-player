import { useQuery } from "react-query"
import { fetchSongs } from "./api"
import Player from "./components/Player/Player"
import "./styles/style.scss"

function App() {
  const { data, isLoading } = useQuery("songs", fetchSongs)

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  return (
    <Player songsList={data} />
  )
}

export default App
