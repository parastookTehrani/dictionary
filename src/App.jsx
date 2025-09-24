import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "./lib/reactQuery"
import { Dictionary } from "./components/dictionary"

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <Dictionary />
    </QueryClientProvider>
  )
}

export default App
