import {Tray, app, Menu, nativeImage} from 'electron';

class MainTray extends Tray {
    constructor(iconPath, mainWindow) {
        super(new nativeImage.createFromPath(iconPath));

        this.mainWindow = mainWindow;

        this.setToolTip('Timer App');
        this.on('click', this.onClick.bind(this));
        this.on('right-click', this.onRightClick.bind(this));
    }

    onClick(event, bounds) {
        // Click event bounds
        const { x, y } = bounds;

        // Window height and width
        const { height, width } = this.mainWindow.getBounds();

        if (this.mainWindow.isVisible()) {
            this.mainWindow.hide();
        } else {
            const yPosition = process.platform === 'darwin' ? y : y - height;
            this.mainWindow.setBounds({
                x: Math.round(x - width / 2),
                y: yPosition,
                height,
                width
            });
            this.mainWindow.show();
            //this.mainWindow.webContents.openDevTools();
        }
    }

     onRightClick() {
        const menuConfig = Menu.buildFromTemplate([
            {
            label: 'Quit',
            click: () => app.quit()
            }
        ]);

        this.popUpContextMenu(menuConfig);
    }
}

export default MainTray;
