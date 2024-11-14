import "./Dashboard.styles.scss"
import PacketTable from "../Packet Table/PacketTable.component";
import { useEffect, useState } from "react";
import { getPacket } from "../../utils/getPackets";
import { detailsSelector, ToggleDetailsModule, UpdateDetails } from "../../store/details.reducer";
import { useSelector,  useDispatch } from "react-redux";
import DetailsModal from "../DetailsModule/DetailsModule.component";
import { SummaryToggleSelector, ToggleSummaryModal, UpdateSummary, SummarySelector } from "../../store/summarization.reducer";
import SummaryModule from "../Summarize/Summarize.component";

    
const DashBoard = () => {
    const [Packets, setPackets] = useState([])
    const Detailstoggle = useSelector(detailsSelector);
    const [detailsModalDisplay, setDetailsModalDisplay] = useState(Detailstoggle)
    const SummaryToggle = useSelector(SummaryToggleSelector)
    const dispatch = useDispatch();
    const Summary = useSelector(SummarySelector)

    useEffect(() => {
        setDetailsModalDisplay(Detailstoggle)
    }, [Detailstoggle])

    const handleDetailsClick = (item) => {
        dispatch(ToggleDetailsModule(!Detailstoggle))
        console.log(item)
        dispatch(UpdateDetails(item))
      };
      
    const handleSummarizeClick = (item) => {
        dispatch(UpdateSummary(item))
        console.log(Summary)
        dispatch(ToggleSummaryModal(!SummaryToggle))

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
            {/* {Detailstoggle ? "Details" : "No Details"} */}
            {/* <button onClick={() => HandleSummarize()}>Summarize</button> */}
            {detailsModalDisplay && <DetailsModal/>}
            {SummaryToggle && <SummaryModule/>}
        </div>
    )
}

export default DashBoard