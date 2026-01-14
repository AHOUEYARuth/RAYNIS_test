<template>
  <div class="auth-layout">
    <main>
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.auth-layout {
  width: 90%;
  height: 100vh;
  padding: 0 auto;
  margin: 0 auto;
}
main{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>
