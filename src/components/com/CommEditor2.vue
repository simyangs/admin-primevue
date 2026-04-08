<script setup lang="ts">
import { useEditor, EditorContent, Editor } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableHeader } from '@tiptap/extension-table-header';
import { TableCell } from '@tiptap/extension-table-cell';
import { TextAlign } from '@tiptap/extension-text-align';
import { Color } from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';
import FontFamily from '@tiptap/extension-font-family';
import Highlight from '@tiptap/extension-highlight';
import { Extension } from '@tiptap/core';
import CommEditorToolbar from './CommEditorToolbar.vue';
import { watch, onBeforeUnmount } from 'vue';

/** * 1. 커스텀 확장: 글자 크기 (FontSize)
 */
const FontSize = Extension.create({
  name: 'fontSize',
  addGlobalAttributes() {
    return [
      {
        types: ['textStyle'],
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) => element.style.fontSize.replace(/['"]+/g, ''),
            renderHTML: (attributes) =>
              attributes.fontSize ? { style: `font-size: ${attributes.fontSize}` } : {},
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      setFontSize:
        (fontSize: string) =>
        ({ chain }) =>
          chain().setMark('textStyle', { fontSize }).run(),
      unsetFontSize:
        () =>
        ({ chain }) =>
          chain().setMark('textStyle', { fontSize: null }).removeEmptyTextStyle().run(),
    };
  },
});
const CustomTableHeader = TableHeader.extend({
  addAttributes() {
    return {
      ...this.parent?.(),

      backgroundColor: {
        default: null,
        parseHTML: (el) => el.style.backgroundColor || null,
        renderHTML: (attr) =>
          attr.backgroundColor ? { style: `background-color: ${attr.backgroundColor}` } : {},
      },
      textAlign: {
        default: null,
        parseHTML: (el) => el.style.textAlign || null,
        renderHTML: (attr) => (attr.textAlign ? { style: `text-align: ${attr.textAlign}` } : {}),
      },
      // 테두리 속성들 추가
      border: {
        default: null,
        parseHTML: (el) => el.style.border || null,
        renderHTML: (attr) => (attr.border ? { style: `border: ${attr.border}` } : {}),
      },
      borderTop: {
        default: null,
        parseHTML: (el) => el.style.borderTop || null,
        renderHTML: (attr) => (attr.borderTop ? { style: `border-top: ${attr.borderTop}` } : {}),
      },
      borderRight: {
        default: null,
        parseHTML: (el) => el.style.borderRight || null,
        renderHTML: (attr) =>
          attr.borderRight ? { style: `border-right: ${attr.borderRight}` } : {},
      },
      borderBottom: {
        default: null,
        parseHTML: (el) => el.style.borderBottom || null,
        renderHTML: (attr) =>
          attr.borderBottom ? { style: `border-bottom: ${attr.borderBottom}` } : {},
      },
      borderLeft: {
        default: null,
        parseHTML: (el) => el.style.borderLeft || null,
        renderHTML: (attr) => (attr.borderLeft ? { style: `border-left: ${attr.borderLeft}` } : {}),
      },
    };
  },
});
/**
 * 2. 커스텀 확장: 테이블 셀 (배경색 & 정렬 대응)
 */
const CustomTableCell = TableCell.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      backgroundColor: {
        default: null,
        parseHTML: (el) => el.style.backgroundColor || el.getAttribute('bgcolor') || null,
        renderHTML: (attr) =>
          attr.backgroundColor ? { style: `background-color: ${attr.backgroundColor}` } : {},
      },
      textAlign: {
        default: null,
        parseHTML: (el) => el.style.textAlign || null,
        renderHTML: (attr) => (attr.textAlign ? { style: `text-align: ${attr.textAlign}` } : {}),
      },
      // 테두리 속성들 추가
      border: {
        default: '1px solid #ddd',
        parseHTML: (el) => el.style.border || null,
        renderHTML: (attr) => (attr.border ? { style: `border: ${attr.border}` } : {}),
      },
      borderTop: {
        default: null,
        parseHTML: (el) => el.style.borderTop || null,
        renderHTML: (attr) => (attr.borderTop ? { style: `border-top: ${attr.borderTop}` } : {}),
      },
      borderRight: {
        default: null,
        parseHTML: (el) => el.style.borderRight || null,
        renderHTML: (attr) =>
          attr.borderRight ? { style: `border-right: ${attr.borderRight}` } : {},
      },
      borderBottom: {
        default: null,
        parseHTML: (el) => el.style.borderBottom || null,
        renderHTML: (attr) =>
          attr.borderBottom ? { style: `border-bottom: ${attr.borderBottom}` } : {},
      },
      borderLeft: {
        default: null,
        parseHTML: (el) => el.style.borderLeft || null,
        renderHTML: (attr) => (attr.borderLeft ? { style: `border-left: ${attr.borderLeft}` } : {}),
      },
    };
  },
});

