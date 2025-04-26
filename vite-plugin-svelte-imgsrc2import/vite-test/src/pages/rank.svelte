<div class="rank">
  rank
  <img src={a < 3 ? `../assets/guide${a}.png` : '../assets/gold_big.png'} alt="">
  <img src={!info?.gift_type ? `../assets/guide${a}.png` : info?.gift_type === 1 ? '../assets/gold_big.png' : info?.icon ? info?.icon : `../assets/num-font.png`} alt="">
  <img src="../assets/bg_pk.png"/>

  rank-end----------
</div>
<script>
  import { onMount } from 'svelte';
  
  const a = 4
  let info = $state({
    gift_type: 0,
    icon: '../assets/num-font.png'
  });
  onMount(() => {
    
  });
</script>

<style lang="scss">
  .rank {
    img{
      width: 100%;
    }
  }
  .ar-SA,
  .ar,
  .ur-PK {
    .rank{
     
    }
  }
</style>
