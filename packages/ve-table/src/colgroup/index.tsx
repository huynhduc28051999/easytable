import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import { getValByUnit } from '@vue-table-easy/common/utils'
import { COMPS_NAME } from '../util/constant'

export default defineComponent({
  name: COMPS_NAME.VE_TABLE_COLGROUP,
  props: {
    colgroups: {
      // TODO: ts
      type: Array as PropType<any[]>,
      required: true,
    },
    enableColumnResize: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    getValByUnit(item: any) {
      const { enableColumnResize } = this

      let width
      // 开启 column resize
      if (enableColumnResize) {
        // 解决使用 _columnResizeWidth 在多表头下宽度计算异常的问题
        width = item._columnResizeWidth
          ? item._columnResizeWidth
          : item.width
      }
      else {
        width = item.width
      }
      return getValByUnit(width)
    },
  },
  render() {
    return (
      <colgroup>
        {this.colgroups.map((item) => {
          return (
            <col
              key={item.key}
              style={{
                width: this.getValByUnit(item),
              }}
            />
          )
        })}
      </colgroup>
    )
  },
})
