import styled from 'styled-components'

export const EditorWrapper = styled.div`
  /* https://ckeditor.com/docs/ckeditor5/latest/framework/guides/deep-dive/ui/theme-customization.html#styles-processing-and-bundling */

  --ck-font-size-base: 10px;

  .ck-content {
    border: 1px solid #e1e1e1 !important;
    max-height: 400px;
    overflow-y: auto;
    font-family: inherit;

    figure.table {
      width: 100%;
      margin-left: 0;
      margin-right: 0;

      th,
      td {
        vertical-align: top;
      }
    }
  }

  .ck.ck-toolbar-dropdown .ck.ck-toolbar .ck.ck-toolbar__items {
    position: absolute;
    top: 3px;
    right: -6px;
    background: #fafafa;
    border: 1px solid #c4c4c4;
  }
`
