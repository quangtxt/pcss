import React from 'react'

const RiskHorizontalDisplay = ({
  labels = [],
  results = [],
  tableStyle = {},
  trStyle = {},
}) => {
  return (
    <table
      style={{
        border: 'none',
        backgroundColor: 'white',
        margin: '16px 0 50px',
        ...tableStyle,
      }}>
      <tr style={{ backgroundColor: 'white', ...trStyle }}>
        {labels.map(item => (
          <td
            style={{
              border: 'none',
              margin: '0 100px ',
              backgroundColor: 'white',
              textAlign: 'center',
              ...item.style,
            }}>
            {item?.image ? (
              item?.image
            ) : (
              <div>
                <b>{item?.value}</b>
              </div>
            )}
          </td>
        ))}
      </tr>
      <tr style={{ backgroundColor: 'white' }}>
        {results.map(item => (
          <td
            style={{
              border: 'none',
              margin: '0 100px ',
              backgroundColor: 'white',
              textAlign: 'center',
              ...item.style,
            }}>
            {item?.value}
          </td>
        ))}
      </tr>
    </table>
  )
}

export default RiskHorizontalDisplay
