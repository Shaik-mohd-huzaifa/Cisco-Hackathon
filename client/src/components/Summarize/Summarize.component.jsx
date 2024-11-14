import "./Summarize.styles.scss"
import { detailsContentSelector, detailsSelector, ToggleDetailsModule } from "../../store/details.reducer";
import { useSelector,  useDispatch } from "react-redux";
import { IoCloseSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import { getSummarization } from "../../utils/getSummary";
import { SummaryToggleSelector, ToggleSummaryModal } from "../../store/summarization.reducer";
import {ClipLoader} from "react-spinners"


const SummaryModule = ({structure}) => {
  const [summary, setSummary] = useState("")
  const dispatch = useDispatch()
  const toogle = useSelector(SummaryToggleSelector)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function summary(){
        setLoading(true)
        const data = await getSummarization(structure)
        setSummary(data.response)
        setLoading(false)
    }   

    summary()
  }, [structure])

  function HandleToggle(){
    dispatch(ToggleSummaryModal(!toogle))
  }
    
  return (
    <div className="modal-overlay">
      <div className="container">
          {
            summary ? <p>{summary}</p> : "No Summary Available"
          }
      <div className="loader">
      {loading && 
      <ClipLoader />
      }
      </div>
      </div>
      <button onClick={() => HandleToggle()}>Close <IoCloseSharp></IoCloseSharp></button>
    </div>
  );
};

export default SummaryModule