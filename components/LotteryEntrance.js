import { useEffect, useState } from "react"
import { useWeb3Contract, useMoralis } from "react-moralis"
import { abi, contractAddresses } from "../constants"
import { ethers } from "ethers"
import { useNotification } from "web3uikit"

export default function LotteryEntrance() {
    // Pull out the chainId object, and name it chainIdHex
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
    const chainId = parseInt(chainIdHex)
    const raffleAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null

    // This uses a state hook. It triggers a re-render. The first value is the actual variable, the second value is the function to update it
    const [entranceFee, setEntranceFee] = useState("0") // Entrance fee will start out as "0"
    const [numPlayers, setNumPlayers] = useState("0")
    const [lastWinner, setLastWinner] = useState("0")

    const dispatch = useNotification()

    /**
     * Below demonstrates how we interact with the functions defined in the ABI.
     * To solidify this knowledge:
     * 1. Start up the backend via yarn hardhat node
     * 2. yarn hardhat deploy any updates you make to the smart contracts
     * 3. the deploy script in the backend project updates the constants folder in the frontend project
     * 4. the frontend project uses React components which import libraries like moralis and web3uikit to interact
     *    with the backend that's running. To do this, it references the constants file for the ABI and contract addresses
     */
    // 1. Get the entrance fee, so anyone who wants to enter knows how much they need to pay
    const { runContractFunction: getEntranceFee } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getEntranceFee",
        params: {},
    })

    // 2. Option to enter the raffle
    const { runContractFunction: enterRaffle } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "enterRaffle",
        params: {},
        msgValue: entranceFee,
    })

    // 3. View the current # of players
    const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getNumberOfPlayers",
        params: {},
    })

    const { runContractFunction: getRecentWinner } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getRecentWinner",
        params: {},
    })

    async function updateUI() {
        const entranceFeeFromCall = (await getEntranceFee()).toString()
        const numOfPlayersFromCall = (await getNumberOfPlayers()).toString()
        const lastWinnerFromCall = (await getRecentWinner()).toString()
        setEntranceFee(entranceFeeFromCall)
        setNumPlayers(numOfPlayersFromCall)
        setLastWinner(lastWinnerFromCall)
        console.log(entranceFeeFromCall)
        console.log(numOfPlayersFromCall)
        console.log(lastWinnerFromCall)
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI()
        }
    }, [isWeb3Enabled])

    const handleSuccess = async function (tx) {
        await tx.wait(1)
        handleNewNotification(tx)
        updateUI()
    }

    const handleNewNotification = function () {
        dispatch({
            type: "info",
            message: "txn complete",
            title: "tx notification",
            position: "topR",
            icon: "bell",
        })
    }

    return (
        <div>
            Click the button below to win (no this is not the power ball)
            {raffleAddress ? (
                <div>
                    <button
                        onClick={async function () {
                            await enterRaffle({
                                onSuccess: handleSuccess,
                                onError: (error) => console.log(error),
                            })
                        }}
                    >
                        Enter Raffle
                    </button>
                    <br />
                    <br />
                    Lottery Entrance Fee: {ethers.utils.formatUnits(entranceFee, "ether")} ETH
                    <br />
                    <br />
                    Current Number of Players: {numPlayers}
                    <br />
                    <br />
                    Recent Winner: {lastWinner}
                    <br />
                    <br />
                </div>
            ) : (
                <div> No raffle address detected</div>
            )}
        </div>
    )
}
