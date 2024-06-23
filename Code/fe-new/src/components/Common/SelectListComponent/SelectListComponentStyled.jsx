import styled from 'styled-components'

export const SelectList = styled.div`
  max-height: 80px;
  overflow-y: auto;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  padding-bottom: 16px;

  .tag-selected {
    border-radius: 35px;
    padding: 3px 8px 3px 4px;
    display: flex;
    margin-right: 0;
    align-items: center;
  }
`
