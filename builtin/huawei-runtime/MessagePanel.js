Editor.Panel.extend({
    style: `
    :host { margin: 5px; }
    h2 { color: #f90; }
  `,

    template: `
    <h2>构建 rpk 信息</h2>
    <hr />
    <div><span id="label" style="color:red;font-size:16px;"></span></div>
  `,

    $: {
        label: '#label',
    },

    run(argv) {
        this.$label.innerText = argv;
    },
});