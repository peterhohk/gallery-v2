<template>
  <header class="header">
    <div class="header__title-wrapper">
      <img src="@/assets/img/peterhohk.png" alt="" class="header__logo">
      <h1 class="header__title-text">J-ColourS Gallery<sup class="header__title-badge">v2</sup></h1>
    </div>
    <div class="header__nav-wrapper">
      <button type="button" class="header__nav-toggle" aria-label="Toggle navigation menu">
        <i class="bi bi-list"></i>
      </button>
      <nav class="header__nav-menu">
        <RouterLink to="/featured" class="header__nav-link">featured</RouterLink>
        <RouterLink to="/characters" class="header__nav-link">characters</RouterLink>
        <RouterLink to="/artworks" class="header__nav-link">artworks</RouterLink>
      </nav>
    </div>
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
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0.5rem 0.5rem 1rem;
  background-color: var(--xlight-green);
}
.header__title-wrapper {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}
.header__logo {
  width: 2.25rem;
  height: 2.25rem;
}
.header__title-text {
  font-size: 1.5rem;
  white-space: nowrap;
}
.header__title-badge {
  display: inline-block;
  padding-inline: 0.5em;
  margin-left: 0.25em;
  border-radius: 1em;
  background-color: var(--dark-green);
  color: var(--off-white);
  font-size: 0.5em;
}
.header__nav-toggle {
  display: grid;
  place-items: center;
  width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
  font-size: 2rem;
  line-height: 1;
  transition: background-color 0.4s, color 0.4s;
}
.header__nav-toggle:is(:hover, :focus-visible),
.header__nav-wrapper:focus-within > .header__nav-toggle {
  background-color: var(--dark-green);
  color: var(--xlight-green);
}
.header__nav-menu {
  position: absolute;
  top: 100%;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem;
  background-color: var(--xlight-green);
  box-shadow: var(--bshadow);
  visibility: hidden;
}
.header__nav-wrapper:focus-within > .header__nav-menu {
  visibility: visible;
}
.header__nav-link {
  padding: 0.25rem 1rem;
  border-radius: 0.25rem;
  color: inherit;
  text-align: center;
  text-decoration: none;
  transition: background-color 0.4s, color 0.4s;
}
.header__nav-link:is(:hover, :focus-visible),
.header__nav-link--active {
  background-color: var(--light-blue);
  color: var(--blue);
}
.footer {
  padding: 0.25rem 0.5rem;
  margin-top: 0.5rem;
  border-top: 0.0625rem solid;
}
.footer__text {
  text-align: right;
}
@media (min-width: 36rem) {
  .header {
    padding-left: 2rem;
  }
  .header__logo {
    width: 3rem;
    height: 3rem;
  }
  .header__title-text {
    font-size: 2rem;
  }
}
@media (min-width: 72rem) {
  .header {
    padding-inline: 4rem;
  }
  .header__nav-toggle {
    display: none;
  }
  .header__nav-wrapper {
    margin-top: auto;
  }
  .header__nav-menu {
    position: static;
    flex-direction: row;
    padding: 0;
    background-color: transparent;
    box-shadow: none;
    visibility: visible;
  }
  .header__nav-link {
    padding: 0.125rem 0.5rem 0;
    border-bottom: 0.0625rem solid;
    border-radius: 0.25rem 0.25rem 0 0;
  }
}
</style>