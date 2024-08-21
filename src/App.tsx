import './App.css'
import { ApolloClient, InMemoryCache,ApolloProvider } from '@apollo/client'
import MyRouters from './Routers/MyRouters.tsx'

function App() {
  const client = new ApolloClient({
    uri: "https://spacex-production.up.railway.app/",
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>
      <MyRouters></MyRouters>
  </ApolloProvider>
}

export default App
