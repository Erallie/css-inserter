import { ButtonComponent, PluginSettingTab, Setting } from "obsidian";
import CSSInserter from './main';
export interface CSS {
    name: string;
    tag: string;
    class: string;
    style: string;
    contextMenu: boolean;
}
export interface CSSInserterSettings {
    css: CSS[];
}

export const DEFAULT_SETTINGS: CSSInserterSettings = {
    css: [
        { name: "Chapter number", tag: "h2", class: "chapter-number", style: "font-size: 4em", contextMenu: false },
        { name: "No indent", tag: "p", class: "no-indent", style: "text-indent: 0", contextMenu: false },
        { name: "Yellow highlight", tag: "span", class: "highlight", style: "background-color: #fff88f; color: black", contextMenu: true },
        { name: "Green highlight", tag: "span", class: "highlight", style: "background-color: #1EFF00; color: black", contextMenu: true },
        { name: "Nothing", tag: "span", class: "", style: "", contextMenu: false },
    ]
}

export class GeneralSettingsTab extends PluginSettingTab {

    plugin: CSSInserter;

    /* constructor(app: App, plugin: CSSInserter) {
        super(app, plugin);
        this.plugin = plugin;
    } */

    display() {
        const { containerEl } = this;

        this.clearHtml();

        containerEl.empty();

        /* containerEl.createEl('h1', { text: 'CSS Inserter' }); */
        containerEl.createEl('p', { text: 'CSS snippets to be applied to the selected text:' });

        const settingHeader: HTMLDivElement = containerEl.createDiv({ cls: "setting-header" });
        settingHeader.createDiv({ text: "Name", cls: "value-header" });
        settingHeader.createDiv({ text: "Tag", cls: "tag-header" });
        settingHeader.createDiv({ text: "Class", cls: "value-header" });
        settingHeader.createDiv({ text: "Style", cls: "style-header" });
        settingHeader.createDiv({ text: "", cls: "contextMenu-header" })

        // Add CSS Button
        let containerButton = settingHeader.createEl('div', { cls: 'container_add_button' });
        let addCSSButton = containerButton.createEl('button', { text: 'Add CSS Snippet' });

        // Setting Items
        const settingContainer: HTMLDivElement = containerEl.createDiv();
        addCSSButton.onclick = ev => this.addCSS(settingContainer);

        this.plugin.settings.css.forEach((s, i) => this.addCSS(settingContainer, i + 1));

        this.addInstructions(containerEl);

        /* this.donate(containerEl); */
    }


    private clearHtml() {
        // remove disruptive classes and elements
        setTimeout(() => {
            removeClass("setting-item");
            removeClass("setting-item-info");
            removeClass("setting-item-control");
            deleteContainer(".setting-item-description");
        }, 0);

        function removeClass(className: string) {
            document.querySelectorAll("." + className)
                .forEach(i => i.removeClass(className));
        }

        function deleteContainer(selector: string) {
            document.querySelectorAll(selector)
                .forEach(i => i.parentElement?.remove());
        }
    }

