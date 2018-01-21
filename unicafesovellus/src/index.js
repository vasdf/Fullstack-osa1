import React from 'react';
import ReactDOM from 'react-dom';

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const Statistics = (props) => {
    return (
        <div>
            <table>
                <tbody>
                    <Statistic name='hyva' value={props.statistiikka['hyva']} />
                    <Statistic name='neutraali' value={props.statistiikka['neutraali']} />
                    <Statistic name='huono' value={props.statistiikka['huono']} />
                    <Statistic name='keskiarvo' value={props.statistiikka['keskiarvo']} />
                    <Statistic name='positiivisia' value={props.statistiikka['positiivisia']} />
                </tbody>
            </table>
        </div>
    )
}

const Statistic = (props) => (
    <tr>
        <td>{props.name}:</td>
        <td>{props.value}</td>
    </tr>
)

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hyva: 0,
            neutraali: 0,
            huono: 0
        }
    }

    annaPalaute = (palaute) => {
        return () => {
            this.setState({ [palaute]: this.state[palaute] + 1 })
        }
    }

    render() {
        const hyva = this.state.hyva
        const neutraali = this.state.neutraali
        const huono = this.state.huono
        const keskiarvo = Math.round((hyva - huono) / (hyva + neutraali + huono) * 100) / 100
        const positiivisia = Math.round(hyva / (hyva + neutraali + huono) * 1000) / 10 + '%'

        const statistiikka = {
            hyva: hyva,
            neutraali: neutraali,
            huono: huono,
            keskiarvo: keskiarvo,
            positiivisia: positiivisia
        }

        let statistiikkaTilastot = null
        if (hyva + huono + neutraali > 0) {
            statistiikkaTilastot = <Statistics statistiikka={statistiikka} />
        } else {
            statistiikkaTilastot = <div>ei yhtään palautetta annettu</div>
        }

        return (
            <div>
                <h2>anna palautetta</h2>
                <div>
                    <Button
                        handleClick={this.annaPalaute('hyva')}
                        text="hyva"
                    />
                    <Button
                        handleClick={this.annaPalaute('neutraali')}
                        text="neutraali"
                    />
                    <Button
                        handleClick={this.annaPalaute('huono')}
                        text="huono"
                    />
                </div>
                <h2>statistiikka</h2>
                {statistiikkaTilastot}
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'))