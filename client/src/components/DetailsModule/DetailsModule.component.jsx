import "./DetailsModule.styles.scss"
import { detailsContentSelector, detailsSelector, ToggleDetailsModule } from "../../store/details.reducer";
import { useSelector,  useDispatch } from "react-redux";
import { IoCloseSharp } from "react-icons/io5";
import { useEffect, useState } from "react";


const DetailsModal = () => {
    const Detailstoggle = useSelector(detailsSelector);
    // const [data, setData] = useState({})
    const details = useSelector(detailsContentSelector)
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(ToggleDetailsModule(!Detailstoggle))
        console.log(Detailstoggle)
    }
  return (
    <div className="modal-overlay">
      <div className="modal-container">
          <h2>Details</h2>
          <div className="details">
          <pre>{JSON.stringify(details, null, 2)}</pre>
          </div>
        </div>
        <div className="modal-footer">
        <button className="modal-close" onClick={() => handleClose()}>Close <IoCloseSharp/></button>
      </div>
    </div>
  );
};

export default DetailsModal;
