import React from "react";
import Note from "./Note";
import CreateNote from './CreateNote';
import { getMathNotes } from "./API";

export default class NoteList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: []
        }
        this.addNote = this.addNote.bind(this);

    }
    componentDidMount() {
        getMathNotes()
            .then(response => {
                if (response.status === 200) {
                    return response.json()
                }
            })
            .then(data => 
                this.setState(() => ({notes: data}))
            )
            .catch(err => console.log(err));
    }

    addNote(data) {
        this.setState(prev => 
            ({notes: prev.notes.concat(data)})
        )
    }

    render() {
        return (
            <div>
                <CreateNote 
                    afterSubmit={this.addNote}
                />
                {this.state.notes.map(note => (
                    <Note 
                        key={note.id}
                        note={note}
                    />
                ))}
            </div>
        )
    }
}

