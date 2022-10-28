import {useMoralis} from "react-moralis"
import {useEffect} from "react"
export default function ManualHeader() {
    // This acts as our React hook, allowing us to latch onto the React state and lifecycle features
    const {enableWeb3, account, isWeb3Enabled, Moralis, deactivateWeb3} = useMoralis() 
    // The whole point of using hooks like this is so that our front end can re-render whenever the state of the React app changes


    // To use Moralis correctly, we need to create a provider in our _app.js
    

    // useEffect keeps checking for the values in the dependency array, and if anything changes in that array, it will call the function defined
    /**
     * Example of useEffect's syntax:
     * useEffect(() => {}, [])
     * Where {} is the function, and the [] is the dependency array. 
     * If a dependency array is NOT provided, then useEffect will 
     * trigger anytime something re-renders. If we aren't careful, we can keep re-rendering over and over again (circular re-rendering)
     * 
     * If a dependary array is present, but blank, it runs only once on load
     */

    // Connect
    useEffect(() => {
        if (isWeb3Enabled) return
        if (typeof window !== "undefined") {
            // To understand this better, go to Storage > Local Storage, and search for the key called "connected"
            if (window.localStorage.getItem("connected")) {
                enableWeb3()
            }
        }

    }, [isWeb3Enabled])

    // Disconnect
    useEffect(() => {
        Moralis.onAccountChanged((account) => {
            if (account == null) {
                window.localStorage.removeItem("connected")
                deactivateWeb3()
            }
        })
    }, [])
    return(<div>
        {
        account ? 
        (<div>Already connected to account {account}</div>) : 
        (<button onClick={async () => {
                await enableWeb3()
                // Here, we set a new key value pair for "connected", "inject"
                if (typeof window !== "undefined") {
                    window.localStorage.setItem("connected", "inject")
                }
                }
                }>
                    Connect
            </button>)
            }
        
        </div>)
}