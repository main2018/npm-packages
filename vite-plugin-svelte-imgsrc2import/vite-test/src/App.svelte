<!-- <Router basePath="/sv/happy-day" {routes} hooks={hooks}/> -->
{#if Component}
 <svelte:component this={Component} />
{/if}
 <Index/>

<script lang="ts">
    import { onMount } from 'svelte';
  // import { Router, goto } from "@mateothegreat/svelte5-router";
  import Index from './pages/index.svelte';
  const Rank = async() => import('./pages/rank.svelte');
  const Detail = async() => import('./pages/detail.svelte');

  let Component
  onMount(async() => {
    const module = await import('./pages/rank.svelte');
    Component = module.default;
  })
  // const routes = [
  //   {
  //     // path: "/",
  //     path: "index",
  //     name: "index",
  //     component: Index
  //   },
  //   {
  //     path: "rank",
  //     name: "rank",
  //     component: Rank
  //   },
  //   {
  //     path: "detail",
  //     name: "detail",
  //     component: Detail
  //   },
  // ];
  // const hooks = {
  //   pre: (route) => {
  //     // const pageName = route.route?.name ?? 'home'
  //     // console.log('pre', route, pageName);
  //     // console.log('是否通过路由验证：', !routes.some(r => r.name == pageName));
      
  //     // if (!routes.some(r => r.name == pageName)) {
  //     //   toPath('')
  //     //   return false
  //     // }
  //     // if (!login) {
  //     //   console.log('未登录');
  //     //   return false;
  //     // }
  //     return true
  //   },
  //   post: (route) => {
  //     // pageName = route.route?.name ?? 'home'
  //     // console.log('post', route, pageName);
  //   }
  // }

  
</script>

<style lang="scss">
  :global(body) {
    background-color: #f4f4f4;
  }
  main {
    text-align: center;
    padding: 1em;
    max-width: 800px;
    margin: 0 auto;
    img{
      width: 100%;
    }
  }
  img{
    width: 100%;
  }
</style>