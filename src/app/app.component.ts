import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { CodePush, InstallMode, SyncStatus } from '@ionic-native/code-push/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(
    private platform: Platform,
    private codePush: CodePush,
  ) {
    this.initializeApp();
  }
 
  initializeApp() {
    this.platform.ready().then(() => {
      this.codePush.notifyApplicationReady();
      this.checkCodePush()
      console.log("init")
    });
  }

  checkCodePush() {
    this.codePush.sync({
      installMode: InstallMode.IMMEDIATE, 
      updateDialog: {
        mandatoryUpdateMessage: "Please update to use this app!",
        mandatoryContinueButtonLabel: "Update Now",
        optionalInstallButtonLabel: "Update now ...", 
        optionalIgnoreButtonLabel: "Postpone",
        optionalUpdateMessage: "Update now？", 
        updateTitle: "New version is available", 
      }
    }).subscribe((syncStatus) => {
      if (syncStatus == 7) {
        alert('Updating...')
      }
    }, err => { alert('error:' + err); });
  }

}
