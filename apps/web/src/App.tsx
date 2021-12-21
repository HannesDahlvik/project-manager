import React, { useState } from 'react'

// Routing
import AppRoutes from './Routes'

// Utils
import { trpc } from './utils/trpc'
import { QueryClient, QueryClientProvider } from 'react-query'

const App: React.FC = () => {
    const [queryClient] = useState(() => new QueryClient())
    const [trpcClient] = useState(() =>
        trpc.createClient({
            url: 'http://localhost:5000/trpc'
        })
    )

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                <AppRoutes />
            </QueryClientProvider>
        </trpc.Provider>
    )
}

export default App
