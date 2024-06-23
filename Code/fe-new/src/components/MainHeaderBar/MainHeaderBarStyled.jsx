import styled, { css } from 'styled-components'

export const LogoWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  a {
    display: flex;
    align-items: center;
    padding-left: 15px;
  }
  h1 {
    font-size: 16px;
    padding: 0 15px;
    margin-bottom: 0;
    color: rgba(0, 0, 0);
    display: flex;
    align-items: center;
  }
  .eoffice-menu {
    margin: 0 15px 0 auto;
    display: flex;
    .ant-menu-item,
    .ant-menu-submenu {
      display: flex;
      align-items: center;
      cursor: pointer;
      border-top: 2px solid transparent;
      &.ant-menu-item-selected,
      &:hover,
      &.active-category {
        border-bottom: 2px solid transparent;
        border-top: 2px solid ${props => props.theme.solidColor};
        color: ${props => props.theme.solidColor};
      }
    }
  }
`
export const AvatarWrapper = styled.div`
  overflow: hidden;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin-right: 10px;
  display: inline-block;
  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    object-position: center;
  }
`
export const MenuWrapper = styled.div`
  display: flex;
  align-items: center;
`
export const UserMenuWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
`
export const NotificationMenu = styled.a`
  display: flex;
  align-items: center;
  margin-right: ${props => (props.hasNotification !== 0 ? '22px' : '10px')};
  &:hover {
    cursor: pointer;
  }
  .anticon {
    font-size: 24px;
    color: rgba(0, 0, 0);
  }
`
export const SettingMenu = styled.a`
  display: flex;
  align-items: center;
  .anticon {
    font-size: 22px;
    color: rgba(0, 0, 0);
  }
`
export const DropdownMenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 12px;
  .title {
    font-weight: 600;
    margin-right: 100px;
  }
`
export const NotificationItem = styled.a`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  p {
    margin-bottom: 0;
    margin-top: 3px;
    width: 100%;
    padding-right: 100px;
    white-space: nowrap;
    overflow: hidden;
    color: rgba(0, 0, 0);
    text-overflow: ellipsis;
    font-weight: ${props => (props.isRead ? 'normal' : 800)};
  }
  small,
  time {
    color: #919699;
    font-size: 12px;
  }
  .ant-tag {
    border-radius: 0 !important;
    padding: 0 5px !important;
    min-width: unset !important;
  }
`
export const UserMenu = styled.a`
  display: flex;
  align-items: center;
  color: rgba(0, 0, 0);
  margin-left: 18px;
  font-size: 14px;
  &:hover {
    color: rgba(0, 0, 0);
  }
`

export const ThemeChanger = styled.ul`
  display: flex;
  align-items: center;
`
export const ThemeItem = styled.li`
  display: block;
  width: 20px;
  height: 20px;
  margin-right: 5px;
  border-radius: 2px;
  background: ${props => props.theme};
  padding: 0 !important;
  position: relative;
  &:hover {
    cursor: pointer;
  }
  ${props =>
    props.isCurrent &&
    css`
      &:before {
        display: block;
        content: '';
        width: 6px;
        height: 10px;
        border-right: 2px solid white;
        border-bottom: 2px solid white;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(45deg);
      }
    `}
`
export const TaskSearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
  justify-content: flex-start;
  padding-right: 30px;
  padding-left: 15px;
  position: relative;
  .ant-input-search {
    max-width: 300px;
    height: 38px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    position: relative;
    z-index: 1;
  }
  .filter-button {
    border: 1px solid #d9d9d9;
    color: rgba(0, 0, 0);
    height: 38px;
    padding: 0 5px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    margin-left: -1px;
    &:hover,
    &:focus,
    &:focus-within {
      position: relative;
      z-index: 1;
    }
  }
`
