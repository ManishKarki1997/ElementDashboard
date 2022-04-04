const debounce = {
  data() {
    return {
      debounceRef: null,
    };
  },

  methods: {
    debounce(fn, timeout = 500) {
      clearTimeout(this.debounceRef);
      this.debounceRef = setTimeout(() => {
        fn();
      }, timeout);
    },
  },
};

export default debounce;
