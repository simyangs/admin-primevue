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
import Image from '@tiptap/extension-image';
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
      width: {
        default: null,
        parseHTML: (el) => el.style.width || el.getAttribute('width') || null,
        renderHTML: (attr) =>
          attr.width ? { style: `width: ${attr.width}`, width: attr.width } : {},
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
      width: {
        default: null,
        parseHTML: (el) => el.style.width || el.getAttribute('width') || null,
        renderHTML: (attr) =>
          attr.width ? { style: `width: ${attr.width}`, width: attr.width } : {},
      },
    };
  },
});
const CustomImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      textAign: {
        default: 'left',
        parseHTML: (el) => el.style.textAlign || 'left',
        renderHTML: (attr) => {
          if (attr.textAlign === 'left') return {};
          return { style: `text-align: ${attr.textAlign}` };
        },
      },
    };
  },
});
const props = defineProps<{
  height?: string;
}>();
// Props & Model (Vue 3.5)
const content = defineModel<string>({ default: '' });

// 1. 파일을 base64로 변환
const fileToBase64WithResize = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // 최대 너비를 1920px로 제한 (용량 최적화)
        const MAX_WIDTH = 1920;
        if (width > MAX_WIDTH) {
          height = (MAX_WIDTH / width) * height;
          width = MAX_WIDTH;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);

        // 퀄리티를 0.7
        resolve(canvas.toDataURL('image/jpeg', 0.7));
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
};

