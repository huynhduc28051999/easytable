import type { LocaleMessage } from '../types'

export default {
  pagination: {
    goto: 'Go to',
    page: '',
    itemsPerPage: ' / page',
    total: total => `Total ${total}`,
    prev5: 'Previous 5 Pages',
    next5: 'Next 5 Pages',
  },
  table: {
    // filter
    confirmFilter: '確認',
    resetFilter: 'リセット',
    // contextmenu event
    cut: '切り取り',
    copy: 'コピー',
    insertRowAbove: '上に行挿入',
    insertRowBelow: '左に列挿入',
    removeRow: '$1 行を削除',
    emptyRow: '空の $1 行',
    // removeColumn: "Remove column",
    emptyColumn: '空の $1 列',
    // hideColumn: "Hide column",
    emptyCell: '空のセル',
    leftFixedColumnTo: '左固定列に',
    cancelLeftFixedColumnTo: '左固定列をキャンセル',
    rightFixedColumnTo: '右固定列に',
    cancelRightFixedColumnTo: '右固定列をキャンセルして',
  },
} as LocaleMessage
