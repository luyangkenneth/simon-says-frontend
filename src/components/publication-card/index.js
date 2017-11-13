import React from 'react'

const PublicationCard = ({
  title,
  year,
  abstract,
  authors,
  pdfUrls,
  inCitations,
  outCitations
}) => (
  <div>
    <h3>{title}</h3>
    {year ? <p>Published in: <strong>{year}</strong></p> : null}
    <span className='mr-1'>
      Cited by: <strong>{inCitations.length}</strong> publications
    </span>

    <hr />

    <h4>Abstract</h4>
    <p>{abstract}</p>

    {authors !== undefined && authors.length > 0 ?
      <div className='mb-2'>
        <h4>Authors</h4>
        {authors.map(a => <li key={`${title}-${a.name}`}>{a.name}</li>)}
      </div> : null}

    {pdfUrls !== undefined && pdfUrls.length > 0 ?
      <div>
        <h4>Download</h4>
        {pdfUrls.map((url, idx) => <span className='mr-1' key={url}><a href={url}>{idx === 0 ? '' : '|'} Link {idx + 1}</a></span>)}
      </div>
      : null
    }
  </div>
)

export default PublicationCard
