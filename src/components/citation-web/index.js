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

  const getGraphLinks = data => {
    return Object.keys(data)
      .reduce((prev, curr) => (
        prev.concat(data[curr].inCitations
          .filter(inCitId => (inCitId in data))
          .map(inCitId => ({
            source: inCitId,
            target: curr,
            value: 1
          }))
          .map(link => (
            <ForceGraphLink
              key={`${link.source}->${link.target}`}
              link={link}
            />
          ))
        )
      ), [])
  }

  return (
    <div>
      <p>Citation Web</p>
      <InteractiveForceGraph>
        {getGraphNodes(stubData)}
        {getGraphLinks(stubData)}
      </InteractiveForceGraph>
    </div>
  )
}

export default CitationWeb