// 2. 에디터에 base64 이미지를 삽입
const insertBase64Image = async (view: any, file: File, pos: number) => {
  try {
    const base64String = await fileToBase64WithResize(file);

    // Tiptap 이미지 노드 생성 및 삽입
    const node = view.state.schema.nodes.image.create({ src: base64String });
    const transaction = view.state.tr.insert(pos, node);
    view.dispatch(transaction);
  } catch (error) {
    console.error('이미지 변환 실패:', error);
  }
};

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
    TextAlign.configure({ types: ['heading', 'paragraph', 'tableCell', 'tableHeader', 'image'] }),
    Table.configure({ resizable: true, lastColumnResizable: true, allowTableNodeSelection: true }),
    TableRow,
    CustomTableCell,
    CustomTableHeader,
    CustomImage.configure({
      // 이미지를 텍스트 사이에 배치 가능하게
      inline: true,
      allowBase64: true, // 기본 base64 저장을 막습니다 (서버 업로드 유도)
    }),
  ],
  onUpdate: ({ editor }) => {
    content.value = editor.getHTML();
  },
  editorProps: {
    handleDrop: (view, event, slice, moved) => {
      const files = event.dataTransfer?.files;
      if (!moved && files && files.length > 0) {
        const images = Array.from(files).filter((file) => file.type.startsWith('image'));
        if (images.length > 0) {
          event.preventDefault();

          const coordinates = view.posAtCoords({ left: event.clientX, top: event.clientY });
          const dropPos = coordinates ? coordinates.pos : view.state.selection.from;

          images.forEach((file) => {
            insertBase64Image(view, file, dropPos);
          });
          return true;
        }
      }
      return false;
    },

    handlePaste: (view, event) => {
      const items = Array.from(event.clipboardData?.items || []);
      const imageFiles = items
        .filter((item) => item.type.startsWith('image'))
        .map((item) => item.getAsFile())
        .filter((file): file is File => file !== null);

      if (imageFiles.length > 0) {
        event.preventDefault();
        const currentPos = view.state.selection.from;

        imageFiles.forEach((file) => {
          insertBase64Image(view, file, currentPos);
        });
        return true;
      }
      return false;
    },
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

      doc.querySelectorAll('table').forEach((table) => {
        // 해당 테이블의 모든 <col> 너비를 배열로 저장
        const colWidths = Array.from(table.querySelectorAll('col')).map((col) => {
          const w = col.getAttribute('width') || col.style.width;
          if (w && w.includes('pt')) {
            return Math.round(parseFloat(w) * 1.33) + 'px'; // pt -> px 변환
          }
          return w ? (w.endsWith('px') ? w : w + 'px') : null;
        });

        // 각 행(tr)을 돌며 셀(td/th)에 너비 주입
        table.querySelectorAll('tr').forEach((tr) => {
          tr.querySelectorAll('td, th').forEach((cell, index) => {
            // 해당 열(index)에 매칭되는 너비 정보가 있다면 주입
            if (colWidths[index]) {
              cell.style.width = colWidths[index];
              cell.style.minWidth = colWidths[index]; // 더 확실하게 적용
            }
          });
        });
      });

      doc.querySelectorAll('td, th').forEach((el) => {
        const className = Array.from(el.classList).find((c) => c.startsWith('xl'));
        if (className && classMap[className]) {
          let styleText = classMap[className] || '';
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
          // width
          styleText = styleText.replace(/width\s*:\s*([\d.]+)pt/gi, (match, pt) => {
            const px = Math.round(parseFloat(pt) * 1.33);
            return `width: ${px}px`;
          });
          //height
          styleText = styleText.replace(/height\s*:\s*[^;]+;?/gi, '');
          //color
          styleText = styleText.replace(/color\s*:\s*([^;]+)/gi, (match, color) => {
            if (color.includes('windowtext')) return 'color: black';
            return match; // 일반 색상(rgb, hex 등)은 그대로 유지
          });

          const existingStyle = el.getAttribute('style') || '';
          el.setAttribute('style', `${existingStyle}; ${styleText}`);
        }
      });
      doc.querySelectorAll('span, p').forEach((el) => {
        const className = Array.from(el.classList).find((c) => c.startsWith('xl'));
        if (className && classMap[className]) {
          let styleText = classMap[className] || '';

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
  <div class="tiptap-editor-container" :style="$props.height ? 'height: ' + $props.height : ''">
    <CommEditorToolbar :editor="editor" />
    <editor-content :editor="editor" class="editor-content" />
  </div>
</template>

<style scoped>
.tiptap-editor-container {
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #ddd;
  display: flex;
  flex-direction: column;
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

.editor-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* 에디터 내부 스타일링 */
:deep(.editor-content .tiptap) {
  width: 100%;
  overflow-x: auto; /* 내용이 넘치면 스크롤 생성 */
  flex: 1;
  min-height: 100%;

  outline: none;
  padding: 16px;
  overflow-y: auto;
  background-color: #fff;
}

:deep(.tiptap table) {
  border-collapse: collapse;
  table-layout: auto !important;
  width: fit-content !important; /* 표가 무조건 100%가 되지 않게 함 */
  max-width: 100%;
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

:deep(.tiptap) {
  img {
    max-width: 100%;
    height: auto;
    display: inline-block;
    /* margin: 1.5rem auto;  */
    border-radius: 4px;
    transition: all 0.2s ease-in-out;
    cursor: pointer;

    /* 기본 상태에서 아주 연한 테두리 (가이드라인) */
    border: 1px solid transparent;
  }

  /* 1. 마우스 호버 시 */
  img:hover {
    border-color: #cbd5e1;
  }

  /* 2. 이미지 클릭(선택) 시 */
  img.ProseMirror-selectednode {
    outline: 1px solid #3b82f6;
    outline-offset: 4px;
    border-radius: 2px;
    box-shadow: 0 0 15px rgba(59, 130, 246, 0.2);
    transform: scale(1.005);
  }

  /* img[style*='text-align: center'] {
    margin-left: auto !important;
    margin-right: auto !important;
    display: block;
  }
  img[style*='text-align:right'] {
    margin-left: auto !important;
    margin-right: 0 !important;
    display: block;
  }
  img[style*='text-align:left'] {
    margin-left: 0 !important;
    margin-right: auto !important;
    display: block;
  } */
  .editor-content:focus-within {
    /* 드래그 중인 파일이 에디터 위로 왔을 때 처리하는 로직은 
     드래그 오버 이벤트를 따로 잡아야 하지만, 
     기본적으로 에디터 영역이 강조되게만 해도 좋습니다. */
    border-color: #3b82f6;
  }
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
