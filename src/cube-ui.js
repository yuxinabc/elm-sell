import Vue from 'vue'

// By default we import all the components.
// Only reserve the components on demand and remove the rest.
// Style is always required.
import {
  /* eslint-disable no-unused-vars */
  Style,
  // basic
  Button,
  TabBar,
  // popup
  Popup,
  Picker,
  Dialog,
  // scroll
  Scroll,
  Slide,
  ScrollNav,
  ScrollNavBar,
  // checker
  Checker
} from 'cube-ui'

Vue.use(Button)
Vue.use(TabBar)
Vue.use(Popup)
Vue.use(Picker)
Vue.use(Dialog)
Vue.use(Scroll)
Vue.use(Slide)
Vue.use(ScrollNav)
Vue.use(ScrollNavBar)
Vue.use(Checker)
