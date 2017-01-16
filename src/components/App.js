import React from "react"
import {Link} from "react-router"

export default function App( props ){
  return <div>Application <br />

    <ul>
      <li><a href="/">norm HOME</a></li>
      <li><Link to="/">HOME</Link></li>
      <li><Link to="/about">このサンプルについて</Link></li>
    </ul>

    { props.children }

  </div>
}
