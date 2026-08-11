<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;

  $: info = data.diagnostics;

  $: extraData = Object.entries(info?.additionalDiagnostics ?? {}).map(([key, val]) => {
    return {
      key,
      val,
      open: true,
      label() {
        return `${key} ${this.open ? '-' : '+'}`;
      }
    };
  });
</script>

<table class="overflow-auto">
  <tbody>
    {#each extraData as i}
      <tr on:click={() => (i.open = !i.open)} class="header">
        <td>{i.label()}</td>
      </tr>

      {#if i.open}
        <tr>
          <td>
            <code>{i.val}</code>
          </td>
        </tr>
      {/if}
    {/each}
  </tbody>
</table>

<style scoped>
  .header {
    color: lightsteelblue;
  }

  .header:hover {
    cursor: pointer;
  }

  code {
    overflow: scroll;
    white-space: pre;
    display: block;
    padding-left: 1em;
  }
</style>
