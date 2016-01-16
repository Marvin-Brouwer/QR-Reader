class TabManager {
    private tabMenu: HTMLMenuElement;
    private menuItems: NodeListOf<HTMLLIElement>;
    private tabElements: NodeListOf<HTMLDivElement>;

    constructor() {
        this.tabMenu = <HTMLMenuElement>document.querySelector('nav[role=navigation]');
        this.menuItems = <NodeListOf<HTMLLIElement>>this.tabMenu.querySelectorAll('ul li');
        this.tabElements = <NodeListOf<HTMLDivElement>>document.querySelectorAll('.tabSection');
        for (let i = 0; i < this.menuItems.length; i++) {
            let item = this.menuItems.item(i);
            item.onclick = this.setActive.bind(this, item.getAttribute('data-tab'));
        }
    }

    public setActive(id: string) {
        for (let i = 0; i < this.menuItems.length; i++) {
            let item = this.menuItems.item(i);
            let hash = item.getAttribute('data-tab');
            let isSelected = hash === id;
            item.className = isSelected ? 'active' : String();
            document.querySelector(`#${hash}`).className = 'tabSection';
        };
        for (let i = 0; i < this.tabElements.length; i++) {
            let item = this.tabElements.item(i);
            let isSelected = item.id === id;
            item.className = isSelected ? 'tabSection active' : 'tabSection';
        };
    }

}