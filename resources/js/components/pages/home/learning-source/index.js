import React from 'react'
import Axios from 'axios'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel'

import Document from '@icons/document/document.svg'
import Box from '@icons/box/box.svg'


function LearningSource() {
  const [items, setItems] = React.useState([])

  React.useEffect(() => {
    Axios.get('/api/list-learning-source')
      .then(res => {
        setItems(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <Carousel>
      {items && items.map((item, idx) => {
        return (
          <div key={idx} style={{ height: "360px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {item.typeId === 1 && <iframe style={{ height: "360px", margin: "0 40px" }} src={item.sourceUrl.replace("watch?v=", "embed/")} />}
            {item.typeId === 2 && <a href={`/${item.sourceUrl}`} download><Document height="120px" fill="white"/></a>}
            <p className="legend">{item.sourceTitle}</p>
          </div>
        )
      })}
      {/* {items.length === 0 && (
        <div style={{ height: "360px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Box height="120px" fill="white" />
          <p className="legend">Empty</p>
        </div>
      )} */}
    </Carousel>
  )
}

export default LearningSource
