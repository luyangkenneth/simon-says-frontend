import React from 'react'
import {
  InteractiveForceGraph,
  ForceGraphNode,
  ForceGraphLink
} from 'react-vis-force'
import { scaleLinear } from 'd3-scale'

const CitationWeb = ({
  zoom,
  zoomOptions,
  highlightDependencies,
  simulationOptions,
  onSelectNode,
  onDeselectNode,
  data
}) => {
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

    const inCitationLength = pubIds.map(id => data[id].inCitations.length)

    const radiusScale = scaleLinear()
      .domain([Math.min(...inCitationLength), Math.max(...inCitationLength)])
      .range([10, 20])

    return pubIds.map(id => (
      <ForceGraphNode
        key={id}
        node={{
          id: id,
          radius: radiusScale(data[id].inCitations.length),
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
      <InteractiveForceGraph
        zoom={zoom}
        zoomOptions={zoomOptions}
        highlightDependencies={highlightDependencies}
        simulationOptions={simulationOptions}
        onSelectNode={onSelectNode}
        onDeselectNode={onDeselectNode}
        >
        {getGraphNodes(data)}
        {getGraphLinks(data)}
      </InteractiveForceGraph>
    </div>
  )
}

export default CitationWeb
