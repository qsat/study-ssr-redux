import React, {Component, PropTypes} from 'react'
 
export default function Html( props ) {
  return <html lang="ja">
      <head>
        <meta charset="UTF-8" />
        <title></title>
      </head>
      <body>
      <div id="content" dangerouslySetInnerHTML={{__html: props.content}}/>
      <script src={ props.assets.javascript.main} charSet="UTF-8"/>
      </body>
    </html>
}

