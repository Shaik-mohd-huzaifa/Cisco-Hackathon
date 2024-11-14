import { useEffect } from 'react';
import './PacketTable.styles.scss';



const PacketTable = ({ data, onDetailsClick, onSummarizeClick }) => {
  
  return (
    <table className="table">
      <thead>
        <tr>
          <th>TCP IP</th>
          <th>Ethernet Type</th>
          <th>Threat</th>
          <th>Details</th>
          <th>Summarize</th>
        </tr>
      </thead>
      {data ?
      <tbody>
        {data && data.map((item, index) => (
          <tr key={index}>
            <td>{item.IP.dst}</td>
            <td>{item.Ethernet.type}</td>
            <td className={item.threat ? "td-threat-type-true" : "td-threat-type-false"}>{item.threat ? <p>Threat</p> : <p>Not Threat</p>}</td>
            <td>
              <button 
                className="button" 
                onClick={() => onDetailsClick(item)}
              >
                Details
              </button>
            </td>
            <td>
              <button 
                className="button" 
                onClick={() => onSummarizeClick(item)}
              >
                Summarize
              </button>
            </td>
          </tr>
        ))}
      </tbody> : "No Record Found"}
    </table>
  );
};

export default PacketTable;
