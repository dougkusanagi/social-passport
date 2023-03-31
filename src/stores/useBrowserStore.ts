import { defineStore } from "pinia";

interface IStoreBrowser {
  running: number[];
}

export const useBrowserStore = defineStore("browser", {
  state: (): IStoreBrowser => ({
    running: [],
  }),

  getters: {
    isRuning: (state) => {
      return (id: number) =>
        state.running.filter((runningId: number) => runningId === id).length;
    },
  },

  actions: {
    start(id: number) {
      this.running.push(id);
    },

    stop(id: number) {
      this.running = this.running.filter(
        (runningId: number) => runningId !== id
      );
    },
  },
});
