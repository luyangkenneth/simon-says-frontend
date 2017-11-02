import React from 'react'
import {
  InteractiveForceGraph,
  ForceGraphNode,
  ForceGraphLink
} from 'react-vis-force'

const CitationWeb = ({data}) => {
  const stubData = {
    "1": {
      "title": "Portal gun and its conundrum",
      "inCitations": ["2", "3"]
    },
    "2": {
      "title": "Existence of gazorpgazorp",
      "inCitations": ["3"]
    },
    "3": {
      "title": "Alcoholism",
      "inCitations": []
    },
  }

  const getGraphNodes = data => {
    const pubIds = Object.keys(data)
    // TODO
    // size scale
    // color scale
    return pubIds.map(id => (
      <ForceGraphNode
        key={id}
        node={{
          id: id,
          radius: 5,
          ...data[id]}}
      />
    ))
  }

  return (
    <div>
      <p>Citation Web</p>
      <InteractiveForceGraph>
        {getGraphNodes(stubData)}
      </InteractiveForceGraph>
    </div>
  )
}

export default CitationWeb
