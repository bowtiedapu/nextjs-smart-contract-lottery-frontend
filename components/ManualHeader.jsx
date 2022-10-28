import {useMoralis} from "react-moralis"

export default function ManualHeader() {
    // This acts as our React hook, allowing us to latch onto the React state and lifecycle features
    const {enableWeb3} = useMoralis() 
    // The whole point of using hooks like this is so that our front end can re-render whenever the state of the React app changes


    // To use Moralis correctly, we need to create a provider in our _app.js
    
    return(<div>
        <button onClick={async () => {await enableWeb3()}}>Connect</button>
        </div>)
}