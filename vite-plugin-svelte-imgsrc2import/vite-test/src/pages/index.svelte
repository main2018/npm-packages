<div class={['index', 'type1']}>
  <button onclick={() => tempNum++}>修改guide图</button>
  <img src={imgGuide} alt="">
  <img id="img1" src={`../assets/top${rank}.png`} alt="">
  <img id="img3" src={`../assets/top${rank}.png`} alt="">
  <img id="img4" src={imgUrl1} alt="">
  <img id="img5" src={"../assets/num-font.png"} alt="">
  <img id="img9" src={`../assets/top${normalizeRank1}.png`} alt="">
  <img id="img6" src={rank1 <= 3 ? "../assets/num-font.png" : `../assets/top${rank1}.png`} alt="">
  <img id="img7" src={"https://improxy.starmakerstudios.com/tools/im/800x/test/promotion/cover/c50b03067d888840d2d27b7d55af16cc.png?support=webp"} alt="">
  <img id="img8" src="https://improxy.starmakerstudios.com/tools/im/800x/test/promotion/cover/c50b03067d888840d2d27b7d55af16cc.png?support=webp" alt="">
  <img src={rank1 <= 3 ? `../assets/top${rank1}.png` : `../assets/bg_light.png`} alt="">
  <img class="imgConditionalExpression" src={rank1 > 3 ? `../assets/top${rank1}.png` : imgUrl2} alt="">
  <img src={imgUrl} alt="">

  <img src="../assets/bg_pk.png"/>
  <img src="../assets/bg_pk.png"/>
  <img src="../assets/logo1.png"/>
  <img src="../assets/bg-pop1.png"/>
  <!-- <img src="../assets/bg_pk_unknow.png"/> -->

</div>
<script>
  import { onMount } from 'svelte';
  import logo from '../assets/logo.png';
  import imgGuide2 from '../assets/guide2.png';

  let tempNum = $state(1)
  const imgGuide = $derived.by(() => {
    return new URL(`../assets/guide${tempNum}.png`, import.meta.url).href
  })
  let message = 'Hello, Svelte with Vite!';
  let rank = 1;
  let rank1 = $state(3)
  let normalizeRank1 = $derived(rank1 - 2)
  const imgUrl = new URL(`../assets/top${rank}.png`, import.meta.url).href
  const imgUrl2 = new URL(`../assets/num-font.png`, import.meta.url).href
  const imgUrl1 = new URL(`../assets/top${rank}.png`, import.meta.url).href
  onMount(() => {
    
  });
</script>
<main>
  <img src="../assets/bg-pop.png"/>
  <img src="../assets/bg_light.png"/>
  <img src={logo} alt="Logo" />
  <h1>{message}</h1>
  <p>Welcome to your new Svelte project.</p>
</main>
<img id="img2" src={`../assets/top${rank}.png`} alt="">
<img id="img2" src={`../assets/top${rank}.png`} alt="">

<style  lang="scss">
  .index {
    @for $i from 1 through 3 {
      &.type#{$i} {
        background-image: url(../assets/top#{$i}.png);
      }
    }
    img{
      width: 100%;
    }
  }
  img{
    width: 100%;
  }
  .ar-SA,
  .ar,
  .ur-PK {
    .index{
     
    }
  }
</style>
