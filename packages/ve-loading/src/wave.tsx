import { getValByUnit } from '@vue-table-easy/common/utils'
import { clsName } from './util'
import { COMPS_NAME } from './util/constant'

export default defineComponent({
  name: COMPS_NAME.VE_LOADING_WAVE,
  props: {
    color: {
      type: String,
      required: true,
    },
    width: {
      type: [Number, String],
      required: true,
    },
    height: {
      type: [Number, String],
      required: true,
    },
  },
  computed: {
    // spin style
    spinStyle() {
      const { width, height } = this

      const result = {
        width: getValByUnit(width),
        height: getValByUnit(height),
      }

      return result
    },
    itemStyle() {
      const { color } = this

      return {
        'background-color': color,
      }
    },
  },
  render() {
    const { spinStyle, itemStyle } = this
    return (
      <div style={spinStyle} class={clsName('wave')}>
        <div style={itemStyle} class={clsName('wave-rect')}></div>
        <div style={itemStyle} class={clsName('wave-rect')}></div>
        <div style={itemStyle} class={clsName('wave-rect')}></div>
        <div style={itemStyle} class={clsName('wave-rect')}></div>
        <div style={itemStyle} class={clsName('wave-rect')}></div>
      </div>
    )
  },
})
