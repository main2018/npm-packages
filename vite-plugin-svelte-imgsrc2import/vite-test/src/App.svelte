<img src="./assets/bg_pk.png"/>
<img src="./assets/bg_pk.png"/>
<img src="./assets/logo1.png"/>
<img src="./assets/bg-pop1.png"/>

<script>
  import logo from './assets/logo.png';
  let message = 'Hello, Svelte with Vite!';
</script>

<main>
  <img src="./assets/bg-pop.png"/>
  <img src="./assets/bg_light.png"/>
  <img src={logo} alt="Logo" />
  <h1>{message}</h1>
  <p>Welcome to your new Svelte project.</p>
</main>

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

  h1 {
    color: #ff3e00;
    font-size: 2.5em;
    margin-bottom: 0.5em;
  }

  p {
    color: #333;
    font-size: 1.2em;
  }
</style>