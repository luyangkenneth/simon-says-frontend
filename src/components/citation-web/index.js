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
        showLabels={false}
        >
        {getGraphNodes(data)}
        {getGraphLinks(data)}
      </InteractiveForceGraph>
    </div>
  )
}

function getGraphNodes(data) {
  const pubIds = Object.keys(data)

  const inCitationLength = pubIds.map(id => data[id].inCitations.length)

  const radiusScale = scaleLinear()
    .domain([Math.min(...inCitationLength), Math.max(...inCitationLength)])
    .range([10, 20])

  return pubIds.map(id => (
    <ForceGraphNode
      key={id}
      fill={'#777777'}
      node={{
        id: id,
        radius: radiusScale(data[id].inCitations.length),
        ...data[id]}}
    />
  ))
}

function getGraphLinks(data) {
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

function getDefaultNode(data) {
  const ids = Object.keys(data)
    .reduce((prev, curr) => (
      prev.concat([{ id: curr }])
    ), [])
  return ids.length > 0 ? ids[0] : null
}

export default CitationWeb
