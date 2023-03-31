<template>
  <button
    @click="handleProfile()"
    v-if="!browser_store.isRuning(props.id)"
    class="btn btn-success btn-sm ml-2"
  >
    Iniciar Bot
  </button>

  <button
    @click="handleProfile()"
    v-if="browser_store.isRuning(props.id)"
    class="btn btn-error btn-sm ml-2"
  >
    Parar Bot
  </button>
</template>

<script setup>
import fs from "fs";
import { onMounted } from "vue";
import { useToast } from "vue-toastification";
import { useBrowserStore } from "../stores/useBrowserStore";
import { useProfilesStore } from "../stores/useProfilesStore";

// const args = puppeteer.defaultArgs();
// args.push("--auto-open-devtools-for-tabs");
// const browser = await puppeteer.launch({ ignoreDefaultArgs: true, args });

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

onMounted(handleProfile);

let browser;

// const url = "chrome://newtab";
// const url = "https://bot.sannysoft.com";
const url = "https://dougdesign.com.br";

async function handleProfile() {
  console.log("start bot");
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

  await page.waitForTimeout(7000); // await vpn startup

  // await NavigateToTwitter(page);

  await page.goto(url);

  startNavigation(page);

  // findAdsenseAndClick();
}

async function NavigateToTwitter(page) {
  const links = ["https://t.co/aTAbNCd3Wz"];

  await page.goto("https://twitter.com/DougLopesReal");
  const randomLink = getRandomItem(links);
  await page.goto(randomLink);
}

async function startNavigation(_page) {
  const page = _page;

  async function navigateTo() {
    try {
      const post_links = await page.$$(
        "div > div.card_content > div.post_title > h2 > a"
      );

      // const p_h = await page.evaluate(post_links, (a) => a.getAttribute("href"));

      const randomLink = getRandomItem(post_links);

      await randomLink.click();
      await page.waitForTimeout(randomIntFromInterval(15000, 25000));
      // await page.goBack();
      await page.goto("https://dougdesign.com.br");
      await page.waitForTimeout(randomIntFromInterval(6000, 10000));

      // navigateTo();
    } catch (error) {
      console.log(error);
    } finally {
      navigateTo();
    }
  }

  navigateTo();
}

function getRandomItem(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

async function findAdsenseAndClick() {
  const iframes = await page.$$("iframe");

  // iterate over the iframes
  for (let i = 0; i < iframes.length; i++) {
    const iframe = iframes[i];
    const link = await iframe.$$("body");
    console.log(link);
  }

  // const frame = await iframe.contentFrame();
  // await frame.waitForSelector('[ng-model="vm.username"]');
  // const username = await frame.$('[ng-model="vm.username"]');
  // await username.type("foo");
  // await browser.close();
}
</script>
