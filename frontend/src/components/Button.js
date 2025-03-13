import React from 'react'

export default function Button() {
    const[count,setCount]=React.useState(0)
    const[colour,setColour]=React.useState("grey")
  return (
    <button style={{
        backgroundColor:colour,
        padding:'15px',
        colour:'white',

         

    }}
    
    onClick={() => {
        setCount(count+4)
        if(colour === 'grey') {
            setColour('red')
        } else {
            setColour('green')
        }
        
    }}
    
    > {count} Button</button>
  )
}

