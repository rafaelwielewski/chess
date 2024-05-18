<template>
  <div class="bg-white text-red text-center q-pa-md flex flex-center">
    <div>
      <div class="column items-center">
        <q-icon name="error" size="20vh" color="red" />
      </div>
      <div class="text-h2">
        Página não encontrada
      </div>
      <q-btn class="q-mt-xl" color="primary" text-color="white" unelevated @click="goBackOrHome" size="xl" no-caps
        label="Voltar a página" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const goBackOrHome = () => {
  if (window.history.length > 1) {
    router.back();
  } else {
    router.push('/');
  }
};

</script>
