import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import { useToast } from '@/lib/primevue';
import { objectService } from '@/services';
import { useAppStore } from '@/store';
import { partition } from '@/utils/utils';

import type { Ref } from 'vue';
import type { GetObjectTaggingOptions, Tagging } from '@/types';

export type TagStoreState = {
  tagging: Ref<Array<Tagging>>
}

export const useTagStore = defineStore('tag', () => {
  const appStore = useAppStore();
  const toast = useToast();

  // State
  const state: TagStoreState = {
    tagging: ref([])
  };

  // Getters
  const getters = {
    getTagging: computed(() => state.tagging.value)
  };

  // Actions
  async function fetchTagging(params: GetObjectTaggingOptions = {}) {
    try {
      appStore.beginIndeterminateLoading();

      const response = (await objectService.getObjectTagging(params)).data;

      // Remove old values matching search parameters
      const matches = (x: Tagging) => (
        (!params.objectId ||
          (Array.isArray(params.objectId) && params.objectId.some((y: string) => x.objectId === y)) ||
          (!Array.isArray(params.objectId) && params.objectId === x.objectId))
      );

      const [, difference] = partition(state.tagging.value, matches);

      // Merge and assign
      state.tagging.value = difference.concat(response);
    }
    catch (error: any) {
      toast.error('Fetching tags', error);
    }
    finally {
      appStore.endIndeterminateLoading();
    }
  }

  const findTaggingByObjectId = (objectId: string) => state.tagging.value.find((x: Tagging) => x.objectId === objectId);

  return {
    // State
    ...state,

    // Getters
    ...getters,

    // Actions
    fetchTagging,
    findTaggingByObjectId,
  };
}, { persist: true });

export default useTagStore;
