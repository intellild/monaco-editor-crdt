<template>
  <div id="container" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import * as monaco from "monaco-editor";

export default defineComponent({
  name: "HelloWorld",
  mounted() {
    const div = document.getElementById("container");
    if (!div) {
      return;
    }
    const model = monaco.editor.createModel("");
    const editor = monaco.editor.create(div, {
      model,
      theme: "vs-dark",
    });
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#container {
  width: 100vw;
  height: 100vh;
}
</style>
