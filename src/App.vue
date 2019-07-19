<template>
  <div id="image-editor">
    <div class="imageEditorApp">
      <tui-image-editor
        ref="tuiImageEditor"
        :include-ui="useDefaultUI"
        :options="options"
      >
      </tui-image-editor>
    </div>
    <!--<input-->
    <!--type="text"-->
    <!--v-model="urlImage"-->
    <!--value="https://static.sutochno.ru/doc/files/objects/0/665/561/big/5d2caa0682c9e.jpg"-->
    <!--/>-->
    <!--<button @click="loadImage" class="js-image-editor-load">Загрузить</button>-->
  </div>
</template>

<script>
// To use the default UI, the svg files for the icons is required.
import "tui-image-editor/dist/svg/icon-a.svg";
import "tui-image-editor/dist/svg/icon-b.svg";
import "tui-image-editor/dist/svg/icon-c.svg";
import "tui-image-editor/dist/svg/icon-d.svg";

// Load Style Code
import "tui-image-editor/dist/tui-image-editor.css";
import "tui-color-picker/dist/tui-color-picker.css";

import ImageEditor from "./ImageEditor";

export default {
  name: "image-editor",
  components: {
    "tui-image-editor": ImageEditor
  },
  mounted() {
    let _this = this;
    document.addEventListener("tuiImageEditor--urlImage", e => {
      //console.log(e.detail.urlImage)
      _this.urlImage = e.detail.urlImage;
    });
    console.log(this.urlImage, _this.urlImage);

    setTimeout(
      () =>
        document.dispatchEvent(
          new CustomEvent("tuiImageEditor--urlImage", {
            detail: {
              urlImage:
                "https://raw.githubusercontent.com/evgen904/Calendar/master/src/assets/logo_sutochno.ru.png"
            }
          })
        ),
      500
    );
  },
  watch: {
    urlImage(url) {
      console.log(url);
      if (!url) return;
      this.$refs.tuiImageEditor
        .invoke("loadImageFromURL", url, "My sample image")
        .then(() => {
          this.$refs.tuiImageEditor.invoke("resizeCanvasDimension", {
            width: 700,
            height: 500
          });
        });
    }
  },
  data() {
    return {
      useDefaultUI: true,
      options: {
        includeUI: {
          loadImage: {
            path:
              "https://raw.githubusercontent.com/evgen904/Calendar/master/src/assets/logo_sutochno.ru.png",
            name: "SampleImage"
          },
          initMenu: "filter"
        },
        cssMaxWidth: 700,
        cssMaxHeight: 500
      },
      urlImage: null
    };
  }
};
</script>

<style lang="scss">
.imageEditorApp {
  width: 1000px;
  height: 800px;
  .tui-image-editor-header-logo {
    display: none;
  }
}
</style>
