import debounce from 'lodash/debounce'
import emitter from '@vue-table-easy/common/mixins/emitter'
import focus from '@vue-table-easy/common/directives/focus.js'
import { autoResize } from '@vue-table-easy/common/utils/auto-resize'
import { isEmptyValue } from '@vue-table-easy/common/utils/index.js'
import { getCaretPosition, setCaretPosition } from '@vue-table-easy/common/utils/dom'
import { COMPS_NAME, EMIT_EVENTS, HOOKS_NAME } from '../util/constant'
import { clsName, getFixedTotalWidthByColumnKey } from '../util'
import { INSTANCE_METHODS } from './constant'

export default defineComponent({
  name: COMPS_NAME.VE_TABLE_EDIT_INPUT,
  directives: {
    focus,
  },
  mixins: [emitter()],
  props: {
    parentRendered: {
      type: Boolean,
      required: true,
    },
    hooks: {
      type: Object,
      required: true,
    },
    // start input value every time
    inputStartValue: {
      type: [String, Number],
      required: true,
    },
    rowKeyFieldName: {
      type: String,
      default: null,
    },
    // table data
    tableData: {
      type: Array,
      required: true,
    },
    colgroups: {
      type: Array,
      required: true,
    },
    // cell selection option
    cellSelectionData: {
      type: Object,
      required: true,
    },
    // editing cell
    editingCell: {
      type: Object,
      required: true,
    },
    // is editing cell
    isCellEditing: {
      type: Boolean,
      required: true,
    },
    // has horizontal scroll bar
    hasXScrollBar: {
      type: Boolean,
      required: true,
    },
    // has vertical scroll bar
    hasYScrollBar: {
      type: Boolean,
      required: true,
    },
    // has right fixed column
    hasRightFixedColumn: {
      type: Boolean,
      required: true,
    },
    scrollBarWidth: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      textareaInputRef: 'textareaInputRef',
      // raw cell value
      rawCellValue: '',
      // display textarea
      displayTextarea: false,
      // virtual scroll overflowViewport
      overflowViewport: false,
      // textarea element rect
      textareaRect: {
        left: 0,
        top: 0,
      },
      // table element
      tableEl: null,
      // cell element
      cellEl: null,
      // auto resize
      autoResize: null,
      // is edit cell focus
      isEditCellFocus: false,
    }
  },
  computed: {
    // current column
    currentColumn() {
      let result = null

      const { colgroups, cellSelectionData } = this

      const { currentCell } = cellSelectionData

      if (
        !isEmptyValue(currentCell.rowKey)
        && !isEmptyValue(currentCell.colKey)
      ) {
        result = colgroups.find(x => x.key === currentCell.colKey)
      }

      return result
    },

    // container class
    containerClass() {
      let result = null

      const { displayTextarea, overflowViewport } = this

      result = {
        [clsName('edit-input-container')]: true,
        [clsName('edit-input-container-show')]:
                    displayTextarea && !overflowViewport,
      }

      return result
    },

    // container style
    containerStyle() {
      let result = {}

      const {
        displayTextarea,
        overflowViewport,
        textareaRect,
        currentColumn: column,
      } = this

      const { top, left } = textareaRect

      if (displayTextarea && !overflowViewport) {
        result = {
          'top': `${top}px`,
          'left': `${left}px`,
          'height': null,
          // because @ve-fixed-body-cell-index: 10;
          'z-index': column.fixed ? 10 : 0,
          'opacity': 1,
        }
      }
      else {
        result = {
          'top': `${top}px`,
          'left': `${left}px`,
          'height': '1px',
          'z-index': -1,
          'opacity': 0,
        }
      }

      return result
    },

    // textarea class
    textareaClass() {
      let result = null

      result = {
        [clsName('edit-input')]: true,
      }

      return result
    },
  },

  watch: {
    'parentRendered': {
      handler(val) {
        if (val) {
          // fixed #471
          this.setTableEl()

          // add table container scroll hook
          this.hooks.addHook(
            HOOKS_NAME.TABLE_CONTAINER_SCROLL,
            () => {
              if (this.displayTextarea) {
                if (!this.cellEl)
                  this.setCellEl()
              }
              this.debounceSetCellEl()
              this.setTextareaPosition()
              this.debounceSetTextareaPosition()
            },
          )
          // add table size change hook
          this.hooks.addHook(HOOKS_NAME.TABLE_SIZE_CHANGE, () => {
            this.setTextareaPosition()
          })
        }
      },
      immediate: true,
    },
    // cell selection key data
    'cellSelectionData.currentCell': {
      handler(val) {
        this.isEditCellFocus = false

        const { rowKey, colKey } = val
        this.renderEditCell = this.colgroups.find(col => col.key === colKey)?.renderEditCell

        if (!isEmptyValue(rowKey) && !isEmptyValue(colKey)) {
          this.setCellEl()
          // wait for selection cell rendered
          this.$nextTick(() => {
            this.setTextareaPosition()
            setTimeout(() => {
              this.isEditCellFocus = true
            })
          })
        }
      },
      deep: true,
      immediate: true,
    },
    // watch normal end cell
    'cellSelectionData.normalEndCell': {
      handler(val) {
        /*
                trigger editor(textarea) element select
                解决通过点击的区域选择，无法复制的问题
                */
        if (!isEmptyValue(val.colKey))
          this[INSTANCE_METHODS.TEXTAREA_SELECT]()
      },
      deep: true,
      immediate: true,
    },
    // is editing cell
    'isCellEditing': {
      handler(val) {
        if (val)
          this.showTextarea()
        else
          this.hideTextarea()
      },
      deep: true,
      immediate: true,
    },
    'inputStartValue': {
      handler() {
        this.setRawCellValue()
      },
      immediate: true,
    },
  },

  methods: {
    // set table element
    setTableEl() {
      this.$nextTick(() => {
        const tableEl = this.$el.previousElementSibling
        this.tableEl = tableEl
      })
    },

    // set cell element
    setCellEl() {
      const { cellSelectionData, tableEl } = this

      const { rowKey, colKey } = cellSelectionData.currentCell

      if (tableEl) {
        const cellEl = tableEl.querySelector(
          `tbody.ve-table-body tr[row-key="${rowKey}"] td[col-key="${colKey}"]`,
        )

        if (cellEl) {
          this.cellEl = cellEl
          this.overflowViewport = false
        }
      }
    },

    // set textarea position
    setTextareaPosition() {
      const {
        hasXScrollBar,
        hasYScrollBar,
        scrollBarWidth,
        colgroups,
        hasRightFixedColumn,
        currentColumn: column,
        cellEl,
        tableEl,
      } = this

      if (cellEl && tableEl) {
        const {
          left: tableLeft,
          top: tableTop,
          right: tableRight,
          bottom: tableBottom,
        } = tableEl.getBoundingClientRect()

        const {
          left: cellLeft,
          top: cellTop,
          height: cellHeight,
          width: cellWidth,
          right: cellRight,
          bottom: cellBottom,
        } = cellEl.getBoundingClientRect()

        if (cellHeight && cellWidth) {
          let maxHeight = cellHeight + tableBottom - cellBottom
          let maxWidth = cellWidth + tableRight - cellRight

          // has horizontal scroll bar
          if (hasXScrollBar)
            maxHeight -= scrollBarWidth

          // has vertical scroll bar
          if (hasYScrollBar)
            maxWidth -= scrollBarWidth

          /*
                    If the right fixed column is included, the max width of the textarea needs to be subtracted from the sum of the right fixed columns
                    如果包含右固定列，编辑框最大宽度需要去减去右固定列之和的宽度
                    */
          if (hasRightFixedColumn) {
            if (column && !column.fixed) {
              const rightFixedTotalWidth
                                = getFixedTotalWidthByColumnKey({
                                  colgroups,
                                  colKey: column.key,
                                  fixed: 'right',
                                })
              if (rightFixedTotalWidth)
                maxWidth -= rightFixedTotalWidth
            }
          }

          this.autoResize.init(
            this.$refs[this.textareaInputRef],
            {
              minHeight: Math.min(cellHeight, maxHeight),
              maxHeight, // TEXTAREA should never be higher than visible part of the viewport (should not cover the scrollbar)
              minWidth: Math.min(cellWidth, maxWidth),
              maxWidth, // TEXTAREA should never be wider than visible part of the viewport (should not cover the scrollbar)
            },
            true, // observe textarea change\cut\paste etc.
          )

          this.textareaRect = {
            left: cellLeft - tableLeft,
            top: cellTop - tableTop,
          }
        }
        else {
          /*
                    存在以下可能：
                    1、虚拟滚动超出viewport
                    2、单元格被删除（通过右键菜单等方式）
                    */

          // fixed #477
          this.textareaRect = {
            left: 0,
            top: 0,
          }
          this.cellEl = null
          this.overflowViewport = true
        }
      }
    },

    // show textarea
    showTextarea() {
      this.setRawCellValue()
      this.displayTextarea = true
    },

    // hide textarea
    hideTextarea() {
      this.displayTextarea = false
      this.textareaUnObserve()
    },

    // textarea unObserve
    textareaUnObserve() {
      if (this.autoResize)
        this.autoResize.unObserve()
    },

    // set raw cell value
    setRawCellValue() {
      this.rawCellValue = this.inputStartValue
    },

    // textarea value change
    textareaValueChange(val) {
      this.$emit(EMIT_EVENTS.EDIT_INPUT_VALUE_CHANGE, val)
    },

    // textarea select
    [INSTANCE_METHODS.TEXTAREA_SELECT]() {
      const textareaInputEl = this.$refs[this.textareaInputRef]
      if (textareaInputEl)
        textareaInputEl.select?.()
    },

    // textarea add new line
    [INSTANCE_METHODS.TEXTAREA_ADD_NEW_LINE]() {
      const { isCellEditing, editingCell } = this

      if (isCellEditing) {
        const textareaInputEl = this.$refs[this.textareaInputRef]

        const caretPosition = getCaretPosition(textareaInputEl)

        let value = editingCell.row[editingCell.colKey]
        // solve error of number slice method
        value += ''

        const newValue = `${value.slice(
          0,
          caretPosition,
        )}\n${value.slice(caretPosition)}`

        // 直接更新 textarea 值
        textareaInputEl.value = newValue

        // 手动赋值不会触发textarea 文本变化事件,需要手动更新 editingCell 值
        this.textareaValueChange(newValue)

        setCaretPosition(textareaInputEl, caretPosition + 1)
      }
    },
    debounceSetTextValue: debounce(function (val) {
      this.textareaValueChange(val)
      this.rawCellValue = val
    }, 500),
  },
  created() {
    // debounce set textarea position
    this.debounceSetTextareaPosition = debounce(
      this.setTextareaPosition,
      210,
    )
    // debounce set cell el
    this.debounceSetCellEl = debounce(() => {
      if (this.displayTextarea) {
        if (!this.cellEl)
          this.setCellEl()
      }
    }, 200)
  },
  mounted() {
    this.autoResize = autoResize()
  },
  destroyed() {
    this.textareaUnObserve()
  },

  render(h) {
    const {
      containerClass,
      containerStyle,
      textareaClass,
      rawCellValue,
      isCellEditing,
      isEditCellFocus,
      editingCell,
      renderEditCell,
    } = this

    const containerProps = {
      style: containerStyle,
      class: containerClass,
    }

    const textareaProps = {
      ref: this.textareaInputRef,
      class: textareaClass,
      value: rawCellValue,
      // title: rawCellValue,
      tabindex: -1,
      onInput: (e) => {
        if (isCellEditing && editingCell.column.editType !== 'date' && editingCell.column.editType !== 'select') {
          this.textareaValueChange(e.target.value)
          this.rawCellValue = e.target.value
        }
        else {
          this.debounceSetTextValue(e.target.value)
        }
      },
      onClick: () => {
        this.$emit(EMIT_EVENTS.EDIT_INPUT_CLICK)
      },
      onCopy: (e) => {
        this.$emit(EMIT_EVENTS.EDIT_INPUT_COPY, e)
      },
      onPaste: (e) => {
        this.$emit(EMIT_EVENTS.EDIT_INPUT_PASTE, e)
      },
      onCut: (e) => {
        this.$emit(EMIT_EVENTS.EDIT_INPUT_CUT, e)
      },
    }

    const setValue = (val) => {
      this.textareaValueChange(val)
      this.rawCellValue = val
    }

    return (
      <div {...containerProps}>
        {typeof renderEditCell === 'function'
          ? (
              <div {...textareaProps}>
                {editingCell.column?.renderEditCell(
                  h,
                  {
                    row: editingCell.row,
                    rowIndex: editingCell.rowIndex,
                    column: editingCell.column,
                    columnIndex: editingCell.columnIndex,
                    props: textareaProps,
                    setValue,
                  },
                  {
                    isEditCellFocus,
                    isCellEditing,
                  },
                )}
              </div>
            )
          : (
              <textarea
                {...textareaProps}
                v-focus={{
                  focus: isEditCellFocus,
                }}
              >
              </textarea>
            )}
      </div>
    )
  },
})
