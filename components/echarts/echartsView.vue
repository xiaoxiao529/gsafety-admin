<template>
  <div class="" id="new-add-company" :style="{width: '100%', height: '300px'}"></div>
</template>

<script>
    let HOME_CHART = {}; //图表对象
    import echarts from 'echarts'
    export default {
        name: "echartsView",

        data(){
            return{
                newAddCompanyData:{},
            }
        },
        computed:{},
        methods: {
            initEcharts(obj){
                this.newAddCompanyData = obj;
                this.setChart();
                // resize 重新计算框架
                window.addEventListener('resize',function() {
                    HOME_CHART.newCompany.resize();
                });
            },

            setChart() {
                let _self = this;
                //新增企业趋势
                HOME_CHART.newCompany = echarts.init(document.getElementById('new-add-company'));
                HOME_CHART.newCompany.setOption({
                    tooltip: {
                        trigger: 'axis'
                    },
                    color: ['#1C77FF'],
                    grid: {
                        left: '2%',
                        right: '2%',
                        bottom: '7%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        data: _self.newAddCompanyData.echartX,
                        axisLine: {
                            lineStyle: {
                                color: '#e6e9ee'
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: '#e6e9ee'
                            }
                        },
                        axisLabel: {
                            color: '#a5adb8'
                        },
                        axisTick: {       //y轴刻度线
                            show: false
                        },
                    },
                    yAxis: {
                        type: 'value',
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: '#e6e9ee'
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: '#e6e9ee'
                            }
                        },
                        axisLabel: {
                            color: '#a5adb8'
                        },
                        axisTick: {       //y轴刻度线
                            show: false
                        },
                    },
                    series: [{
                        name: "新增企业个数",
                        data: _self.newAddCompanyData.echartY,
                        type: 'line',
                        smooth: true,
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#e8f1ff'
                                }, {
                                    offset: 1,
                                    color: '#ffffff'
                                }])
                            }
                        },
                    }]
                });
            },
        },
        mounted(){

        },
    }
</script>

<style scoped>

</style>
