<template>
  <div id="image-editor" data-url="">
    <div class="imageEditorApp">
      <tui-image-editor
        ref="tuiImageEditor"
        :include-ui="useDefaultUI"
        :options="options"
        @addText="onAddText"
        @objectMoved="onObjectMoved"
      >
      </tui-image-editor>
    </div>
    <button @click="loadImg">click</button>
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
  created() {
    let elem = document.getElementById("image-editor");
    if (elem.getAttribute("data-url") != "") {
      this.options.includeUI.loadImage.path = elem.getAttribute("data-url");
    }
  },
  data() {
    return {
      useDefaultUI: true,
      options: {
        includeUI: {
          loadImage: {
            path:
              "https://static.sutochno.ru/doc/files/objects/0/665/561/big/5d2caa0682c9e.jpg",
            name: "SampleImage"
          },
          initMenu: "filter"
        },
        cssMaxWidth: 700,
        cssMaxHeight: 500
      }
    };
  },
  methods: {
    onAddText(res) {
      console.group("addText");
      console.log("Client Position : ", res.clientPosition);
      console.log("Origin Position : ", res.originPosition);
      console.groupEnd();
    },
    onObjectMoved(res) {
      console.group("objectMoved");
      console.log("Left : ", res.left);
      console.log("Top : ", res.top);
      console.groupEnd();
    },
    loadImg(event) {
      console.log(123);
      this.$refs.tuiImageEditor
        .invoke(
          "loadImageFromURL",
          "https://static.sutochno.ru/doc/files/objects/0/665/561/big/5d2c93b63eea9.jpg",
          "My sample image"
        )
        .then(() => {
          this.$refs.tuiImageEditor.invoke("resizeCanvasDimension", {
            width: 500,
            height: 400
          });
        });

      //$0.toDataURL()
    }
  }
};
</script>

<style lang="scss">
.imageEditorApp {
  width: 1000px;
  height: 800px;
}
</style>
