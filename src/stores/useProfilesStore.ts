import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
const toast = useToast();

const user_agent_list = {
  windows:
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
  mac: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
  linux:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
};

const webgl_renderer_list = {
  "NVIDIA Corporation": [
    "NVIDIA GeForce GTX 1050 Ti/PCIe/SSE2",
    "NVIDIA GeForce GTX 1650 SUPER/PCIe/SSE2",
  ],
};

interface IProfile {
  id: number;
  name: string;
  status?: string; // "new" | "ready" | "banned"
  observation?: string;
}

interface IStoreProfile {
  profiles: IProfile[];
}

function sortProfileById(profileList: IProfile[]) {
  function sortById(a: IProfile, b: IProfile) {
    return a.id - b.id;
  }
  return profileList.sort(sortById);
}

export const useProfilesStore = defineStore("profiles", {
  state: (): IStoreProfile => ({
    profiles: [
      // { id: 0, name: "Perfil 1", status: "new" },
      // { id: 1, name: "Perfil 2", status: "ready" },
      // { id: 2, name: "Perfil 3", status: "banned" },
    ],
  }),
  getters: {
    getLastId: (state): number => {
      const profiles = sortProfileById(state.profiles);
      return profiles.length === 0 ? 0 : profiles[profiles.length - 1].id;
    },
    getById: (state) => {
      return (id: number): IProfile => {
        const profile = state.profiles.filter((profile) => profile.id === id);
        return profile[0];
      };
    },
  },
  actions: {
    addProfile(profile: IProfile) {
      this.profiles = sortProfileById(this.profiles);
      this.profiles.push(profile);
      toast.success("Novo perfil salvo");
    },
    removeProfile(_profile: IProfile) {
      this.profiles = this.profiles.filter(
        (profile) => profile.id !== _profile.id
      );
      toast.success("Perfil removido");
    },
  },
});
