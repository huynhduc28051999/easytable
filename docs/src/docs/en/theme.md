## Theme Custom

:::anchor Built in themes
By default, two sets of themes are provided, blue theme and dark theme

#### Use Blue Theme

import blue theme style

```ts
import 'vue-vue-table-easy/libs/theme-default/index.css'
```

#### Use Dark Theme

import dark theme style

```ts
import 'vue-vue-table-easy/libs/theme-dark/index.css'
```

:::anchor Theme Custom

The style of vue-vue-table-easy uses less as the development language,A series of global / component style variables are defined,You can adjust to your needs.

#### Choose Blue Theme To Customize

If the theme you need is close to the blue theme,You can choose to customize according to the blue theme.All blue theme style variables **[Can Be Found Here](https://github.com/huangshuwei/vue-vue-table-easy/blob/master/packages/theme-default/var.less).**

Create a less variable file,For example "vue-vue-table-easy-variables.less",Introduce this file overlay var.less The variables in.

```scss
@import '~vue-vue-table-easy/packages/theme-default/index.less'; // import the official less style entry file
@import 'your-theme-file.less'; // Used to override the variables defined above
```

Then, in the entry file of the project, you can directly import the above style files(there is no need to import the compiled CSS file of vue-vue-table-easy)

```ts
import Vue from 'vue'
import Vuevue-table-easy from 'vue-vue-table-easy'
import './vue-vue-table-easy-variables.less'

Vue.use(Vuevue-table-easy)
```

#### Choose Dark Theme To Customize

If the theme you need is close to the dark theme,You can choose to customize according to the dark theme.All dark theme style variables can be found **[Can Be Found Here](https://github.com/huangshuwei/vue-vue-table-easy/blob/master/packages/theme-dark/var.less)**.

Create a less variable file,For example "vue-vue-table-easy-variables.less",Introduce this file overlay var.less The variables in.

```
@import '~vue-vue-table-easy/packages/theme-dark/index.less'; // import the official less style entry file
@import 'your-theme-file.less'; // Used to override the variables defined above
```

Then, in the entry file of the project, you can directly import the above style files(there is no need to import the compiled CSS file of vue-vue-table-easy)

```
import Vue from 'vue'
import Vuevue-table-easy from 'vue-vue-table-easy'
import './vue-vue-table-easy-variables.less'

Vue.use(Vuevue-table-easy)
```
