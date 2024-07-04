<script setup>
	import { ref } from 'vue';
	import VisitItem from '@/components/VisitItem.vue'
	import VisitForm from '@/components/VisitForm.vue';
	import VisitorDialog from '@/components/VisitorModal.vue';
	import OpinionAPIClient from '@/API/OpinionAPIClient';
	
	const props = defineProps({
		items: Array
	})

	const editId = ref(0);
	const visible = ref(false);
	const visitors = ref([]);
	const visibleVisitorDialog = ref(false);
	const opinionApiClient = new OpinionAPIClient();

	const onViewVisitors = async (id) => {
		let opinions = await opinionApiClient.getAll();

		editId.value = id;
		visitors.value = props.items.find(x => x.id == id);
		visitors.value = visitors.value.visitors;

		visitors.value.map((item) => {
			item.opinion = opinions.find(x => x.visitorId == item.id);
			return item;
		});

		visibleVisitorDialog.value = true;
	}

	const formatDate = (period) => {
		return (new Date(period + " 12:00:00")).toLocaleDateString()
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
				:period="formatDate(item.period)"
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
