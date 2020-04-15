<template>
  <div>
    <div
      v-for="(item, $index) in list"
      :key="$index"
      class="hacker-news-item"
      :data-num="$index + 1"
    >
      {{ item }} - {{ $index + 1 }}
    </div>

    <InfiniteLoading @infinite="infiniteHandler" />
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'

export default {
  components: {
    InfiniteLoading
  },

  layout: 'new',

  data: () => ({
    list: []
  }),

  methods: {
    infiniteHandler($state) {
      console.log('loading')
      setTimeout(() => {
        console.log('pending')
        const list = []
        for (let i = 0; i < 50; i++) {
          list.push('Item')
        }
        this.list.push(...list)
        $state.loaded()
        console.log('complate')
      }, 2000)
    }
  }
}
</script>

<style lang="scss">
.hacker-news-item {
  $gap: 40px;

  margin: 10px 0;
  padding: 0 10px 0 $gap;
  line-height: 16px;
  font-size: 14px;

  > a {
    color: #333;
    text-decoration: none;

    &:hover {
      color: #000;
    }
  }

  p {
    margin: 0;
    font-size: 12px;

    &,
    a {
      color: #888;
    }

    a:not(:hover) {
      text-decoration: none;
    }
  }
}
</style>