// Props & Model (Vue 3.5)
const content = defineModel<string>({ default: '' });

/**
 * 3. 에디터 설정
 */
const editor = useEditor({
  content: content.value,
  extensions: [
    StarterKit,
    TextStyle,
    Color,
    FontFamily,
    FontSize as any,
    Highlight.configure({ multicolor: true }),
    TextAlign.configure({ types: ['heading', 'paragraph', 'tableCell', 'tableHeader'] }),
    Table.configure({ resizable: true }),
    TableRow,
    CustomTableCell,
    CustomTableHeader,
  ],
  onUpdate: ({ editor }) => {
    content.value = editor.getHTML();
  },
  editorProps: {
    // 엑셀 붙여넣기 시 클래스 스타일을 인라인으로 변환
    transformPastedHTML(html) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const styleSheets = doc.querySelectorAll('style');
      const classMap: Record<string, string> = {};

      styleSheets.forEach((style) => {
        const cssText = style.textContent || '';
        const rules = cssText.match(/\.(xl\d+)\s*{[^}]*}/g) || [];
        rules.forEach((rule) => {
          const className = rule.match(/\.(xl\d+)/)?.[1];
          const styleBody = rule.match(/{([^}]*)}/)?.[1];
          if (className && styleBody) classMap[className] = styleBody;
        });
      });

      doc.querySelectorAll('td, th, span, p').forEach((el) => {
        const className = Array.from(el.classList).find((c) => c.startsWith('xl'));
        if (className && classMap[className]) {
          let styleText = classMap[className];
          // 1. windowtext 및 단위 변환 (기존 로직)
          styleText = styleText.replace(/windowtext/g, 'black');
          styleText = styleText.replace(/(\d+(\.\d+)?)pt/gi, '1px');

          // 2. [핵심] 병합된 셀의 끝부분 보더 사라짐 방지
          // 엑셀이 준 'none'이나 'hidden' 스타일이 다른 실선 스타일과 충돌하면 실선을 우선시합니다.
          if (styleText.includes('border')) {
            // 스타일 문자열에서 border-xxx: none 또는 hidden을 찾아 실선으로 강제 치환하거나 제거
            styleText = styleText.replace(
              /border(-top|-right|-bottom|-left)?\s*:\s*(none|hidden)/gi,
              (match, direction) => {
                // 방향이 지정된 경우(예: border-right: none), 이를 1px 실선으로 복구하거나
                // 아예 해당 속성을 지워 CSS 기본값이 먹히게 합니다.
                return `${direction || 'border'}: 1px solid black`;
              },
            );
          }

          const existingStyle = el.getAttribute('style') || '';
          el.setAttribute('style', `${existingStyle}; ${styleText}`);
        }
      });
      return doc.body.innerHTML;
    },
    attributes: {
      class: 'prose focus:outline-none max-w-none',
    },
  },
});

// 데이터 동기화 (부모 -> 에디터)
watch(content, (newVal) => {
  if (editor.value && editor.value.getHTML() !== newVal) {
    editor.value.commands.setContent(newVal || '', { emitUpdate: false });
  }
});

onBeforeUnmount(() => {
  editor.value?.destroy();
});
</script>

<template>
  <div class="tiptap-editor-container">
    <CommEditorToolbar :editor="editor" />
    <editor-content :editor="editor" class="editor-content" />
  </div>
</template>

<style scoped>
.tiptap-editor-container {
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #fff;
}

button,
select {
  padding: 4px 8px;
  border: 1px solid transparent;
  background: white;
  cursor: pointer;
  border-radius: 3px;
  font-size: 13px;
}

button:hover {
  background: #eee;
}
button.active {
  background: #000;
  color: #fff;
}
.btn-danger {
  color: #d32f2f;
}

input[type='color'] {
  width: 20px;
  height: 20px;
  padding: 0;
  border: none;
  cursor: pointer;
}

/* 에디터 내부 스타일링 */
:deep(.editor-content .tiptap) {
  width: 100%;
  overflow-x: auto; /* 내용이 넘치면 스크롤 생성 */
  min-height: 300px;
  padding: 16px;
}

:deep(.tiptap table) {
  border-collapse: collapse;
  table-layout: fixed;
  width: 100%;
  margin: 0;
  overflow: hidden;

  td,
  th {
    min-width: 1em;
    border: 1px solid #ddd; /* 기본 가이드라인 */
    padding: 3px 5px;
    vertical-align: top;
    box-sizing: border-box;
    position: relative;
    word-break: break-all;
  }

  /* 엑셀에서 넘어오거나 직접 지정한 실선 테두리가 있을 때 */
  /* td[style*='border'],
  th[style*='border'] {
    border-style: solid !important;
  } */
}

:deep(.tiptap .selectedCell:after) {
  background: rgba(200, 200, 255, 0.4);
  content: '';
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  pointer-events: none;
  position: absolute;
  z-index: 2;
}
</style>
