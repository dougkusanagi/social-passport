<template>
  <div class="max-w-7xl mx-auto">
    <div class="flex items-center gap-4 mt-8 mb-6">
      <h1 class="text-3xl">Guepardo MultLogin</h1>
      <ProfileButtonCreate />
    </div>

    <div class="">
      <table class="table w-full">
        <!-- head -->
        <thead>
          <tr>
            <th>Nome</th>
            <th>Ações</th>
            <th>Status</th>
            <th>Navegador</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="profile in profileStore.profiles" :key="profile.id">
            <td>{{ profile.name }}</td>

            <td>
              <div class="flex items-center">
                <ButtonStartStopProfile :id="profile.id" />

                <div class="dropdown dropdown-right">
                  <label tabindex="0" class="btn btn-sm ml-2">
                    <EllipsisVerticalIcon class="h-6 w-6 text-blue-500" />
                  </label>
                  <ul
                    tabindex="0"
                    class="dropdown-content menu p-2 shadow bg-slate-800 rounded-box w-52"
                  >
                    <li>
                      <a class="text-blue-500">
                        <DocumentDuplicateIcon class="h-6 w-6" />
                        Duplicar
                      </a>
                    </li>
                    <li>
                      <button
                        class="text-rose-600"
                        type="button"
                        @click="profileStore.removeProfile(profile)"
                      >
                        <TrashIcon class="h-6 w-6" />
                        Deletar
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </td>

            <td>
              <div
                v-if="profile.status === 'new'"
                class="badge badge-outline badge-info"
              >
                Novo
              </div>
              <div
                v-if="profile.status === 'ready'"
                class="badge badge-outline badge-success"
              >
                Pronto
              </div>
              <div
                v-if="profile.status === 'banned'"
                class="badge badge-outline badge-error"
              >
                Banido
              </div>
            </td>

            <td>
              <div
                v-if="browserStore.isRuning(profile.id)"
                class="badge badge-success gap-2"
              >
                EXECUTANDO
              </div>

              <div
                v-if="!browserStore.isRuning(profile.id)"
                class="badge gap-2"
              >
                PAUSADO
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProfileButtonCreate from "./components/ProfileButtonCreate.vue";
import ButtonStartStopProfile from "./components/ProfileButtonStartStop.vue";
import { useBrowserStore } from "./stores/useBrowserStore";
import { useProfilesStore } from "./stores/useProfilesStore";
import {
  EllipsisVerticalIcon,
  DocumentDuplicateIcon,
  TrashIcon,
} from "@heroicons/vue/24/solid";

const profileStore = useProfilesStore();
const browserStore = useBrowserStore();
</script>
