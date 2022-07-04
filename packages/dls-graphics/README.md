# dls-graphics

Shared graphic resources for Baidu Light DLS.

## Installation

```sh
npm i --save-dev dls-graphics
```

## Usage

### JavaScript

```js
import { loading } from 'dls-graphics'

console.log(loading)
/*
{
  contents: '<g style="transform-origin:50% 50%;animation:spin-359eb...',
  attrs: {
    width: '40',
    height: '40',
    class: 'dls-loading',
    viewBox: '0 0 64 64'
  }
}
*/
```

For example, to use it in a React component:

```js
import { loading } from 'dls-graphics'

export function IconLoading() {
  return (
    <svg
      {...loading.attrs}
      dangerouslySetInnerHTML={{ __html: loading.contents }}
    />
  )
}
```

#### Separate

To get `<style>` contents extracted outside SVG data, you can use:

```js
import { loading, loadingCss } from 'dls-graphics/dist/separate'

console.log(loading)
console.log(loadingCss)
/*
{
  contents: '<g style="transform-origin:50% 50%;animation:spin-359eb...',
  attrs: {
    width: '40',
    height: '40',
    class: 'dls-loading',
    viewBox: '0 0 64 64'
  }
}

@keyframes spin-359eb{0%{transform:rotate(0deg)}to{transform...
*/
```

### SVG assets

All graphics are also distributed as SVG files. You can acquire these minified SVG source to use properly. eg. import and render into your HTML file with webpack's `HtmlWebpackPlugin`, or use with some custom SVG loader to convert them directly into components.

#### Standalone

Standalone SVGs resides at `dls-graphics/dist`.

#### Separate

If you want to use SVGs with `<style>` contents extracted into separate CSS files, you can look into `dls-graphics/dist/separate`.

### List of available graphs

<!-- assets:start -->

#### Hero

