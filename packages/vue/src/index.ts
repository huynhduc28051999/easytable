// This file is auto gererated by build/build-entry.js
import type { Plugin } from 'vue'

import VeCheckbox from '@vue-table-easy/ve-checkbox'
import VeCheckboxGroup from '@vue-table-easy/ve-checkbox-group'
import VeContextmenu from '@vue-table-easy/ve-contextmenu'
import VeDropdown from '@vue-table-easy/ve-dropdown'
import VeIcon from '@vue-table-easy/ve-icon'
import VeLoading from '@vue-table-easy/ve-loading'
import VeLocale from '@vue-table-easy/ve-locale'
import VePagination from '@vue-table-easy/ve-pagination'
import VeRadio from '@vue-table-easy/ve-radio'
import VeSelect from '@vue-table-easy/ve-select'
import VeTable from '@vue-table-easy/ve-table/src'
import type { LocaleMessage } from '@vue-table-easy/common/locale/types'

const version = '0.0.1'
const components = [
  VeCheckbox,
  VeCheckboxGroup,
  VeContextmenu,
  VeDropdown,
  VeIcon,
  VeLoading,
  VeLocale,
  VePagination,
  VeRadio,
  VeSelect,
  VeTable,
]

const useVeTable = function (options?: { locale?: LocaleMessage }): Plugin {
  return {
    install(app) {
      components.forEach((Component) => {
        app.use(Component)
      })
      if (options?.locale)
        VeLocale.use(options.locale)
    },
  }
}
// const install = (app: Vue) => {
//   components.forEach((Component) => {
//     app.use(Component)
//   })

//   Vue.prototype.$veLoading = VeLoading
//   Vue.prototype.$veLocale = VeLocale
// }

/* istanbul ignore if */
// if (typeof window !== 'undefined' && window.Vue)
//   install(window.Vue)

export {
  useVeTable,
  version,
  VeCheckbox,
  VeCheckboxGroup,
  VeContextmenu,
  VeDropdown,
  VeIcon,
  VeLoading,
  VeLocale,
  VePagination,
  VeRadio,
  VeSelect,
  VeTable,
}

// export default {
//   useVeTable,
//   version,
//   VeCheckbox,
//   VeCheckboxGroup,
//   VeContextmenu,
//   VeDropdown,
//   VeIcon,
//   VeLoading,
//   //   VeLocale,
//   VePagination,
//   VeRadio,
//   VeSelect,
//   VeTable,
// }
