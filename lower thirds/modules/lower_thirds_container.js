const LowerThirdsContainer = {
    template: '#lts-container-template',
    components: {LowerThird},
  
    setup() {
  
      const storables = {
        lts: ['alt-sort-order', [0,1,2,3]]
      };
  
      // prepare properties
      Object.keys(storables).forEach(key => {
        storables[key] = reactive(new Storable(...storables[key]));
      });
  
      return {...storables};
    },
    mounted() {
      $( "#sortable" ).sortable({handle: ".drag-handle"});
      $( "#sortable" ).on("sortupdate", this.updateSortOrder);
      $( "#sortable" ).disableSelection();
    },
    methods: {
      updateSortOrder() {
        const sorted = $('#sortable').sortable("toArray").map(val => parseInt(val.replace('alt-', '')));
        this.lts.value = sorted;
      }
    }
  }