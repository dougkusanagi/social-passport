import { createApp } from "vue";
import App from "./App.vue";
import fs from "fs";
import Toast from "vue-toastification";
import {
  createPinia,
  PiniaCustomStateProperties,
  PiniaPluginContext,
} from "pinia";
import "./style.css";
import "./samples/node-api";
import "vue-toastification/dist/index.css";

const pinia = createPinia();

const jsonStoragePinia = (context: PiniaPluginContext) => {
  const storeId = context.store.$id;
  const data_dir = "data/";
  const dir_exists = fs.existsSync(data_dir);
  const fileDataPath = `${data_dir}/${storeId}.json`;

  if (!dir_exists) {
    fs.mkdirSync(data_dir);
  }

  const fileData = fs.existsSync(fileDataPath);

  if (fileData) {
    const data = fs.readFileSync(fileDataPath).toString();
    context.store.$patch(JSON.parse(data));
  }

  context.store.$subscribe((mutation, state: PiniaCustomStateProperties) => {
    fs.writeFileSync(fileDataPath, JSON.stringify(state));
  });
};

pinia.use(jsonStoragePinia);

const toast_options = {
  position: "bottom-right",
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: "button",
  icon: true,
};

createApp(App)
  .use(pinia)
  .use(Toast, toast_options)
  .mount("#app")
  .$nextTick(() => {
    postMessage({ payload: "removeLoading" }, "*");
  });
