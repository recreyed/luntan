<template>
  <header>
    <NotificationHeader></NotificationHeader>
    <PivateLetter></PivateLetter>
    <DownNav :iconNum="iconChat"></DownNav>
  </header>
</template>

<script>
import NotificationHeader from "@/components/NotificationHeader";
import PivateLetter from "@/components/PivateLetter";
import DownNav from "@/components/DownNav";
export default {
  name: "Chatwith",
  components: {
    NotificationHeader,
    PivateLetter,
    DownNav,
  },
  data() {
    return {
      // 传给底部栏
      iconChat: 4,
    };
  },
};
</script>

<style scoped>
</style>