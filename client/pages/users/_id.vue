<template>
  <div :class="$style.wrapper">
    <AppPageHeadline
      :breadcrumbs="breadcrumbs"
      :name="page.name"
    />
    <AppForm
      :schema="formSchema"
      :rules="formRule"
      :value="formData"
      :actions="formActions"
      @submit="onSubmit"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import AppPageHeadline from '~/components/elements/page-headline/AppPageHeadline'
import AppForm from '~/components/form/AppForm'

export default {
  validate({ params }) {
    return /^[0-9a-fA-F]{24}$/i.test(params.id) || params.id === 'create'
  },

  components: {
    AppPageHeadline,
    AppForm
  },

  async asyncData({ store, params, error }) {
    const isCreate = params.id === 'create'
    let user = null

    if (!isCreate) {
      try {
        user = await store.dispatch('users/byId', params.id)
        if (user === null) {
          return error({ status: 404 })
        }
      } catch (err) {
        return error({ status: err.status, message: err.message })
      }
    }

    const { groups } = await store.dispatch('groups/list')

    const component = store.state.settings.schema

    const formSchema = {}
    const formRule = {
      email: [{ required: true, trigger: 'blur' }],
      passwd: [{ required: true, trigger: 'blur' }],
      group: [{ required: true }]
    }

    const formData = {
      email: user !== null ? user.email : '',
      passwd: user !== null ? user.passwd : '',
      group: user !== null ? user.group._id : ''
    }

    formSchema.email = {
      ...component,
      component: 'FormInput',
      label: 'email',
      position: 1,
      props: { style: { width: '250px' } }
    }

    formSchema.passwd = {
      ...component,
      component: 'FormPassword',
      label: 'пароль',
      position: 2,
      props: { style: { width: '250px' } }
    }

    formSchema.group = {
      ...component,
      component: 'FormSelect',
      label: 'группа',
      options: groups.map(group => {
        return { label: group.name, value: group._id }
      }),
      position: 3
    }

    return {
      userID: params.id,
      isCreate,
      formSchema,
      formRule,
      formData
    }
  },

  data: () => ({
    formActions: []
  }),

  computed: {
    page() {
      return {
        name: this.isCreate ? 'Создать пользователя' : 'Редактор пользователя'
      }
    },

    breadcrumbs() {
      return [
        { name: 'Пользователи', link: '/users' },
        { name: this.page.name, link: '' }
      ]
    }
  },

  created() {
    this.formActions.push({
      emit: 'submit',
      type: this.isCreate ? 'success' : 'primary',
      loading: false,
      validate: true,
      name: this.isCreate ? 'Добавить' : 'Обновить'
    })
  },

  methods: {
    ...mapActions('users', ['create', 'update']),

    async onSubmit(emitName) {
      const index = this.formActions.findIndex(
        action => action.emit === emitName
      )

      this.formActions[index].loading = true

      const action = this.isCreate ? this.create : this.update

      const payload = this.isCreate
        ? this.formData
        : {
          id: this.userID,
          payload: this.formData
        }

      try {
        const { status, message, data } = await action(payload)

        this.$message({
          message,
          type: 'success'
        })

        if (status === 201) {
          this.$router.push(`/users/${data._id}`)
        }

        // if (status === 200) {
        //   Object.keys(this.formData).forEach(field => {
        //     if (field in data) {
        //       this.formData[field] = data[field]
        //     }
        //   })
        // }
      } catch (error) {
        this.$message({
          message: error.response.message,
          type: 'error'
        })
      } finally {
        this.formActions[index].loading = false
      }
    }
  }
}
</script>

<style lang="scss" module>
.wrapper {
}
</style>
