var api_getMathNotes = "http://127.0.0.1:8000/MathApp/getMathNotes"
var api_addMathNote = "http://127.0.0.1:8000/MathApp/addMathNote"

export const getMathNotes = () => (
    fetch(api_getMathNotes)
)

export const addMathNote = (data) => (
    fetch(api_addMathNote, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
)