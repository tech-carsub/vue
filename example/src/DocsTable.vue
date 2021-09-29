<template>
  <table class="w-full docs-table">
    <thead>
      <tr class="text-left text-gray-400 uppercase">
        <slot name="titles" v-if="$slots.titles" />
        <template v-else>
          <th>prop</th>
          <th>type</th>
          <th>default</th>
        </template>
      </tr>
    </thead>
    <tbody class="align-top">
      <slot />
    </tbody>
  </table>
</template>

<style>
.annotation {
  font-size: 10px;
  margin-top: 4px;
}
.docs-table thead th {
  font-size: 10px;
  padding: 8px 16px;
}
.docs-table tbody td {
  border-top: 1px solid var(--f-gray-200);
  padding: 16px;
}
.docs-table tr {
  font-size: 14px;
}
.docs-table tbody tr td:first-of-type {
  font-weight: bold;
}
</style>
