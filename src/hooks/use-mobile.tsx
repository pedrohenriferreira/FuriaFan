
import { useState, useEffect } from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    // Function to check if the window width is less than the mobile breakpoint
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Run immediately
    checkMobile()
    
    // Add event listener
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    // Modern approach using addEventListener
    mql.addEventListener("change", checkMobile)
    
    // Cleanup function
    return () => mql.removeEventListener("change", checkMobile)
  }, []) // Empty dependency array ensures this only runs once on mount

  return isMobile
}
