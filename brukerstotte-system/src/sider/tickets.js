import { useContext } from "react";
import { TicketsContext } from "../context";

export default function Tickets() {
    const [feilMeldinger, setFeilMeldinger] = useContext(TicketsContext)
    const handleTicketLøst = (id, løst) => {
        const oppdaterteFeilMeldinger = feilMeldinger.map((ticket) =>
            ticket.id === id ? { ...ticket, løst: løst } : ticket
        );

        setFeilMeldinger(oppdaterteFeilMeldinger);
    };
    return (
        <div className="tickets">
            <h2>Feilmeldinger og tickets</h2>
            <ul>
                {feilMeldinger.map((ticket) => (
                    <li key={ticket.id} className={ticket.løst ? 'ticket-loest' : 'ticket'}>
                        <div>
                            <p><strong>Navn:</strong> {ticket.navn}</p>
                            <div className="problem">
                            <p><strong>Problem:</strong> {ticket.problem}</p>
                            </div>
                            <p><strong>E-post:</strong> {ticket.epost}</p>
                            <p><strong>Telefon:</strong> {ticket.telefon}</p>
                            <p><strong>Dato og tid:</strong> {ticket.tidspunkt}</p> 
                            <p><strong>Løst:</strong> {ticket.løst ? 'Ja' : 'Nei'}</p>
                        </div>
                        {!ticket.løst && (
                            <button onClick={() => handleTicketLøst(ticket.id, true)}>Marker som løst</button>
                        )}
                        {ticket.løst && (
                            <button onClick={() => handleTicketLøst(ticket.id, false)}>Marker som uløst</button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}