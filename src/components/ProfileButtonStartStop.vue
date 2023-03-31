<template>
  <button
    @click="handleProfile()"
    v-if="!browser_store.isRuning(props.id)"
    class="btn btn-success btn-sm"
  >
    Iniciar
  </button>

  <button
    @click="handleProfile()"
    v-if="browser_store.isRuning(props.id)"
    class="btn btn-error btn-sm"
  >
    Parar
  </button>
</template>

<script setup>
import fs from "fs";
import { useToast } from "vue-toastification";
import { useBrowserStore } from "../stores/useBrowserStore";
import { useProfilesStore } from "../stores/useProfilesStore";

// const puppeteer = require("puppeteer");
const { executablePath } = require("puppeteer");
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

const profile_store = useProfilesStore();
const browser_store = useBrowserStore();
const toast = useToast();

const props = defineProps({
  id: {
    type: Number,
    default: null,
  },
});

let browser;

// const url = "http://localhost/browser-checker/";
const url = "chrome://newtab";

async function handleProfile() {
  if (browser_store.running.length > 0 && !browser_store.isRuning(props.id)) {
    return toast.error("Já existe um perfil em execução");
  }

  // const profile = profile_store.profiles[props.id];
  const profile = profile_store.getById(props.id);

  const user_data_dir = `./profiles/${profile.name}`;
  const user_data_dir_exists = fs.existsSync(user_data_dir);

  if (!user_data_dir_exists) {
    fs.mkdirSync(user_data_dir, { recursive: true });
  }

  browser_store.start(props.id);

  if (browser) {
    browser_store.stop(props.id);
    browser.close();
    return;
  }

  browser = await puppeteer.launch({
    headless: false,
    executablePath: executablePath(),
    userDataDir: user_data_dir,
  });

  browser.on("disconnected", () => {
    browser = null;
    browser_store.stop(props.id);
  });

  // const page = await browser.newPage();
  const [page] = await browser.pages();
  await page.goto(url);
}
</script>
