<template>
    <div class="relative">
        <input v-model="data" required="true" :type="type ? type : 'text'"
            class="input w-full border-none block text-ap-normal text-content-2 focus:outline-none"
            :class="disable ? 'cursor-not-allowed' : ''">
        <span class="highlight"></span>
        <span class="bar w-full"></span>
        <label class="absolute left-0.5 top-0.5 pointer-events-none 
            font-bold text-content-1 font-icon-font text-ap-normal 
            transition-all duration-300">
            {{ label }}
        </label>
    </div>
</template>

<script lang='ts' setup>

interface InputProps {
    label: string
    modelValue: string | null
    type?: string
    disable?: boolean
}

const props = defineProps<InputProps>()
const emits = defineEmits(['update:modelValue'])
const data = ref(props.modelValue)
watch(() => data.value, val => {
    if (props.disable) {
        data.value = props.modelValue
        return
    }
    emits('update:modelValue', val)
})

</script>
<style lang='scss' scoped>
.input {
    padding: 10px 10px 10px 5px;
    border-bottom: 1px solid #515151;
    background: transparent;
}

.input:focus~label,
.input:valid~label {
    top: -20px;
    color: #1ca4b3;
}

.bar {
    position: relative;
    display: block;
}

.bar:before,
.bar:after {
    content: '';
    height: 2px;
    width: 0;
    bottom: 1px;
    position: absolute;
    background: #1ca4b3;
    transition: 0.2s ease all;
    -moz-transition: 0.2s ease all;
    -webkit-transition: 0.2s ease all;
}

.bar:before {
    left: 50%;
}

.bar:after {
    right: 50%;
}

.input:focus~.bar:before,
.input:focus~.bar:after {
    width: 50%;
}

.highlight {
    position: absolute;
    height: 60%;
    width: 100px;
    top: 25%;
    left: 0;
    pointer-events: none;
    opacity: 0.5;
}

.input:focus~.highlight {
    animation: inputHighlighter 0.3s ease;
}

@keyframes inputHighlighter {
    from {
        background: #1ca4b3;
    }

    to {
        width: 0;
        background: transparent;
    }
}
</style>