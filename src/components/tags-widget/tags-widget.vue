<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  /**
   * Доступные теги
   */
  export type TagNames =
    | 'travel'
    | 'explorers'
    | 'nature'
    | 'сельское хояйство'
    | 'корма'
    | 'science';

  /**
   * Цвета тегов
   */
  export enum TagColors {
    'travel' = 'var(--bluish-purple)',
    'explorers' = 'var(--dull-orange)',
    'nature' = 'var(--greenish)',
    'сельское хояйство' = 'var(--greenish)',
    'корма' = 'var(--dull-orange-two)',
    'science' = 'var(--cerulean)',
  }

  /**
   * Виджет тегов
   */
  @Component
  export default class TagsWidget extends Vue {
    @Prop({
      type: Array,
      default() {
        return [];
      },
    })
    tags!: TagNames[];

    /**
     * Состояние тегов
     */
    state: { name: string; isActive: boolean }[] = [];

    colors = TagColors;

    created() {
      this.tags.forEach((name) => {
        this.state.push({ name, isActive: true });
      });
    }

    /**
     * Обрабатывает клик по тегу
     *
     * @param tag Имя тега
     */
    onTagClick(tag: string) {
      this.state = this.state.map((item) => {
        if (item.name === tag) item.isActive = !item.isActive;
        return item;
      });
      this.$emit('change', this.state);
    }
  }
</script>

<template>
  <section class="tags-widget">
    <button
      v-for="{ name, isActive } in state"
      :key="name"
      :style="{
        'background-color': colors[name],
      }"
      :class="['tags-widget__tag', isActive ? null : 'tags-widget__tag--disabled']"
      type="button"
      @click="onTagClick(name)"
    >
      {{ name }}
    </button>
  </section>
</template>

<style lang="postcss" scoped>
  .tags-widget {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: -15px;

    & > * {
      margin-bottom: 15px;
    }

    & > :not(:last-child) {
      margin-right: 15px;
    }

    & > :only-child {
      margin-right: 0;
    }
  }

  .tags-widget__tag {
    padding: 0 5px;
    border: none;
    border-radius: 3px;
    color: var(--white);
    cursor: pointer;
    font-family: var(--font-family--title);
    font-size: 10px;
    font-stretch: normal;
    font-style: normal;
    font-weight: bold;
    letter-spacing: 1px;
    line-height: 17px;
    text-transform: uppercase;
    transition-duration: 0.3s;
    white-space: nowrap;

    &--disabled {
      opacity: 0.5;
    }
  }
</style>
