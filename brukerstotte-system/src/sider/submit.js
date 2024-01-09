import { useContext, useState } from "react";
import { TicketsContext } from "../context";

export default function Submit() {
	const [feilMeldinger, setFeilMeldinger] = useContext(TicketsContext);
	const [skjemaData, setSkjemaData] = useState({});
	const [lagretTicket, setLagretTicket] = useState(null);

	const handleSkjemaSubmit = () => {
		if (!skjemaData.problem || !skjemaData.epost) {
			alert('Vennligst fyll ut problem og e-post.');
			return;
		}

		const nyTicket = {
			id: feilMeldinger.length + 1,
			problem: skjemaData.problem,
			tidspunkt: new Date().toLocaleString(),
			epost: skjemaData.epost,
			navn: skjemaData.navn,
			telefon: skjemaData.telefon,
			løst: false,
		};

		setFeilMeldinger([...feilMeldinger, nyTicket]);
		setLagretTicket(true);
		setTimeout(() => {
			setLagretTicket(false);
		}, 150000);

		// Reset skjemaet
		setSkjemaData({});
	}

	return (
		<div className="App">
			<h1>Brukerstøtte System</h1>

			<div className="skjema">
				<h2>Skjema</h2>
				<label>
					Problem:
					<input
						type="text"
						value={skjemaData.problem || ''}
						onChange={(e) => setSkjemaData({ ...skjemaData, problem: e.target.value })}
					/>
				</label>
				<label>
					E-post:
					<input
						type="text"
						value={skjemaData.epost || ''}
						onChange={(e) => setSkjemaData({ ...skjemaData, epost: e.target.value })}
					/>
				</label>
				<label>
					Navn *optional*
					<input
						type="text"
						value={skjemaData.navn || ''}
						onChange={(e) => setSkjemaData({ ...skjemaData, navn: e.target.value })}
					/>
				</label>
				<label>
					Telefon *optional*
					<input
						type="text"
						value={skjemaData.telefon || ''}
						onChange={(e) => setSkjemaData({ ...skjemaData, telefon: e.target.value })}
					/>
				</label>
				<button onClick={handleSkjemaSubmit}>Send inn skjema</button>
			</div>

			{lagretTicket && (
				<div>
					<h3>Lagret Ticket:</h3>
					<div>
						<p><strong>Problem:</strong> {skjemaData.problem}</p>
						<p><strong>Tidspunkt:</strong> {new Date().toLocaleString()}</p>
						<p><strong>E-post:</strong> {skjemaData.epost}</p>
						<p><strong>Løst:</strong> Nei</p>
					</div>
				</div>
			)}
		</div>
	);
}