<script setup lang="ts">
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart, PieChart, LineChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from 'echarts/components';
import VChart from 'vue-echarts';
import { ref, computed } from 'vue';

use([
  CanvasRenderer,
  BarChart,
  PieChart,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
]);

const rawData = ref([
  { name: '총통화', value: 10 },
  { name: 'I/B통화', value: 6 },
  { name: 'O/B통화', value: 4 },
]);

const sttData = ref([
  { name: '휴식', value: 1 },
  { name: '후처리', value: 2 },
  { name: '통화', value: 4 },
]);

const generateCalmColors = (count: number) => {
  const colors = [];
  for (let i = 0; i < count; i++) {
    const hue = 200 + i * (80 / count);

    colors.push(`hsl(${hue}, 45%, 65%)`);
  }
  return colors;
};

const chartData = computed(() => {
  const count = rawData.value.length;
  const colors = generateCalmColors(count);

  return rawData.value.map((item, index) => ({
    name: item.name,
    value: item.value,
    itemStyle: {
      color: colors[index],
    },
  }));
});

const optionBar = computed(() => ({
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'shadow' },
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    data: chartData.value.map((item) => item.name), // 라벨 추출
    axisTick: { alignWithLabel: true },
    // axisLabel: { interval: 'auto', rotate: 30 },
  },
  yAxis: {
    // type: 'value',
    // splitLine: { show: true }, // 가로 그리드
  },
  series: [
    {
      name: '통화량',
      type: 'bar',
      data: chartData.value, // 색상이 포함된 데이터 주입
      barWidth: '55%',
      label: {
        show: false,
        position: 'top',
        formatter: '{c} 건', // 숫자 뒤에 단위 표시
        color: '#777',
      },
    },
  ],
}));

const optionBar2 = computed(() => ({
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'shadow' },
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: {},
  yAxis: {
    type: 'category',
    data: chartData.value.map((item) => item.name), // 라벨 추출
    axisTick: { alignWithLabel: true },
  },
  series: [
    {
      name: '통화량',
      type: 'bar',
      data: chartData.value, // 색상이 포함된 데이터 주입
      barWidth: '55%',
      label: {
        show: false,
        position: 'top',
        formatter: '{c} 건', // 숫자 뒤에 단위 표시
        color: '#777',
      },
    },
  ],
}));

const totalStt = computed(() => {
  return sttData.value.reduce((acc, cur) => acc + cur.value, 0);
});
const optionPie = ref({
  color: generateCalmColors(rawData.value.length),
  title: [
    {
      text: '총통화',

      left: 'center',
      top: '42%',
      textStyle: {
        fontSize: 18,
        color: '#444',
        fontWeight: 'bold',
      },
    },
    {
      text: totalStt.value + '건',
      left: 'center',
      top: '50%',
      textStyle: {
        fontSize: 20,
        color: '#888',
      },
    },
  ],
  tooltip: {
    trigger: 'item',
  },
  series: [
    {
      name: '통화량',
      type: 'pie',
      radius: ['30%', '80%'],
      avoidLabelOverlap: false,

      data: sttData,
      label: {
        show: true, // 글자 표시 여부
        position: 'outside', // 도넛 바깥쪽에 표시
        formatter: '{b}: {c}', // 이름 줄바꿈 후 수치 표시
        fontSize: 14, // 폰트 크기
        fontWeight: '500', // 폰트 굵기
        color: '#fdfdfd', // 글자 색상

        // 2. 글자 배경(박스) 설정
        backgroundColor: 'inherit', // 레이블 배경색
        padding: [8, 8], // 상하, 좌우 패딩
        borderRadius: 4, // 모서리 둥글게

        // 글자 위치 미세 조정 (도넛에서 멀어지게)
        distanceToLabelLine: 5,
      },
    },
  ],
});

const optionLine = ref({
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'shadow' },
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      smooth: true,
    },
  ],
});
</script>
<template>
  <div>
    <div class="flex gap-10">
      <div>
        <div class="form-section-title">Bar</div>
        <div class="card flex justify-center" style="width: 600px; height: 300px">
          <VChart class="chart" :option="optionBar" autoresize />
        </div>
      </div>
      <div>
        <div class="form-section-title">Bar vertical</div>
        <div class="card flex justify-center" style="width: 600px; height: 300px">
          <VChart class="chart" :option="optionBar2" autoresize />
        </div>
      </div>
    </div>
    <div class="flex gap-10">
      <div>
        <div class="form-section-title">Line</div>
        <div class="card flex justify-center" style="width: 600px; height: 300px">
          <VChart class="chart" :option="optionLine" autoresize />
        </div>
      </div>
      <div>
        <div class="form-section-title">Doughnut</div>
        <div class="card flex justify-center" style="width: 600px; height: 300px">
          <VChart class="chart" :option="optionPie" autoresize />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.chart {
  height: 100%;
  width: 100%;
}
</style>
