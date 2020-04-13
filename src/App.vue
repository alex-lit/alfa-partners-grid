<script lang="ts">
  import { nanoid } from 'nanoid';
  import { Component, Vue } from 'vue-property-decorator';
  import { FadeTransition } from 'vue2-transitions';

  import NewsCard from '@/components/news-card';
  import TagsWidget from '@/components/tags-widget';

  @Component<App>({
    components: {
      NewsCard,
      TagsWidget,
      FadeTransition,
    },
  })
  export default class App extends Vue {
    /**
     * Контент
     */
    content = require('@/assets/data/news.json');

    /**
     * Отфильрованный контент
     */
    filteredContent: App['content'] = [];

    /**
     * Устанавливает начальный контент из входных параметров
     */
    setInitialContent(): void {
      this.content = this.content.map((item) => {
        item.id = nanoid();
        return item;
      });
      this.filteredContent = [...this.content];
    }

    /**
     * Фильтрует контент по тегам
     *
     * @param state Состояние тегов
     */
    filter(state): void {
      this.filteredContent = this.content.filter((item) => {
        const tagsState = state.filter((tag) => {
          return item.tags.includes(tag.name);
        });
        return tagsState.some((item) => item.isActive);
      });
    }

    created() {
      this.setInitialContent();
    }
  }
</script>

<template>
  <main class="app">
    <div class="app__container">
      <tags-widget
        class="app__tags-wrap"
        :tags="['travel', 'explorers', 'nature', 'сельское хояйство', 'корма', 'science']"
        @change="filter"
      ></tags-widget>

      <fade-transition group class="app__grid" tag="section">
        <news-card v-for="card in filteredContent" :key="card.id" v-bind="card"></news-card>
      </fade-transition>
    </div>
  </main>
</template>

<style lang="postcss" scoped>
  .app {
    display: flex;
    width: 100%;
    min-height: 100vh;
    justify-content: center;
    padding: 40px;
  }

  .app__container {
    width: 100%;
    min-width: 320px;
    max-width: 980px;
  }

  .app__tags-wrap {
    width: 100%;
    margin-bottom: 10px;
  }

  .app__grid {
    display: grid;
    grid-auto-columns: minmax(230px, auto);
    grid-auto-flow: dense;
    grid-auto-rows: 300px;
    grid-gap: 20px;
    grid-template-columns: repeat(auto-fit, minmax(230px, auto));
  }
</style>
