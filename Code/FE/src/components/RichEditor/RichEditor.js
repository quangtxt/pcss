import { MyUploadAdapter } from "../CustomCKEditorImageUpload/MyUploadAdapter";
import { CKEDITOR_HEIGHT } from "../../ui_constants";
import React, { useEffect, useRef } from "react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import CKEditor from "@ckeditor/ckeditor5-react";
import { EditorWrapper } from "./RichEditorStyled";

const toolbar = [
  "insertTable",
  "Alignment",
  "Autoformat",
  "AutoLink",
  "BlockQuote",
  "Bold",
  "Essentials",
  "FontBackgroundColor",
  "FontColor",
  "FontFamily",
  "FontSize",
  "Heading",
  "Image",
  "ImageInsert",
  "ImageResize",
  "ImageStyle",
  "ImageToolbar",
  "ImageUpload",
  "Indent",
  "IndentBlock",
  "Italic",
  "Link",
  "List",
  "ListStyle",
  "MediaEmbed",
  "MediaEmbedToolbar",
  "Mention",
  "Paragraph",
  "PasteFromOffice",
  "Strikethrough",
  "Table",
  "TableCellProperties",
  "TableProperties",
  "TableToolbar",
  "TextTransformation",
  "TodoList",
  "Underline",
  "WordCount",
];

const RichEditor = ({ editorContent, placeholder, height, EDITOR_REF }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current) {
      const editor = editorRef.current.editor;
      editor.plugins.get("FileRepository").createUploadAdapter = function (
        loader
      ) {
        return new MyUploadAdapter(loader);
      };

      editor.ui
        .getEditableElement()
        .parentElement.insertBefore(
          editor.ui.view.toolbar.element,
          editor.ui.getEditableElement()
        );

      editor.editing.view.change((writer) => {
        writer.setStyle(
          "height",
          height ?? CKEDITOR_HEIGHT,
          editor.editing.view.document.getRoot()
        );
      });
    }
  }, [editorRef, height]);

  return (
    <EditorWrapper>
      <CKEditor
        ref={EDITOR_REF}
        editor={Editor}
        config={{
          toolbar: toolbar,
          placeholder: placeholder ?? "",
          link: {
            addTargetToExternalLinks: true,
          },
          table: {
            contentToolbar: [
              "tableColumn",
              "tableRow",
              "mergeTableCells",
              "tableProperties",
              "tableCellProperties",
            ],
          },
        }}
        onInit={(editor) => {
          // Connect the upload adapter using code below
          editor.plugins.get("FileRepository").createUploadAdapter = function (
            loader
          ) {
            return new MyUploadAdapter(loader);
          };

          editor.ui
            .getEditableElement()
            .parentElement.insertBefore(
              editor.ui.view.toolbar.element,
              editor.ui.getEditableElement()
            );

          editor.editing.view.change((writer) => {
            writer.setStyle(
              "height",
              height ?? CKEDITOR_HEIGHT,
              editor.editing.view.document.getRoot()
            );
          });
        }}
        data={editorContent}
      />
    </EditorWrapper>
  );
};

export default RichEditor;
