<template>
  <div class="my-container">
    <el-row>
      <el-col :span="6">
        <ProjectCard :featureData="featureData"></ProjectCard>
      </el-col>
      <el-col :span="18">
        <FeatureTab :featureData="featureData"></FeatureTab>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ProjectCard from "./components/ProjectCard.vue";
import FeatureTab from "./components/FeatureTab.vue";
import { getFeature } from "@/api/getData";

const featureData = ref([]);

const getFeatureFn = async () => {
  const { data } = await getFeature();
  featureData.value = data;
};

getFeatureFn();
</script>

<style lang="scss" scoped></style>
