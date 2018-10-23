<template>
  <div class="layout">
    <Layout>
      <Layout>
        <Header>
          <Menu mode="horizontal" theme="dark" :active-name="path">
            <div class="layout-logo">前端日志网</div>
          </Menu>
        </Header>
      </Layout>
      <Layout>
        <Sider hide-trigger :style="{ background: '#fff' }">
          <Menu :active-name="path" theme="light" width="auto">
            <MenuItem name="/admin" to="/admin">
              <Icon type="md-analytics" />
              主面板
            </MenuItem>
            <MenuItem name="/admin/users" to="/admin/users">
              <Icon type="md-people" />
              用户管理
            </MenuItem>
            <MenuItem name="/admin/categories" to="/admin/categories">
              <Icon type="ios-folder-open" />
              分类管理
            </MenuItem>
            <MenuItem name="/admin/posts" to="/admin/posts">
              <Icon type="md-document" />
              文章管理
            </MenuItem>
          </Menu>
        </Sider>
        <Layout :style="{ margin: '0 24px 24px' }">
          <Breadcrumb :style="{ margin: '24px 0' }">
            <BreadcrumbItem>Home</BreadcrumbItem>
            <BreadcrumbItem>page</BreadcrumbItem>
          </Breadcrumb>
          <Content>
            <nuxt />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>

<script>
export default {
  data() {
    return {
      path: '/admin',
    }
  },
  methods: {
    updatePath() {
      this.path = this.$router.history.current.fullPath
    },
  },
  mounted() {
    this.updatePath()
  },
}
</script>

<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-logo {
  float: left;
  color: #fff;
  font-weight: 700;
}
.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}
</style>
