<anchor label="Usage"/>

Import `veLoading` where you need

```javascript
import Vue from 'vue'
import { veLoading } from 'vue-vue-table-easy'
```

```javascript
veLoading({
  target: '#loading-1',
  name: 'grid',
  tip: 'loading...',
})
```

<anchor label="Global Usage"/>

Mount the `veLoading` component to the prototype of Vue for easy global call

```javascript
import Vue from 'vue'
import { veLoading } from 'vue-vue-table-easy'

Vue.prototype.$veLoading = veLoading
```

```javascript
this.$veLoading({
  target: '#loading-1',
  name: 'grid',
  tip: 'loading...',
})
```
