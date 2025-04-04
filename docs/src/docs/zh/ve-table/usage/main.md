<anchor label="用法"/>

引入 `VeTable`

```javascript
import Vue from 'vue'
import { VeTable } from 'vue-vue-table-easy'

Vue.use(VeTable)
```

使用

```html
<script>
export default {
  data() {
    return {
      columns: [
        { field: 'name', key: 'a', title: 'Name', align: 'center' },
        { field: 'date', key: 'b', title: 'Date', align: 'left' },
        { field: 'hobby', key: 'c', title: 'Hobby', align: 'right' },
        { field: 'address', key: 'd', title: 'Address', align: 'left' }
      ],
      tableData: [
        {
          name: 'John',
          date: '1900-05-20',
          hobby: 'coding and coding repeat',
          address: 'No.1 Century Avenue, Shanghai',
        },
        {
          name: 'Dickerson',
          date: '1910-06-20',
          hobby: 'coding and coding repeat',
          address: 'No.1 Century Avenue, Beijing',
        },
        {
          name: 'Larsen',
          date: '2000-07-20',
          hobby: 'coding and coding repeat',
          address: 'No.1 Century Avenue, Chongqing',
        },
        {
          name: 'Geneva',
          date: '2010-08-20',
          hobby: 'coding and coding repeat',
          address: 'No.1 Century Avenue, Xiamen',
        },
        {
          name: 'Jami',
          date: '2020-09-20',
          hobby: 'coding and coding repeat',
          address: 'No.1 Century Avenue, Shenzhen',
        },
      ],
    }
  },
}
</script>

<template>
  <ve-table :columns="columns" :table-data="tableData" />
</template>
```
