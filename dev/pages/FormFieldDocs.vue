<template>
  <section v-once>
    <h4 class="mt-64 mb-16">Props</h4>

    <docs-table>
      <tr>
        <td>label</td>
        <td>string</td>
        <td></td>
      </tr>
      <tr>
        <td>hint</td>
        <td>
          <div>string</div>
          <div class="annotation">The string can contain HTML</div>
        </td>
        <td></td>
      </tr>
      <tr>
        <td>invalid</td>
        <td>boolean</td>
        <td></td>
      </tr>
      <tr>
        <td>label-level</td>
        <td>
          <div>number</div>
          <div class="annotation">Useable on toggles, will make the emitted <code>legend</code> element into a heading for accessibility</div>
        </td>
        <td></td>
      </tr>
    </docs-table>

    <h4 class="mt-64 mb-16">Slots</h4>

    <h5 class="mt-32">default</h5>
    <p class="text-14">This slot is used by all other form elements, and is where one can slot any content that should be wrapped by a field</p>

    <h5 class="mt-32">control</h5>
    <p class="text-14">The control slot is used to control a form element. It provides one slot attribute, <code>form</code> whose properties are below.</p>

    <docs-table>
      <template #titles>
        <th>name</th>
        <th>info</th>
      </template>
      <tr>
        <td>validate</td>
        <td class="text-12">A function which, when called, will force all descendants to immediately validate</td>
      </tr>
      <tr>
        <td>valid</td>
        <td class="text-12">A boolean indicating if all descendants are currently valid</td>
      </tr>
      <tr>
        <td>completed</td>
        <td class="text-12">A boolean indicating if all descendants are currently completed</td>
      </tr>
      <tr>
        <td>validationElements</td>
        <td class="text-12">The list of descendants the form has registered</td>
      </tr>
    </docs-table>

  </section>
</template>
