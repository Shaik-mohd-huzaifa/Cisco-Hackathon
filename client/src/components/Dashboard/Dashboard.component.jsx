import "./Dashboard.styles.scss"
import PacketTable from "../Packet Table/PacketTable.component";
import { useEffect, useState } from "react";
import { getPacket } from "../../utils/getPackets";
import { detailsSelector, ToggleDetailsModule, UpdateDetails } from "../../store/details.reducer";
import { useSelector,  useDispatch } from "react-redux";
import DetailsModal from "../DetailsModule/DetailsModule.component";
import { SummaryToggleSelector, ToggleSummaryModal } from "../../store/summarization.reducer";
import SummaryModule from "../Summarize/Summarize.component";

// const sampleData = [
//     { tcpIp: '192.168.1.1', ethernetType: 'IPv4',threat: true, details: 'Local Network', summarize: 'LAN' },
//     { tcpIp: '192.168.1.2', ethernetType: 'IPv6',threat: false, details: 'Remote Network', summarize: 'WAN' },
//   ];

    
const DashBoard = () => {
    const [Packets, setPackets] = useState([])
    const Detailstoggle = useSelector(detailsSelector);
    const [detailsModalDisplay, setDetailsModalDisplay] = useState(Detailstoggle)
    const SummaryToggle = useSelector(SummaryToggleSelector)
    const dispatch = useDispatch();

    useEffect(() => {
        setDetailsModalDisplay(Detailstoggle)
    }, [Detailstoggle])

    const handleDetailsClick = (item) => {
        dispatch(ToggleDetailsModule(!Detailstoggle))
        console.log(item)
        dispatch(UpdateDetails(item))
      };
      
    const handleSummarizeClick = (item) => {
        alert(`Summary for: ${item.tcpIp}`);
      };

    const HandleSummarize = () => {
        dispatch(ToggleSummaryModal(!SummaryToggle))
    }
    useEffect(() => {
        async function packets(){
            const data = await getPacket()
            setPackets(data.data)
            console.log(data)
        }
        packets()
    }, [])

    return (
        <div className="dashboard-container">
            <h2>Threat Detection</h2>
            <PacketTable data={Packets} onSummarizeClick={handleSummarizeClick} onDetailsClick={handleDetailsClick}/>
            {Detailstoggle ? "Details" : "No Details"}
            <button onClick={() => HandleSummarize()}>Summarize</button>
            {SummaryToggle && <SummaryModule/>}
        </div>
    )
}

export default DashBoard