    private addCSS(containerEl: HTMLElement, counter?: number) {

        this.clearHtml();

        const { css } = this.plugin.settings;

        const settingItemContainer: HTMLDivElement = containerEl.createDiv({ cls: 'setting-item-container' });
        const cssCounter = counter ?? css.length + 1; // 1-based

        if (!counter) {
            const newCSS: CSS = { name: "Yellow highlight", tag: "span", class: "highlight", style: "background-color: #fff88f; color: black", contextMenu: false };
            css.push(newCSS);
            this.plugin.addCSSCommand(newCSS, cssCounter);
            this.plugin.saveSettings();
        }

        const currentCSS = css[cssCounter - 1];

        // CSS Name
        // let cssNameInput = settingItemContainer.createEl('input', { cls: 'css-inserter-setting-item-name' });
        // cssNameInput.value = currentCSS.name;
        // cssNameInput.onchange = (async (event) => {
        // 	const value = cssNameInput.value;
        // 	currentCSS.name = value;
        // 	await this.plugin.saveSettings();
        // 	this.plugin.addCSSCommand({
        // 		name: value,
        // 		tag: currentCSS.tag,
        // 		class: currentCSS.class,
        // 		style: currentCSS.style,
        // 		contextMenu: currentCSS.contextMenu
        // 	}, cssCounter + 1);
        // });

        // CSS Name
        new Setting(settingItemContainer)
            .setClass('css-inserter-setting-item')
            .addText(text => {
                return text.setValue(currentCSS.name)
                    .onChange(async (value) => {
                        currentCSS.name = value;
                        await this.plugin.saveSettings();
                        this.plugin.addCSSCommand({
                            name: value,
                            tag: currentCSS.tag,
                            class: currentCSS.class,
                            style: currentCSS.style,
                            contextMenu: currentCSS.contextMenu
                        }, cssCounter + 1);
                    })
            });
        new Setting(settingItemContainer)
            .setClass('css-inserter-setting-item-tag')
            .addText(text => {
                return text.setValue(currentCSS.tag)
                    .onChange(async (value) => {
                        currentCSS.tag = value;
                        await this.plugin.saveSettings();
                        this.plugin.addCSSCommand({
                            name: currentCSS.name,
                            tag: value,
                            class: currentCSS.class,
                            style: currentCSS.style,
                            contextMenu: currentCSS.contextMenu
                        }, cssCounter + 1);
                    })
            });

        new Setting(settingItemContainer)
            .setClass('css-inserter-setting-item')
            .addText(text => {
                return text.setValue(currentCSS.class)
                    .onChange(async (value) => {
                        currentCSS.class = value;
                        await this.plugin.saveSettings();
                        this.plugin.addCSSCommand({
                            name: currentCSS.name,
                            tag: currentCSS.tag,
                            class: value,
                            style: currentCSS.style,
                            contextMenu: currentCSS.contextMenu
                        }, cssCounter + 1);
                    })
            });

        new Setting(settingItemContainer)
            .setClass('css-inserter-setting-item-style')
            .addText(text => {
                return text.setValue(currentCSS.style)
                    .onChange(async (value) => {
                        currentCSS.style = value;
                        await this.plugin.saveSettings();
                        this.plugin.addCSSCommand({
                            name: currentCSS.name,
                            tag: currentCSS.tag,
                            class: currentCSS.class,
                            style: value,
                            contextMenu: currentCSS.contextMenu
                        }, cssCounter + 1);
                    })
            });

        // Toggle Context Menu
        new Setting(settingItemContainer)
            .setClass('css-inserter-setting-item-contextMenu')
            .addToggle(toggle => {
                toggle.setValue(currentCSS.contextMenu)
                    .setTooltip((toggle.getValue() ? "Disable" : "Enable") + " in the context menu")
                    .onChange(async () => {
                        const value = toggle.getValue();
                        toggle.setTooltip((value ? "Disable" : "Enable") + " in the context menu");
                        currentCSS.contextMenu = value;
                        await this.plugin.saveSettings();
                    })
            });

        // Up Button
        const upDisabled = cssCounter - 1 === 0;
        const upButtonContainer = settingItemContainer.createDiv({ cls: 'css-inserter-button-container' });
        if (!upDisabled) {
            const upButton = new ButtonComponent(upButtonContainer);
            upButton.setIcon('lucide-arrow-up').setClass('css-inserter-delete-css-button')
                .setTooltip("Move up")
                .onClick(() => this.moveCSS("up", cssCounter, css));
        }

        // Down Button
        const downDisabled = (cssCounter === css.length);
        const downButtonContainer = settingItemContainer.createDiv({ cls: 'css-inserter-button-container' });
        if (!downDisabled) {
            const downButton = new ButtonComponent(downButtonContainer);
            downButton.setIcon('lucide-arrow-down').setClass('css-inserter-delete-css-button')
                .setTooltip("Move down")
                .onClick(() => this.moveCSS("down", cssCounter, css));
        }

        // Delete Button
        const deleteButtonContainer = settingItemContainer.createDiv({ cls: 'css-inserter-button-container' });
        const deleteButton = new ButtonComponent(deleteButtonContainer);
        deleteButton.setIcon('lucide-trash-2').setClass('css-inserter-delete-css-button')
            .setTooltip("Remove CSS snippet")
            .onClick(async () => {
                this.plugin.settings.css.splice(cssCounter - 1, 1);
                await this.plugin.saveSettings();
                this.display();
            });

        if (!counter) setTimeout(() => this.display(), 0);
    }

    private async moveCSS(direction: "up" | "down", cssCounter: number, css: CSS[]) {
        this.plugin.settings.css = moveCSS(direction, cssCounter, css);
        await this.plugin.saveSettings();
        this.plugin.settings.css.forEach((css, index) => {
            this.plugin.addCSSCommand(css, index + 1);
        });
        this.display();

        function moveCSS(direction: "up" | "down", cssCounter: number, css: CSS[]): CSS[] {
            const movingCSS = css.splice(cssCounter - 1, 1)[0];
            const newPosition = direction === "up" ? cssCounter - 2 : cssCounter;
            const newCSS = [
                ...css.slice(0, newPosition),
                movingCSS,
                ...css.slice(newPosition)
            ];
            return newCSS;
        }
    }

