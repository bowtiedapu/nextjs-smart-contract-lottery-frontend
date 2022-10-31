import { useEffect, useState } from "react"
import { useWeb3Contract, useMoralis } from "react-moralis"
import { abi, contractAddresses } from "../constants"
import { ethers } from "ethers"

export default function LotteryEntrace() {
    // Pull out the chainId object, and name it chainIdHex
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
    const chainId = parseInt(chainIdHex)
    const raffleAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null

    // This uses a state hook. It triggers a re-render. The first value is the actual variable, the second value is the function to update it
    const [entranceFee, setEntranceFee] = useState("0") // Entrance fee will start out as "0"

    const { runContractFunction: enterRaffle } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "enterRaffle",
        params: {},
        msgValue: entranceFee,
    })

    const { runContractFunction: getEntranceFee } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getEntranceFee",
        params: {},
    })

    useEffect(() => {
        if (isWeb3Enabled) {
            async function updateUI() {
                const entranceFeeFromCall = (await getEntranceFee()).toString()
                setEntranceFee(entranceFeeFromCall)
                console.log(entranceFeeFromCall)
            }
            updateUI()
        }
    }, [isWeb3Enabled])
    return (
        <div>
            Welcome to LotteryEntrance.
            {raffleAddress ? (
                <div>
                    <button
                        onClick={async function () {
                            await enterRaffle()
                        }}
                    >
                        Enter Raffle
                    </button>
                    {ethers.utils.formatUnits(entranceFee, "ether")} ETH
                </div>
            ) : (
                <div> No raffle address detected</div>
            )}
        </div>
    )
}
