<template>
  <div
    ref="dropzone"
    :style="dropzone"
    :class="$style.dropzone"
  >
    <div :class="$style.dropzone__wrap">
      <div :class="$style.dropzone__textnode">
        Перетащите файлы сюда
      </div>
    </div>
  </div>
</template>

<script>
import uuidv4 from '~src/common/uuidv4'

export default {
  data: () => ({
    // uploadedFiles: [],
    dropzone: { visibility: 'hidden', opacity: 0 }
  }),

  mounted() {
    const dropzone = this.$refs.dropzone

    window.addEventListener('dragenter', this.dragenter)
    window.addEventListener('dragleave', this.dragleave)
    window.addEventListener('dragover', this.dragover)

    dropzone.addEventListener('drop', this.drop)
  },

  beforeDestroy() {
    const dropzone = this.$refs.dropzone

    window.removeEventListener('dragenter', this.dragenter)
    window.removeEventListener('dragleave', this.dragleave)
    window.removeEventListener('dragover', this.dragover)

    dropzone.removeEventListener('drop', this.drop)
  },

  methods: {
    dragenter(event) {
      event.preventDefault()
      this.dropzone = { visibility: '', opacity: 1 }
    },

    dragover(event) {
      this.dragenter(event)
    },

    dragleave(event) {
      event.preventDefault()
      this.dropzone = { visibility: 'hidden', opacity: 0 }
    },

    drop(event) {
      event.preventDefault()
      this.dropzone = { visibility: 'hidden', opacity: 0 }

      const files = [...event.dataTransfer.files]
      console.log('Drop files:', files)

      if (files.length === 0) {
        return false
      }

      files.forEach((f, x) => {
        console.log(f, x)
        const formData = new FormData()
        formData.append('file', f)
        const id = uuidv4()

        this.$emit('upload', { status: 'pending', id })

        this.$axios
          .$post('/api/media/upload', formData)
          .then(res => {
            this.$emit('upload', {
              status: 'success',
              id,
              path: res.data.thumb
            })
            console.log('done uploading', res)
          })
          .catch(error => {
            console.error(error.message)
            this.$emit('upload', {
              status: 'error',
              id,
              message: error.message
            })
          })
      })
    }

    // checkDuplicateFile (filename) {
    //   return this.uploadedFiles.find(el => el.fileName === filename)
    // },

    // uploadFiles (f) {
    //   for (let i = 0; i < f.length; i++) {
    //     if (this.uploadedFiles.length > 0) {
    //       if (
    //         !this.checkDuplicateFile(
    //           f[i].name.substr(0, f[i].name.lastIndexOf('.txt'))
    //         )
    //       ) {
    //         // loadFiles(f[i]);
    //       }
    //     }
    //   }
    // }
  }
}
</script>

<style lang="scss" module>
@import 'assets/scss/_vars';

.dropzone {
  $dropzone: &;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 65535;
  width: 100%;
  height: 100%;
  transition: visibility 175ms, opacity 175ms;
  background-color: rgba(0, 86, 132, 0.9);
  padding: 15px;

  &__wrap {
    width: 100%;
    height: 100%;
    border: 1px dashed #fff;
    display: flex;
    justify-content: center;
    align-items: center;

    #{$dropzone}__textnode {
      transition: font-size 175ms;
      font-size: 3em;
      font-weight: bold;
      text-shadow: 1px 1px 2px #000;
      color: #fff;
    }
  }
}
</style>
