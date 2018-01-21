import React from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 0,
            votes: [0, 0, 0, 0, 0, 0],
            mostvoted: 0
        }
    }

    randomNumber = () => {
        var randomAnecdote = this.state.selected
        //varmistaa ettei tule samaa anekdoottia uudestaan
        while (randomAnecdote === this.state.selected) {
            randomAnecdote = Math.floor(Math.random() * 6)
        }

        return (
            this.setState({ selected: randomAnecdote })
        )
    }

    vote = () => {
        var votes = this.state.votes
        votes[this.state.selected] += 1
        var mostvoted = this.findMostVotedAnecdote()

        return (
            this.setState({ votes: votes }),
            this.setState({ mostvoted: mostvoted })
        )
    }

    findMostVotedAnecdote = () => {
        var mostVotes = this.state.votes[this.state.mostvoted]
        for (var i = 0; i < this.state.votes.length; i++) {
            if (this.state.votes[i] > mostVotes) {
                return i
            }
        }
        return this.state.mostvoted
    }



    render() {
        const votes = this.state.votes[this.state.selected]
        const anecdote = this.props.anecdotes[this.state.selected]
        const mostVotedAnecdote = this.props.anecdotes[this.state.mostvoted]
        const mostVotedAnecdoteVotes = this.state.votes[this.state.mostvoted]

        return (
            <div>
                <Button handleClick={this.randomNumber} text='next anecdote' />
                <Button handleClick={this.vote} text='vote' />
                <div>{anecdote}</div>
                <div>{votes} votes</div>
                <h2>anecdote with most votes:</h2>
                <div>{mostVotedAnecdote}</div>
                <div>{mostVotedAnecdoteVotes} votes</div>
            </div>
        )
    }
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)