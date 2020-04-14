<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { FadeTransition } from 'vue2-transitions';

  // eslint-disable-next-line no-unused-vars
  import TagWidget, { TagColors, TagNames } from '@/components/tags-widget';

  /**
   * Входные параметры карточки новости
   */
  interface INewsCard {
    /**
     * Ширина карточки, колонок
     */
    width?: number;
    /**
     * Высота карточки, строк
     */
    height?: number;
    /**
     * Изображение
     */
    image?: string;
    /**
     * Заливка цветом
     */
    isFillByColor?: boolean;
    /**
     * Теги
     */
    tags: TagNames[];
    /**
     * Заголовок
     */
    title?: string;
    /**
     * Описание
     */
    description?: string;
    /**
     * Ссылка
     */
    link: string;
    /**
     * Отображение кнопок
     */
    isShowNavigation?: string;
  }

  /**
   * Карточка новости
   */
  @Component<NewsCard>({
    components: {
      TagWidget,
      FadeTransition,
    },
  })
  export default class NewsCard extends Vue {
    @Prop({
      type: Number,
      default: 1,
      validator(value) {
        return value >= 1;
      },
    })
    width!: INewsCard['width'];

    @Prop({
      type: Number,
      default: 1,
      validator(value) {
        return value >= 1;
      },
    })
    height!: INewsCard['height'];

    @Prop({
      type: String,
    })
    image!: INewsCard['image'];

    @Prop({
      type: Boolean,
      default: false,
    })
    isFillByColor!: INewsCard['isFillByColor'];

    @Prop({
      type: Array,
      required: true,
      default() {
        return ['travel'];
      },
    })
    tags!: INewsCard['tags'];

    @Prop({
      type: String,
    })
    title!: INewsCard['title'];

    @Prop({
      type: String,
    })
    description!: INewsCard['description'];

    @Prop({
      type: String,
      required: true,
    })
    link!: INewsCard['link'];

    @Prop({
      type: Boolean,
      default: false,
    })
    isShowNavigation!: INewsCard['isShowNavigation'];

    colors = TagColors;

    /**
     * Отображать изображение
     */
    showImage: boolean = false;

    /**
     * Адаптивная ширина в зависимости от резрешения дисплея
     */
    get adaptiveWidth(): number {
      switch ((this as any).$mq) {
        case 'laptop':
          if (Number(this.width) > 3) return 3;
          break;
        case 'tablet':
          if (Number(this.width) > 2) return 2;
          break;
        case 'mobile':
          if (Number(this.width) > 1) return 1;
          break;

        default:
          break;
      }
      return Number(this.width) <= 4 ? Number(this.width) : 4;
    }

    /**
     * Позиционирование тегов
     */
    get tagsPosition(): string {
      let position = 'relative';
      if (this.image && this.adaptiveWidth === 1) {
        position = 'absolute';
      }
      return position;
    }
  }
</script>

<template>
  <component
    :is="isShowNavigation ? 'article' : 'a'"
    v-cloak
    :href="isShowNavigation ? null : link"
    :class="[
      adaptiveWidth > 1 ? `news-card--colspan--${adaptiveWidth}` : null,
      {
        'news-card': true,
        'news-card--filled-by-color': isFillByColor,
      },
    ]"
    :style="{
      '--width': adaptiveWidth,
      '--height': height,
      '--background-color': colors[tags[0]],
    }"
  >
    <tag-widget
      v-if="tagsPosition === 'absolute'"
      :class="['news-card__tags', `news-card__tags--position--${tagsPosition}`]"
      :tags="tags"
    ></tag-widget>

    <figure v-if="image" class="news-card__image-wrap">
      <fade-transition>
        <img
          v-show="showImage"
          :src="image"
          :alt="`Иллюстрация к статье '${title}'`"
          class="news-card__image"
          @load="showImage = true"
        />
      </fade-transition>
    </figure>
    <div class="news-card__content">
      <tag-widget
        v-if="tagsPosition === 'relative'"
        :class="['news-card__tags', `news-card__tags--position--${tagsPosition}`]"
        :tags="tags"
      ></tag-widget>

      <header class="news-card__title">{{ title }}</header>
      <div class="news-card__description">{{ description }}</div>
      <nav v-if="isShowNavigation" class="news-card__navigation">
        <a :href="link" class="news-card__readmore-button">
          read more
        </a>
      </nav>
    </div>
  </component>
