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
		{ name: "Chapter Number", tag: "h2", class: "chapter-number", style: "font-size: 4em", contextMenu: true },
		{ name: "No Indent", tag: "p", class: "no-indent", style: "text-indent: 0", contextMenu: false },
		{ name: "Highlight", tag: "span", class: "highlight", style: "background-color: #fff88f; color: black", contextMenu: true },
	]
}

export class GeneralSettingsTab extends PluginSettingTab {

	plugin: CSSInserter;

	constructor(app: App, plugin: CSSInserter) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display() {
		const { containerEl } = this;

		this.clearHtml();

		containerEl.empty();
		containerEl.createEl('div').createEl('span', { text: 'A fork of a plugin created by ' }).createEl('a', { text: 'Juanjo Arranz', href: 'https://github.com/juanjoarranz' });
        containerEl.createEl('span', {text: 'Modified by '}).createEl('a', { text: 'Erika Gozar', href: 'https://gozarproductions.com' });

		containerEl.createEl('p', { text: 'Inserts user-defined css snippets into the selected text.' });

		const settingHeader: HTMLDivElement = containerEl.createDiv({ cls: "setting-header" });
		settingHeader.createDiv({ text: "Name", cls: "value-header" });
		settingHeader.createDiv({ text: "Tag", cls: "value-header" });
		settingHeader.createDiv({ text: "Class", cls: "value-header" });
		settingHeader.createDiv({ text: "Style", cls: "value-header" });

		// Add CSS Button
		let containerButton = settingHeader.createEl('div', { cls: 'container_add_button' });
		let addCSSButton = containerButton.createEl('button', { text: 'Add CSS' });

		// Setting Items
		const settingContainer: HTMLDivElement = containerEl.createDiv();
		addCSSButton.onclick = ev => this.addCSS(settingContainer);

		this.plugin.settings.css.forEach((s, i) => this.addCSS(settingContainer, i + 1));

		this.addInstructions(containerEl);

		this.donate(containerEl);
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
			const newCSS: CSS = { name: "Highlight", tag: "span", class: "highlight", style: "background-color: #fff88f; color: black", contextMenu: false };
			css.push(newCSS);
			this.plugin.addCSSCommand(newCSS, cssCounter);
			this.plugin.saveSettings();
		}

		const currentCSS = css[cssCounter - 1];

		// CSS Name
		let cssNameInput = settingItemContainer.createEl('input', { cls: 'css-inserter-setting-item-name' });
		cssNameInput.value = currentCSS.name;
		cssNameInput.onchange = (async (event) => {
			const value = cssNameInput.value;
			currentCSS.name = value;
			await this.plugin.saveSettings();
			this.plugin.addCSSCommand({
				name: value,
				tag: currentCSS.tag,
				class: currentCSS.class,
				style: currentCSS.style,
				contextMenu: currentCSS.contextMenu
			}, cssCounter + 1);
		});

		// CSS
		// new Setting(settingItemContainer)
		// 	.setClass('setting-item-name')
		// 	.addText(text => {
		// 		return text.setValue(this.plugin.settings.css[cssCounter - 1]?.name ?? newCSS.name)
		// 			.onChange(async (value) => {
		// 				this.plugin.settings.css[cssCounter - 1].name = value;
		// 				await this.plugin.saveSettings();
		// 				this.plugin.addCSSCommand({
		// 					name: value,
		// 					css: this.plugin.settings.css[cssCounter - 1].css
		// 				}, cssCounter);
		// 			})
		// 	});
		new Setting(settingItemContainer)
			.setClass('css-inserter-setting-item-value')
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
			.setClass('css-inserter-setting-item-value')
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
			.setClass('css-inserter-setting-item-value')
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
					.setTooltip((toggle.getValue() ? "disable" : "enable") + " contex menu")
					.onChange(async () => {
						const value = toggle.getValue();
						toggle.setTooltip((value ? "disable" : "enable") + " contex menu");
						currentCSS.contextMenu = value;
						await this.plugin.saveSettings();
					})
			});

		// Up Button
		const upDisabled = cssCounter - 1 === 0;
		const upButtonContainer = settingItemContainer.createDiv({ cls: 'css-inserter-button-container' });
		if (!upDisabled) {
			const upButton = new ButtonComponent(upButtonContainer);
			upButton.setIcon('arrow-up').setClass('css-inserter-delete-css-button')
				.setTooltip("Move up")
				.onClick(() => this.moveCSS("up", cssCounter, css));
		}

		// Down Button
		const downDisabled = (cssCounter === css.length);
		const downButtonContainer = settingItemContainer.createDiv({ cls: 'css-inserter-button-container' });
		if (!downDisabled) {
			const downButton = new ButtonComponent(downButtonContainer);
			downButton.setIcon('arrow-down').setClass('css-inserter-delete-css-button')
				.setTooltip("Move down")
				.onClick(() => this.moveCSS("down", cssCounter, css));
		}

		// Delete Button
		const deleteButtonContainer = settingItemContainer.createDiv({ cls: 'css-inserter-button-container' });
		const deleteButton = new ButtonComponent(deleteButtonContainer);
		deleteButton.setIcon('trash-2').setClass('css-inserter-delete-css-button')
			.setTooltip("Remove CSS")
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
		// With Command Palette
		containerInstructions.createEl('p', { text: 'Usage with the Command Palette:', cls: 'instructions' });
		const commandPaletteUl = containerInstructions.createEl('ul', { cls: 'instructions' });
		commandPaletteUl.createEl('li', { text: 'Select text on the editor' });
		commandPaletteUl.createEl('li', { text: 'Open the Command Palette: <Ctrl> or <Cmd> + <P>' });
		commandPaletteUl.createEl('li', { text: 'Look up the CSS to apply: "CSS Inserter ..."' });
		commandPaletteUl.createEl('li', { text: 'Choose the CSS: <Enter>' });


		// Remove Applied CSS
		containerInstructions.createEl('p', { text: 'Remove Applied CSS:', cls: 'instructions' });
		const removeUl = containerInstructions.createEl('ul', { cls: 'instructions' });
		removeUl.createEl('li', { text: 'Select the cssd text on the editor' });
		removeUl.createEl('li', { text: 'Open the Command Palette: <Ctrl> or <Cmd> + <P>' });
		removeUl.createEl('li', { text: 'Look up: "CSS Remove"' });
		removeUl.createEl('li', { text: 'Press <Enter>' });
	}

	private donate(containerEl: HTMLElement) {
		const donateContainer = containerEl.createEl('div', { cls: 'donate' });
		donateContainer.setCssStyles({ marginTop: '40px' });

		let buyMeCoffeeImage = new Image(130);
		buyMeCoffeeImage.src = 'https://cdn.ko-fi.com/cdn/kofi3.png?v=3';
		donateContainer.createEl('a', { href: 'https://ko-fi.com/F1F6H4TAR', text: '' }).appendChild(buyMeCoffeeImage);

	}
}