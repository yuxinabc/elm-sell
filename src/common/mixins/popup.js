export const SHOW = 'show'
export const HIDE = 'hide'
export default {
  data() {
    return {
      visible: false
    }
  },
  methods: {
    show() {
     this.visible = true
      this.$emit(SHOW)
    },
    hide() {
      this.visible = false
      this.$emit(HIDE)
    }
  }

}
