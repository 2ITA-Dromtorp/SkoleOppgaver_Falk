//select.js
import { useEffect, useState } from "react";
import axios from "axios";
import './table_style.css';

export default function Select() {
    const [customerData, setCustomerData] = useState([]);

    useEffect(() => {
        getCustomersData();
    }, []);

    const getCustomersData = () => {
        axios
            .get("http://localhost:3001/")
            .then(response => {
                setCustomerData(response.data);
            })
            .catch(error => console.log(error));
    };

    return (
        <>
        <div className="table-container">
            
            <table className="styled-table">
                <thead>
                    <tr>
                        <th>ElevID</th>
                        <th>Fornavn</th>
                        <th>Etternavn</th>
                        <th>DatamaskinID</th>
                        <th>Hobby</th>
                        <th>Klasse</th>
                        <th>Kjønn</th>
                    </tr>
                </thead>
                <tbody>
                    {customerData.map(customer => (
                        <tr key={customer.ElevID}>
                            <td>{customer.ElevID}</td>
                            <td>{customer.Fornavn}</td>
                            <td>{customer.Etternavn}</td>
                            <td>{customer.DatamaskinID}</td>
                            <td>{customer.Hobby}</td>
                            <td>{customer.Klasse}</td>
                            <td>{customer.Kjonn}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    );
}
