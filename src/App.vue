<template>
  <header class="header">
    <div class="header__title">
      <img src="./assets/img/peterhohk.png" alt="" class="header__logo">
      <h1>J-ColourS Gallery<sup class="header__title-badge">v2</sup></h1>
    </div>
    <nav class="header__nav">
      <RouterLink to="/featured" class="header__nav-link">featured</RouterLink>
      <RouterLink to="/characters" class="header__nav-link">characters</RouterLink>
      <RouterLink to="/artworks" class="header__nav-link">artworks</RouterLink>
    </nav>
  </header>
  <main>
    <RouterView v-slot="{ Component }">
      <Transition name="fade-in" mode="out-in">
        <KeepAlive>
          <component :is="Component" />
        </KeepAlive>
      </Transition>
    </RouterView>
  </main>
  <footer class="footer">
    <p class="footer__text">
      (C) 2025
      <a href="https://github.com/peterhohk" target="_blank">peterhohk</a>
    </p>
  </footer>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: var(--xlight-green);
}
.header__title {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  height: 4rem;
}
.header__title-badge {
  display: inline-block;
  padding-inline: 0.5em;
  margin-left: 0.25rem;
  border-radius: 1em;
  background-color: var(--dark-green);
  color: var(--off-white);
  font-size: 1rem;
}
.header__logo {
  width: 3rem;
  height: 3rem;
}
.header__nav {
  display: flex;
  gap: 0.5rem;
  align-items: flex-end;
}
.header__nav-link {
  padding: 0.125em 0.5em 0;
  margin-bottom: 0.25rem;
  border-bottom: 0.0625rem solid;
  border-radius: 0.25em 0.25em 0 0;
  color: inherit;
  text-decoration: none;
  transition: background-color 0.2s, color 0.2s;
}
.header__nav-link:is(:hover, :focus-visible) {
  background-color: var(--light-blue);
  color: var(--blue);
}
.header__nav-link--active {
  background-color: var(--light-blue);
  color: var(--blue);
}
.footer {
  margin: 0.25rem;
  border-top: 0.0625rem solid;
}
.footer__text {
  text-align: right;
}
@media (min-width: 48rem) {
  .header {
    flex-direction: row;
    align-items: stretch;
    padding: 0 4rem;
  }
}
</style>