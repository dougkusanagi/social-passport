<template>
  <!-- The button to open modal -->
  <label for="modal-create-profile" class="btn btn-sm">Criar Perfil</label>

  <!-- Put this part before </body> tag -->
  <input
    v-model="modalToggle"
    type="checkbox"
    id="modal-create-profile"
    class="modal-toggle"
  />
  <label class="modal cursor-pointer" for="modal-create-profile">
    <label for="" class="modal-box w-11/12 max-w-5xl">
      <label
        for="modal-create-profile"
        class="btn btn-sm btn-circle absolute right-2 top-2"
        >✕</label
      >
      <h3 class="font-bold text-lg mb-6">Novo Perfil</h3>

      <div class="flex gap-4">
        <div class="form-control w-4/5">
          <label class="label" for="name">
            <span class="label-text">Nome</span>
          </label>

          <input
            type="text"
            placeholder="Nome do perfil"
            class="input input-bordered w-full"
            v-model="name"
            id="name"
          />
        </div>

        <div class="form-control w-1/5">
          <label class="label" for="status">
            <span class="label-text">Status</span>
          </label>

          <select
            class="select select-bordered w-full"
            v-model="status"
            id="status"
          >
            <option value="" selected>-- Status</option>
            <option value="new">Novo</option>
            <option value="ready">Pronto</option>
            <option value="banned">Banido</option>
          </select>
        </div>
      </div>

      <div class="flex mt-4">
        <div class="form-control w-full">
          <label class="label" for="observation">
            <span class="label-text">Observação</span>
          </label>

          <textarea
            class="textarea textarea-bordered"
            placeholder="Escreva aqui observações sobre o perfil..."
            v-model="observation"
            id="observation"
          ></textarea>
        </div>
      </div>
      <div class="modal-action">
        <button @click="storeProfile" class="btn btn-success">Salvar</button>
      </div>
    </label>
  </label>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useProfilesStore } from "../stores/useProfilesStore";

const name = ref("");
const status = ref("");
const observation = ref("");
const modalToggle = ref(false);

function storeProfile() {
  const profile_store = useProfilesStore();
  const profile = {
    id: profile_store.getLastId + 1,
    name: name.value,
    status: status.value,
    observation: observation.value,
  };

  profile_store.addProfile(profile);

  name.value = "";
  status.value = "";
  observation.value = "";

  modalToggle.value = false;
}
</script>
