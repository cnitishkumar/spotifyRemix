import {Switch, Route, Redirect} from 'react-router-dom'

import './App.css'
import Login from './components/Login'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import EditorsPicksSpecificAlbumPlaylist from './components/EditorsPicksSpecificAlbumPlaylist'
import GenersAndMoodsSpecificAlbumPlayList from './components/GenersAndMoodsSpecificAlbumPlayList'
import NewReleaseSpecificAlbumPlayList from './components/NewReleaseSpecificAlbumPlayList'

import NotFound from './components/NotFound'

// write your code here
const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute
      exact
      path="/category/:id/playlists"
      component={GenersAndMoodsSpecificAlbumPlayList}
    />
    <ProtectedRoute
      exact
      path="/playlist/:id"
      component={EditorsPicksSpecificAlbumPlaylist}
    />
    <ProtectedRoute
      exact
      path="/category/:id/playlist/:id"
      component={EditorsPicksSpecificAlbumPlaylist}
    />

    <ProtectedRoute
      exact
      path="/album/:id"
      component={NewReleaseSpecificAlbumPlayList}
    />

    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
