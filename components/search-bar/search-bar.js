Component({
    properties: {
        searchInput: {
            type: Boolean,
            value: false
        },
        placeholder: {
            type: String,
            value: '搜索'
        }
    },
    methods: {
        enterSearch() {
            this.triggerEvent('entersearch');
        },
        input(e) {
            // this.triggerEvent('searchEvent', e.detail.value);
            this.keyword = e.detail.value;
            if (e.detail.value && !this.data.showSearch) {
                this.setData({
                    showSearch: true
                });
            } else if (!e.detail.value && this.data.showSearch) {
                this.setData({
                    showSearch: false
                });
            }
        },
        confirm() {
            this.triggerEvent('searchevent', { tag: 'search', keyword: this.keyword });
        },
        searchEvent(e) {
            let { tag } = e.currentTarget.dataset,
                data = { tag };
            if (tag == 'search') {
                data.keyword = this.keyword;
            }
            this.triggerEvent('searchevent', data);
        }
    }
})