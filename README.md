# About CSS Inserter
This is a plugin for [Obsidian](https://obsidian.md/) that inserts user-defined css snippets into the selected text.

This plugin is a fork of [Style Text](https://obsidian.md/plugins?id=style-text) by [Juanjo Arranz](https://github.com/juanjoarranz).

The main difference between this plugin and [Style Text](https://obsidian.md/plugins?id=style-text) is that with CSS Inserter you can specify the html tag, the class, and the style for each CSS snippet.

This plugin requires basic knowledge of CSS. Links on how to format each setting can be found under [Set up CSS snippets](#set-up-css-snippets).
# Instructions
## Set up CSS snippets
After installing the plugin, first go to **Settings → CSS Inserter** and set up your CSS snippets the way you want.

Give your snippet a **name** and specify the HTML **tag**, the **class**, and the **style** you want the snippet to apply. Only a **name** and a **tag** are required. If you do not want to use the other options, leave them blank.

> Here is a list of [HTML tags](https://www.w3schools.com/tags/default.asp) to use.
> 
> And here is a [guide](https://www.w3schools.com/html/html_styles.asp) on how to format the **style** part of the CSS snippet.
> Everything within the quotes following `style=` should be entered in the CSS snippet.

![Settings panel](./Attachments/settings-panel.png#interface)

You can re-order snippets by pressing the **up arrow** ( <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-up"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg> ) and **down arrow** ( <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-down"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg> ) buttons next to the snippet, or delete the entire snippet by pressing the **trash bin** ( <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg> ) button.

The **toggle** option next to the snippet disables/enables showing the CSS snippet in the **Context menu**.
## Apply and remove CSS snippets
To apply or remove a CSS snippet, first go into **Edit mode** and select the text you want to apply the snippet to or remove the snippet from. The first time you select text that already has CSS snippets applied, the entire text will automatically be selected for you (on desktop only).

After you do that, there are three ways you can apply or remove a CSS snippet:
1. Right-click the note (on desktop) or perform the command **Show context menu under cursor** to open the **Context menu**. Enabled snippets will appear there. Select the snippet you want to apply, or select **Remove CSS** to remove the applied CSS snippet.<br><img src="./Attachments/context-menu.png#interface" width=400px height=390px>
2. Open the **Command palette** and search for and select the CSS style you'd like to apply, or perform the **CSS Inserter: Remove CSS** command to remove the CSS snippet (see [Command palette](https://help.obsidian.md/Plugins/Command+palette)).
3. Set up a **Hotkey** prior in **Settings → CSS Inserter** for your desired CSS snippet (or for the **CSS Inserter: Remove CSS** command if you want to remove the CSS). Afterward, select the text and perform the **Hotkey** (see [Hotkeys](https://help.obsidian.md/User+interface/Hotkeys)).
# Installation
## Obsidian Marketplace
To install this plugin via the Obsidian Marketplace, perform the following steps:
1. Navigate to the CSS Inserter plugin page by either selecting [this link](https://obsidian.md/plugins?id=css-inserter) or doing the following:
	1. Navigate to **Settings → Community plugins**
	2. Select **Turn on community plugins**.
	3. Select **Community plugins → Browse** and search for "CSS Inserter".
2. Select **Install**.
3. To enable the plugin, select **Enable**.
## BRAT
Install this plugin using [BRAT](https://obsidian.md/plugins?id=obsidian42-brat) by doing the following:
1. Make sure the [BRAT](https://obsidian.md/plugins?id=obsidian42-brat) plugin is installed in your vault.
2. Go to **Settings → BRAT → Beta Plugin List → Add Beta Plugin**
3. Enter `https://github.com/Erallie/css-inserter` into the input field and select **Add Plugin**.
## Manual installation
To install this plugin manually, follow these steps:
1. Go to the [Releases](https://github.com/Erallie/css-inserter/releases) page and find the latest release.
2. Download `main.js`, `manifest.json`, and `styles.css`.
3. Go to your **Plugins folder** (`[vault root]/.obsidian/plugins`) and create a new subfolder called `css-inserter`.
4. Move the downloaded files to the new folder.