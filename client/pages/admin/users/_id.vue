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
import AppPageHeadline from '~/components/admin/page/AppPageHeadline'
import AppForm from '~/components/admin/form/AppForm'

export default {
  layout: 'admin',

  validate ({ params }) {
    return /^([a-z]+)$/i.test(params.id)
  },

  components: {
    AppPageHeadline,
    AppForm
  },

  async asyncData ({ store, params, error }) {
    const { groups } = await store.dispatch('users/groupsList')

    const isCreate = params.id === 'create'

    const component = store.state.settings.schema

    const formSchema = {}
    const formRule = {
      email: [{ required: true, trigger: 'blur' }],
      passwd: [{ required: true, trigger: 'blur' }],
      group: [{ required: true }]
    }

    const formData = {
      email: '',
      passwd: '',
      group: ''
    }

    formSchema.email = {
      ...component,
      component: 'FormInput',
      label: 'email пользователя',
      position: 1,
      props: { style: { width: '250px' } }
    }

    formSchema.passwd = {
      ...component,
      component: 'FormInput',
      label: 'пароль пользователя',
      position: 2,
      props: { style: { width: '250px' } }
    }

    formSchema.group = {
      ...component,
      component: 'FormSelect',
      label: 'группа пользователя',
      options: groups.map(group => {
        return { label: group.name, value: group._id }
      }),
      position: 3
    }

    if (!isCreate) {
      error({ status: 404 })
    }

    return {
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
    page () {
      return {
        name: this.isCreate
          ? 'Добавить пользователя'
          : 'Редактировать пользователя'
      }
    },

    breadcrumbs () {
      return [
        { name: 'Пользователи', link: '/admin/users' },
        { name: this.page.name, link: '' }
      ]
    }
  },

  created () {
    this.formActions.push({
      emit: 'submit',
      type: this.isCreate ? 'success' : 'primary',
      loading: false,
      validate: true,
      name: this.isCreate ? 'Добавить' : 'Обновить'
    })
  },

  methods: {
    onSubmit (emitName) {
      const index = this.formActions.findIndex(
        action => action.emit === emitName
      )

      this.formActions[index].loading = true

      //   this.update(this.formData).finally(() => {
      //     this.formActions[index].loading = false
      //   })
    }
  }
}
</script>

<style lang="scss" module>
.wrapper {
}
</style>
