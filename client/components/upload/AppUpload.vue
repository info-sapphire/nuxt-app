<template>
  <ElContainer
    v-loading="loading"
    :class="$style.container"
  >
    <div :class="$style.container__toolbar">
      <div :class="$style.container__left">
        container__left
      </div>
      <div :class="$style.container__right">
        container__right
      </div>
    </div>
    <div :class="$style.container__list">
      <Component
        :is="item.component"
        v-for="item in list"
        :key="item.id"
        :active="activeItem === item.id"
        v-bind="item.props"
        @click="selectItem(item.id)"
      />
    </div>
    <UploadDropzone @upload="onUpload" />
  </ElContainer>
</template>

<script>
import UploadDropzone from '~/components/upload/elements/UploadDropzone'
import UploadLoading from '~/components/upload/elements/UploadLoading'
import UploadImage from '~/components/upload/elements/UploadImage'

import uuidv4 from '~src/common/uuidv4'

export default {
  components: {
    UploadDropzone,
    UploadLoading,
    UploadImage
  },

  data: () => ({
    loading: true,
    list: [],
    activeItem: null
  }),

  async created() {
    try {
      const {
        files: { files },
        path,
        thumb
      } = await this.$axios.$get('/api/media/list')

      /* сортируем в обратном порядке, имитируем по дате добавления */
      /* @TODO: добавить алгоритм сортировки на стороне сервера */
      this.list = files.reverse().map(item => {
        return {
          component: 'UploadImage',
          id: uuidv4(),
          /* original path */
          path: `${path}/${item}`,
          props: {
            /* thumb path */
            path: `${path}/${thumb}${item}`
          }
        }
      })

      this.loading = false
    } catch (error) {
      console.error(error.message)
    }
  },
  methods: {
    selectItem(id) {
      const item = this.list.find(item => item.id === id)

      if (item !== undefined && ['UploadImage'].includes(item.component)) {
        this.activeItem = this.activeItem === item.id ? null : item.id
        this.$emit('select', item.path)
      }
    },

    onUpload(obj) {
      if (obj.status === 'pending') {
        this.list.unshift({
          component: 'UploadLoading',
          id: obj.id
        })
      }

      if (obj.status === 'success') {
        const index = this.list.findIndex(item => item.id === obj.id)

        if (index > -1) {
          setTimeout(() => {
            this.$set(this.list, index, {
              component: 'UploadImage',
              id: obj.id,
              props: {
                path: obj.path
              }
            })
          }, 500)
        }
      }
    }
  }
}
</script>

<style lang="scss" module>
@import 'assets/scss/_vars';

.container {
  $container: &;

  position: relative;
  flex-direction: column;
  height: 100%;

  &__toolbar {
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    width: 100%;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.04);
    border: 1px solid #ccd0d4;
  }

  &__left {
  }

  &__right {
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    // grid-auto-rows: minmax(150px, auto);
    // height: calc(100% - 42px);
    grid-gap: 15px;
    overflow-y: auto;
    padding-top: 25px;

    // grid-template-columns: repeat(auto-fill, minmax(140px,1fr));

    @media (max-width: 1920px) {
      grid-template-columns: repeat(9, 1fr);
    }

    @media (max-width: 1756px) {
      grid-template-columns: repeat(8, 1fr);
    }

    @media (max-width: 1592px) {
      grid-template-columns: repeat(7, 1fr);
    }

    @media (max-width: 1428px) {
      grid-template-columns: repeat(6, 1fr);
    }

    @media (max-width: 1264px) {
      grid-template-columns: repeat(5, 1fr);
    }

    @media (max-width: 1098px) {
      grid-template-columns: repeat(4, 1fr);
    }

    @media (max-width: 934px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 770px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 604px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }
}
</style>