* **`blank`** (blank.svg)

  ![blank](https://raw.githubusercontent.com/ecomfe/dls-illustrations/master/raw/hero/blank.svg)

* **`clientError`** (client-error.svg)

  ![clientError](https://raw.githubusercontent.com/ecomfe/dls-illustrations/master/raw/hero/client-error.svg)

* **`forbidden`** (forbidden.svg)

  ![forbidden](https://raw.githubusercontent.com/ecomfe/dls-illustrations/master/raw/hero/forbidden.svg)

* **`noResults`** (no-results.svg)

  ![noResults](https://raw.githubusercontent.com/ecomfe/dls-illustrations/master/raw/hero/no-results.svg)

* **`notFound`** (not-found.svg)

  ![notFound](https://raw.githubusercontent.com/ecomfe/dls-illustrations/master/raw/hero/not-found.svg)

* **`reviewError`** (review-error.svg)

  ![reviewError](https://raw.githubusercontent.com/ecomfe/dls-illustrations/master/raw/hero/review-error.svg)

* **`reviewPending`** (review-pending.svg)

  ![reviewPending](https://raw.githubusercontent.com/ecomfe/dls-illustrations/master/raw/hero/review-pending.svg)

* **`reviewSuccess`** (review-success.svg)

  ![reviewSuccess](https://raw.githubusercontent.com/ecomfe/dls-illustrations/master/raw/hero/review-success.svg)

* **`serverError`** (server-error.svg)

  ![serverError](https://raw.githubusercontent.com/ecomfe/dls-illustrations/master/raw/hero/server-error.svg)

#### Spot

* **`spotBarChart`** (spot-bar-chart.svg)

  ![spotBarChart](https://raw.githubusercontent.com/ecomfe/dls-illustrations/master/raw/spot/spot-bar-chart.svg)

* **`spotCleared`** (spot-cleared.svg)

  ![spotCleared](https://raw.githubusercontent.com/ecomfe/dls-illustrations/master/raw/spot/spot-cleared.svg)

* **`spotFunnelChart`** (spot-funnel-chart.svg)

  ![spotFunnelChart](https://raw.githubusercontent.com/ecomfe/dls-illustrations/master/raw/spot/spot-funnel-chart.svg)

* **`spotGaugeChart`** (spot-gauge-chart.svg)

  ![spotGaugeChart](https://raw.githubusercontent.com/ecomfe/dls-illustrations/master/raw/spot/spot-gauge-chart.svg)

* **`spotImageError`** (spot-image-error.svg)

  ![spotImageError](https://raw.githubusercontent.com/ecomfe/dls-illustrations/master/raw/spot/spot-image-error.svg)

* **`spotLineChart`** (spot-line-chart.svg)

  ![spotLineChart](https://raw.githubusercontent.com/ecomfe/dls-illustrations/master/raw/spot/spot-line-chart.svg)

* **`spotLoadError`** (spot-load-error.svg)

  ![spotLoadError](https://raw.githubusercontent.com/ecomfe/dls-illustrations/master/raw/spot/spot-load-error.svg)

* **`spotMap`** (spot-map.svg)

  ![spotMap](https://raw.githubusercontent.com/ecomfe/dls-illustrations/master/raw/spot/spot-map.svg)

* **`spotNetworkError`** (spot-network-error.svg)

  ![spotNetworkError](https://raw.githubusercontent.com/ecomfe/dls-illustrations/master/raw/spot/spot-network-error.svg)

* **`spotNoAccess`** (spot-no-access.svg)

  ![spotNoAccess](https://raw.githubusercontent.com/ecomfe/dls-illustrations/master/raw/spot/spot-no-access.svg)

* **`spotNoContent`** (spot-no-content.svg)

  ![spotNoContent](https://raw.githubusercontent.com/ecomfe/dls-illustrations/master/raw/spot/spot-no-content.svg)

* **`spotNoFavorites`** (spot-no-favorites.svg)

  ![spotNoFavorites](https://raw.githubusercontent.com/ecomfe/dls-illustrations/master/raw/spot/spot-no-favorites.svg)

* **`spotNoHistory`** (spot-no-history.svg)

  ![spotNoHistory](https://raw.githubusercontent.com/ecomfe/dls-illustrations/master/raw/spot/spot-no-history.svg)

* **`spotNoImage`** (spot-no-image.svg)

  ![spotNoImage](https://raw.githubusercontent.com/ecomfe/dls-illustrations/master/raw/spot/spot-no-image.svg)

* **`spotNoInternet`** (spot-no-internet.svg)

  ![spotNoInternet](https://raw.githubusercontent.com/ecomfe/dls-illustrations/master/raw/spot/spot-no-internet.svg)

* **`spotNoMessages`** (spot-no-messages.svg)

  ![spotNoMessages](https://raw.githubusercontent.com/ecomfe/dls-illustrations/master/raw/spot/spot-no-messages.svg)

* **`spotNoResults`** (spot-no-results.svg)

  ![spotNoResults](https://raw.githubusercontent.com/ecomfe/dls-illustrations/master/raw/spot/spot-no-results.svg)

* **`spotNoStore`** (spot-no-store.svg)

  ![spotNoStore](https://raw.githubusercontent.com/ecomfe/dls-illustrations/master/raw/spot/spot-no-store.svg)

* **`spotNoVideo`** (spot-no-video.svg)

  ![spotNoVideo](https://raw.githubusercontent.com/ecomfe/dls-illustrations/master/raw/spot/spot-no-video.svg)

* **`spotPieChart`** (spot-pie-chart.svg)

  ![spotPieChart](https://raw.githubusercontent.com/ecomfe/dls-illustrations/master/raw/spot/spot-pie-chart.svg)

* **`spotPresentation`** (spot-presentation.svg)

  ![spotPresentation](https://raw.githubusercontent.com/ecomfe/dls-illustrations/master/raw/spot/spot-presentation.svg)

* **`spotRadarChart`** (spot-radar-chart.svg)

  ![spotRadarChart](https://raw.githubusercontent.com/ecomfe/dls-illustrations/master/raw/spot/spot-radar-chart.svg)

* **`spotRelationshipChart`** (spot-relationship-chart.svg)

  ![spotRelationshipChart](https://raw.githubusercontent.com/ecomfe/dls-illustrations/master/raw/spot/spot-relationship-chart.svg)

* **`spotServerError`** (spot-server-error.svg)

  ![spotServerError](https://raw.githubusercontent.com/ecomfe/dls-illustrations/master/raw/spot/spot-server-error.svg)

* **`spotTryLater`** (spot-try-later.svg)

  ![spotTryLater](https://raw.githubusercontent.com/ecomfe/dls-illustrations/master/raw/spot/spot-try-later.svg)

* **`spotVideoError`** (spot-video-error.svg)

  ![spotVideoError](https://raw.githubusercontent.com/ecomfe/dls-illustrations/master/raw/spot/spot-video-error.svg)

* **`spotWordCloud`** (spot-word-cloud.svg)

  ![spotWordCloud](https://raw.githubusercontent.com/ecomfe/dls-illustrations/master/raw/spot/spot-word-cloud.svg)

#### Misc

* **`imagePlaceholder`** (image-placeholder.svg)

  ![imagePlaceholder](https://raw.githubusercontent.com/ecomfe/dls-illustrations/master/raw/misc/image-placeholder.svg)

* **`loading`** (loading.svg)

  ![loading](https://raw.githubusercontent.com/ecomfe/dls-illustrations/master/raw/misc/loading.svg)

#### Deprecated

* **`partialBlankBrush`** (partial-blank-brush.svg)

  ![partialBlankBrush](https://raw.githubusercontent.com/ecomfe/dls-illustrations/master/raw/deprecated/partial-blank-brush.svg)

* **`partialBlank`** (partial-blank.svg)

  ![partialBlank](https://raw.githubusercontent.com/ecomfe/dls-illustrations/master/raw/deprecated/partial-blank.svg)

* **`partialError`** (partial-error.svg)

  ![partialError](https://raw.githubusercontent.com/ecomfe/dls-illustrations/master/raw/deprecated/partial-error.svg)

* **`partialForbidden`** (partial-forbidden.svg)

  ![partialForbidden](https://raw.githubusercontent.com/ecomfe/dls-illustrations/master/raw/deprecated/partial-forbidden.svg)

* **`underReview`** (under-review.svg)

  ![underReview](https://raw.githubusercontent.com/ecomfe/dls-illustrations/master/raw/deprecated/under-review.svg)


<!-- assets:end -->
