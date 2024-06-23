import styled from 'styled-components'

export const LinkedWorkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  .linked {
    display: flex;
    align-items: center;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }
`
export const TaskedWrapper = styled.ul`
  padding-left: 0;
`
export const TaskedItem = styled.li`
  list-style-type: none;
`
export const TaskedLink = styled.a`
  display: flex;
  align-items: center;
`
export const TaskedContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`
