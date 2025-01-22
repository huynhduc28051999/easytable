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
    insertRowAbove: '上に行を挿入',
    insertRowBelow: '下に行を挿入',
    removeRow: '$1 行を削除',
    emptyRow: '$1 行をクリア',
    // removeColumn: "Remove column",
    emptyColumn: '$列をクリア',
    // hideColumn: "Hide column",
    emptyCell: 'セルをクリア',
    leftFixedColumnTo: '左固定列に',
    cancelLeftFixedColumnTo: '左固定列をキャンセル',
    rightFixedColumnTo: '右固定列に',
    cancelRightFixedColumnTo: '右固定列をキャンセルして',
  },
} as LocaleMessage
