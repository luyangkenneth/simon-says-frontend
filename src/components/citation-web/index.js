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
  defaultSelectedNode,
  data
}) => {
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

  const getDefaultNode = data => {
    const ids = Object.keys(data)
      .reduce((prev, curr) => (
        prev.concat([{ id: curr }])
      ), [])
    return ids.length > 0 ? ids[0] : null
  }

  return (
    <div>
      <p>Citation Web</p>
      <InteractiveForceGraph
        zoom={zoom}
        zoomOptions={zoomOptions}
        simulationOptions={simulationOptions}
        highlightDependencies={highlightDependencies}
        onSelectNode={onSelectNode}
        onDeselectNode={onDeselectNode}
        defaultSelectedNode={defaultSelectedNode || getDefaultNode(data)}
        >
        {getGraphNodes(data)}
        {getGraphLinks(data)}
      </InteractiveForceGraph>
    </div>
  )
}

export default CitationWeb
