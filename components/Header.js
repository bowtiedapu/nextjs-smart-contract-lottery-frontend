import { ConnectButton } from "web3uikit"

export default function Header() {
    return (
        <div>
            <h1>BowTiedApu's Smart Contract Lottery</h1>
            <br />
            <ConnectButton moralisAuth={false} />
        </div>
    )
}