    private addInstructions(containerEl: HTMLElement) {

        const containerInstructions = containerEl.createEl('div', { cls: 'container-instructions' });


        // Instructions
        //Link to list of tags
        containerInstructions.createEl('span', { text: 'Here is a list of ', cls: 'instructions' }).createEl('a', { text: 'HTML tags', href: 'https://www.w3schools.com/tags/default.asp', cls: 'instructions' });
        containerInstructions.createEl('span', { text: ' to use.', cls: 'instructions' }).createEl('br');
        containerInstructions.createEl('br');
        containerInstructions.createEl('span', { text: 'Here is a ', cls: 'instructions' }).createEl('a', { text: 'guide', href: 'https://www.w3schools.com/html/html_styles.asp', cls: 'instructions' });
        // containerInstructions.createEl('a', { text: 'Here', href: 'https://www.w3schools.com/html/html_styles.asp', cls: 'instructions' });
        containerInstructions.createEl('span', { text: ' on how to format the ', cls: 'instructions' }).createEl('b', { text: 'style', cls: 'instructions' })
        containerInstructions.createEl('span', { text: ' part of the CSS snippet.', cls: 'instructions' }).createEl('br');
        containerInstructions.createEl('span', { text: "Everything within the quotes following ", cls: 'instructions' }).createEl('code', { text: "style=", cls: 'instructions' })
        containerInstructions.createEl('span', { text: " should be entered in the CSS snippet.", cls: 'instructions' }).createEl('br');
        containerInstructions.createEl('br');
        /* containerInstructions.createEl('span', { text: "The ", cls: 'instructions' }).createEl("b", { text: "class", cls: 'instructions' });
        containerInstructions.createEl('span', { text: ' should have no spaces.', cls: 'instructions' }).createEl("br");
        containerInstructions.createEl('br'); */


        // With Command Palette
        containerInstructions.createEl('span', { text: 'Usage with the ', cls: 'instructions' }).createEl("b", { text: "Command palette", cls: 'instructions' });
        containerInstructions.createEl('span', { text: ':', cls: 'instructions' });
        const commandPaletteUl = containerInstructions.createEl('ul', { cls: 'instructions' });
        commandPaletteUl.createEl('li', { text: 'Select text in the editor' });
        const openCP1 = commandPaletteUl.createEl('li');
        openCP1.createEl('span', { text: 'Open the ' }).createEl('b', { text: 'Command palette' });
        openCP1.createEl('span', { text: ':' });
        const openCPUl1 = commandPaletteUl.createEl('ul', { cls: 'instructions' });
        const openCPUl1Desktop = openCPUl1.createEl('li');
        openCPUl1Desktop.createEl('span', { text: 'Desktop: ' }).createEl('code', { text: 'Ctrl' });
        openCPUl1Desktop.createEl('span', { text: ' or ' }).createEl('code', { text: 'Cmd' });
        openCPUl1Desktop.createEl('span', { text: ' + ' }).createEl('code', { text: 'P' });
        openCPUl1.createEl('li', { text: 'Mobile: Swipe Down' });
        commandPaletteUl.createEl('li', { text: 'Look up the CSS snippet to apply: "CSS Inserter ..."' });
        commandPaletteUl.createEl('li', { text: 'Select the CSS snippet: ' }).createEl('code', { text: 'Enter' });


        // Remove Applied CSS
        containerInstructions.createEl('p', { text: 'Remove applied CSS snippet:', cls: 'instructions' });
        const removeUl = containerInstructions.createEl('ul', { cls: 'instructions' });
        removeUl.createEl('li', { text: 'Select the CSS-ified text in the editor' });
        const openCP2 = removeUl.createEl('li');
        openCP2.createEl('span', { text: 'Open the ' }).createEl('b', { text: 'Command palette' });
        openCP2.createEl('span', { text: ':' });
        const openCPUl2 = removeUl.createEl('ul', { cls: 'instructions' });
        const openCPUl2Desktop = openCPUl2.createEl('li');
        openCPUl2Desktop.createEl('span', { text: 'Desktop: ' }).createEl('code', { text: 'Ctrl' });
        openCPUl2Desktop.createEl('span', { text: ' or ' }).createEl('code', { text: 'Cmd' });
        openCPUl2Desktop.createEl('span', { text: ' + ' }).createEl('code', { text: 'P' });
        openCPUl2.createEl('li', { text: 'Mobile: Swipe down' });
        removeUl.createEl('li', { text: 'Look up: \"CSS Remove\"' });
        removeUl.createEl('li', { text: 'Select the command: ' }).createEl('code', { text: 'Enter' });

        //Credit authors
        const credit = containerEl.createEl('p');
        credit.createEl('span', { text: 'A fork of ', cls: 'instructions' }).createEl('a', { text: 'Style Text', href: 'https://github.com/juanjoarranz/style-text-obsidian-plugin', cls: 'instructions' });
        credit.createEl('span', { text: ' created by ', cls: 'instructions' }).createEl('a', { text: 'Juanjo Arranz', href: 'https://github.com/juanjoarranz', cls: 'instructions' }).createEl('br');
        credit.createEl('span', { text: 'Modified by Erika Gozar', cls: 'instructions' });
    }

    /* private donate(containerEl: HTMLElement) {
        const donateContainer = containerEl.createEl('div', { cls: 'donate' });
        donateContainer.setCssStyles({ marginTop: '40px' });

        let buyMeCoffeeImage = new Image(130);
        buyMeCoffeeImage.src = 'https://cdn.ko-fi.com/cdn/kofi3.png?v=3';
        donateContainer.createEl('a', { href: 'https://ko-fi.com/F1F6H4TAR', text: '' }).appendChild(buyMeCoffeeImage);

    } */
}