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
  <nav class="tags-widget">
    <button
      v-for="{ name, isActive } in state"
      :key="name"
      :style="{
        '--background-color': colors[name],
      }"
      :class="['tags-widget__tag', isActive ? null : 'tags-widget__tag--disabled']"
      type="button"
      @click="onTagClick(name)"
    >
      {{ name }}
    </button>
  </nav>
</template>

<style lang="postcss" scoped>
  .tags-widget {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    margin-bottom: -5px;

    & > * {
      margin-bottom: 5px;
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
    background-color: var(--background-color);
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
    transition-duration: 0.1s;
    white-space: nowrap;

    &:hover {
      box-shadow: 2px 2px 0 var(--background-color);
      transform: translate(-2px, -2px);
    }

    &--disabled {
      opacity: 0.5;
    }
  }
</style>
