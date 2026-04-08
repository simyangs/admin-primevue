<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3';
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Palette,
  Highlighter,
  PaintBucket,
  Table as TableIcon,
  Columns2,
  Rows2,
  Combine,
  Split,
  Trash2,
  Undo2,
  Redo2,
} from 'lucide-vue-next';
// Vue 3.5: 구조 분해 할당으로 props 받기 (Reactive Props Destructuring)
const { editor } = defineProps<{
  editor: Editor | undefined;
}>();
// UI용 옵션 데이터
const fontSizes = ['12px', '14px', '16px', '18px', '20px', '24px', '32px'];
const fontFamilies = ['Inter', 'Arial', '나눔고딕', '궁서', 'Courier New'];
// 툴바 아이콘 기본 설정
const iconSize = 16;
const iconStroke = 2; // 약간 두껍게 설정하면 가독성이 좋아집니다.

// 표 삽입 커스텀 함수 (이전에 논의한 로직)
const insertTable = () => {
  editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
};
if (!editor) {
  // 에디터가 아직 로드되지 않았을 때 처리
}
</script>

<template>
  <div v-if="editor" class="editor-toolbar">
    <div class="toolbar-group">
      <button @click="editor.chain().focus().undo().run()" :disabled="!editor.can().undo()">
        <Undo2 :size="iconSize" :stroke-width="iconStroke" />
      </button>
      <button @click="editor.chain().focus().redo().run()" :disabled="!editor.can().redo()">
        <Redo2 :size="iconSize" :stroke-width="iconStroke" />
      </button>
    </div>

    <div class="toolbar-group">
      <div class="dropdown-wrapper">
        <Baseline :size="16" :stroke-width="2.5" class="mr-1" />
        <select
          @change="
            editor
              .chain()
              .focus()
              .setFontSize(($event.target as HTMLSelectElement).value)
              .run()
          "
          :value="editor.getAttributes('textStyle').fontSize || ''"
        >
          <option value="">Size</option>
          <option v-for="size in fontSizes" :key="size" :value="size">{{ size }}</option>
        </select>
      </div>
      <button
        @click="editor.chain().focus().toggleBold().run()"
        :class="{ active: editor.isActive('bold') }"
        title="굵게"
      >
        <Bold :size="iconSize" :stroke-width="iconStroke" />
      </button>
      <button
        @click="editor.chain().focus().toggleItalic().run()"
        :class="{ active: editor.isActive('italic') }"
        title="기울임"
      >
        <Italic :size="iconSize" :stroke-width="iconStroke" />
      </button>
      <button
        @click="editor.chain().focus().toggleUnderline().run()"
        :class="{ active: editor.isActive('underline') }"
        title="밑줄"
      >
        <Underline :size="iconSize" :stroke-width="iconStroke" />
      </button>
    </div>

    <div class="toolbar-group">
      <button
        @click="editor.chain().focus().setTextAlign('left').run()"
        :class="{ active: editor.isActive({ textAlign: 'left' }) }"
      >
        <AlignLeft :size="iconSize" :stroke-width="iconStroke" />
      </button>
      <button
        @click="editor.chain().focus().setTextAlign('center').run()"
        :class="{ active: editor.isActive({ textAlign: 'center' }) }"
      >
        <AlignCenter :size="iconSize" :stroke-width="iconStroke" />
      </button>
      <button
        @click="editor.chain().focus().setTextAlign('right').run()"
        :class="{ active: editor.isActive({ textAlign: 'right' }) }"
      >
        <AlignRight :size="iconSize" :stroke-width="iconStroke" />
      </button>
    </div>

    <div class="toolbar-group">
      <div class="icon-input-wrapper" title="글자 색상">
        <Palette :size="iconSize" :stroke-width="iconStroke" />
        <input
          type="color"
          @input="
            editor
              .chain()
              .focus()
              .setColor(($event.target as HTMLInputElement).value)
              .run()
          "
        />
      </div>
      <div class="icon-input-wrapper" title="텍스트 배경색">
        <Highlighter :size="iconSize" :stroke-width="iconStroke" />
        <input
          type="color"
          @input="
            editor
              .chain()
              .focus()
              .setHighlight({ color: ($event.target as HTMLInputElement).value })
              .run()
          "
        />
      </div>
    </div>

    <div class="toolbar-group">
      <button @click="insertTable" title="표 삽입">
        <TableIcon :size="iconSize" :stroke-width="iconStroke" />
      </button>

      <template v-if="editor.isActive('table')">
        <span class="divider"></span>
        <button @click="editor.chain().focus().addColumnAfter().run()" title="열 추가">
          <Columns2 :size="iconSize" :stroke-width="iconStroke" />
        </button>
        <button @click="editor.chain().focus().addRowAfter().run()" title="행 추가">
          <Rows2 :size="iconSize" :stroke-width="iconStroke" />
        </button>
        <button @click="editor.chain().focus().mergeCells().run()" title="셀 병합">
          <Combine :size="iconSize" :stroke-width="iconStroke" />
        </button>
        <button @click="editor.chain().focus().splitCell().run()" title="셀 분할">
          <Split :size="iconSize" :stroke-width="iconStroke" />
        </button>

        <div class="icon-input-wrapper" title="셀 배경색">
          <PaintBucket :size="iconSize" :stroke-width="iconStroke" />
          <input
            type="color"
            @input="
              editor
                .chain()
                .focus()
                .setCellAttribute('backgroundColor', ($event.target as HTMLInputElement).value)
                .run()
            "
          />
        </div>

        <button
          @click="editor.chain().focus().deleteTable().run()"
          class="btn-danger"
          title="표 삭제"
        >
          <Trash2 :size="iconSize" :stroke-width="iconStroke" />
        </button>
      </template>
    </div>
  </div>
</template>

<style scoped>
.editor-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 2px; /* 그룹 간 간격 축소 */
  padding: 4px; /* 상하좌우 여백 축소 (6px -> 4px) */
  background-color: #ffffff;
  border-bottom: 1px solid #e2e8f0;
}

.toolbar-group {
  display: flex;
  align-items: center;
  gap: 1px; /* 버튼 사이 간격 최소화 */
  padding: 0 4px; /* 그룹 내부 좌우 여백 축소 */
  border-right: 1px solid #f1f5f9; /* 구분선도 더 연하게 */
}

button {
  width: 28px; /* 32px -> 28px로 축소 */
  height: 28px; /* 32px -> 28px로 축소 */
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  /* ...기존 스타일 유지... */
}

/* 드롭다운(Select) 슬림화 */
select {
  border: 1px solid transparent;
  background: transparent;
  padding: 1px 2px;
  border-radius: 4px;
  font-size: 12px; /* 13px -> 12px로 축소 */
  max-width: 75px; /* 너비 고정으로 가로 공간 절약 */
  cursor: pointer;
  outline: none;
  appearance: none; /* 브라우저 기본 화살표 제거 (선택사항) */
}

select:hover {
  background-color: #f1f5f9;
}
.icon-input-wrapper {
  width: 28px; /* 버튼과 동일하게 축소 */
  height: 28px;
}

.divider {
  height: 14px; /* 구분선 높이 축소 */
  margin: 0 2px;
}

.icon-input-wrapper {
  position: relative;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.icon-input-wrapper input[type='color'] {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0; /* 실제 컬러피커는 숨기고 아이콘만 보이게 */
  cursor: pointer;
}
</style>
