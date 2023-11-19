import { AuthProvider } from "@/modules/context/authContext"
import "./index.css"

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}
