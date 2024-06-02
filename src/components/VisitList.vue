<script setup>
	import { ref } from 'vue';
	import VisitItem from '@/components/VisitItem.vue'
	import VisitForm from '@/components/VisitForm.vue';
	import VisitorDialog from '@/components/VisitorDialog.vue';
	
	const props = defineProps({
		items: Array
	})

	const editId = ref(0);
	const visible = ref(false);
	const visitors = ref([]);
	const visibleVisitorDialog = ref(false);

	const onViewVisitors = (id) => {
		editId.value = id;
		visitors.value = props.items.find(x => x.id == id);
		visitors.value = visitors.value.visitors;
		visibleVisitorDialog.value = true;
	}

	const editItem = (id) => {
		editId.value = id;
		visible.value = true;
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
				@viewVisitors="onViewVisitors"
			/>
			<VisitForm v-model:visible="visible" :id="editId" @submitItem="" />
			<VisitorDialog v-model:visible="visibleVisitorDialog" :visitors="visitors"/>
		</div>
	</Suspense>
</template>
