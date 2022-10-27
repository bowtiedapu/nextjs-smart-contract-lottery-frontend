import {useMoralis} from "react-moralis"

export default function ManualHeader() {
    // This acts as our React hook, allowing us to latch onto the React state and lifecycle features
    const {enableWeb3} = useMoralis() 

    // To use Moralis correctly, we need to create a provider in our _app.js
    
    return(<div>Henlo world from header</div>)
}