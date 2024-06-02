<script setup>
	import { ref, onMounted } from 'vue';
	import VisitItem from '@/components/VisitItem.vue'
	import { useVisitStore } from '@/stores/VisitsStore';
	import VisitForm from '@/components/VisitForm.vue';
	
	const props = defineProps({
		items: Array
	})

	const editId = ref(0);
	const visible = ref(false);

	const editItem = (id) => {
		editId.value = id
		visible.value = true
	}
</script>
<template>
	<Suspense>
		<div class="grid grid-cols-4 gap-4">
			<VisitItem
				v-for="item in items"
				:key="item.id"
				:id="item.id"
				:place="item.place"
				:period="item.period"
				:responsable="item.responsable"
				:totalVisitors="item.visitors.length"
				@editItem="editItem"
			/>
			<VisitForm v-model:visible="visible" :id="editId" @submitItem="" />
		</div>
	</Suspense>
</template>