</template>

<style lang="postcss" scoped>
  .news-card {
    position: relative;
    display: block;
    overflow: hidden;
    min-width: 230px;
    background-color: var(--white);
    border-radius: 4px;
    grid-column-end: span var(--width);
    grid-row-end: span var(--height);
    text-decoration: none;
    transition-duration: 0.3s;

    &:hover {
      box-shadow: 5px 8px 20px rgba(0, 0, 0, 0.1);
    }

    &--filled-by-color {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: var(--background-color);
    }

    &[class*='--colspan'] {
      display: flex;
      flex-direction: row-reverse;
    }
  }

  .news-card__tags {
    z-index: 1;
    margin-bottom: 12px;
    pointer-events: none;

    &--position {
      &--absolute {
        position: absolute;
        top: 23px;
        left: 20px;
        width: calc(100% - 40px);
      }
    }

    @nest .news-card--filled-by-color & {
      justify-content: center;

      & >>> .tags-widget {
        & .tags-widget__tag {
          background-color: transparent !important;
        }
      }
    }
  }

  .news-card__image-wrap {
    overflow: hidden;
    width: 100%;
    height: 171px;
    background-color: var(--background-color);

    @nest .news-card[class*='--colspan'] & {
      width: 230px;
      height: 100%;
      flex-shrink: 0;
      align-self: stretch;
    }
  }

  .news-card__image {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transition-duration: 0.6s;

    @nest .news-card:hover & {
      filter: grayscale(1);
    }
  }

  .news-card__content {
    display: flex;
    min-width: 230px;
    flex-direction: column;
    flex-grow: 1;
    padding: 24px 20px;

    @nest .news-card--filled-by-color & {
      justify-content: center;
      padding: 20px;
    }

    @nest .news-card[class*='--colspan'] & {
      padding: 28px 20px 28px 28px;
    }
  }

  .news-card__title {
    margin-bottom: 7px;
    color: var(--charcoal-grey);
    font-family: var(--font-family--title);
    font-size: 15px;
    font-stretch: normal;
    font-style: normal;
    font-weight: bold;
    letter-spacing: -0.2px;
    line-height: 1.2;

    @nest .news-card[class*='--colspan'] & {
      font-size: 22px;
      letter-spacing: -0.4px;
    }

    @nest .news-card--filled-by-color & {
      margin-bottom: 8px;
      color: var(--white);
      font-size: 22px;
      letter-spacing: -0.5px;
      text-align: center;
    }
  }

  .news-card__description {
    margin-bottom: 16px;
    color: var(--steel-grey);
    font-family: var(--font-family);
    font-size: 14px;
    font-stretch: normal;
    font-style: normal;
    font-weight: normal;
    letter-spacing: normal;
    line-height: 1.29;

    @nest .news-card--filled-by-color & {
      color: var(--white);
      opacity: 0.6;
      text-align: center;
    }
  }

  .news-card__navigation {
    display: flex;

    @nest .news-card--filled-by-color & {
      justify-content: center;
    }
  }

  .news-card__readmore-button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 25px;
    border: solid 1px color-mod(#ededed alpha(0.2));
    border-radius: 20px;
    color: var(--white);
    font-family: var(--font-family--title);
    font-size: 10px;
    font-stretch: normal;
    font-style: normal;
    font-weight: bold;
    letter-spacing: 2px;
    line-height: 1.2;
    text-align: center;
    text-decoration: none;
    text-transform: uppercase;
    transition-duration: 0.3s;

    &:hover {
      background-color: color-mod(#ededed alpha(0.2));
    }
  }
</style>
