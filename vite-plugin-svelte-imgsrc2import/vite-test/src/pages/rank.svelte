<div class="rank">
  rank
  <img src={!info?.gift_type ? `../assets/gold_big.png` : info?.icon} alt="">
  <img src="../assets/bg_pk.png"/>

  rank-end----------
</div>
<script>
  import { onMount } from 'svelte';
  
  let info = {
    gift_type: 0,
    icon: '../assets/num-font.png'
  };
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
