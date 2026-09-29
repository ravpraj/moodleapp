// (C) Copyright 2015 Moodle Pty Ltd.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { Component, OnInit } from '@angular/core';
import { CoreSharedModule } from '@/core/shared.module';
import { CoreFileHelper } from '@services/file-helper';
import { CoreAlerts } from '@services/overlays/alerts';
import { CoreWSExternalFile } from '@services/ws';
import { Translate } from '@singletons';

import {
    CustomMoyleResource,
    CustomMoyleWS,
} from '../../services/custommoyle-ws.service';

@Component({
    selector: 'page-custommoyle-resources',
    templateUrl: 'resources.html',
    imports: [CoreSharedModule],
})
export class CustomMoyleResourcesPage implements OnInit {

    resources: CustomMoyleResource[] = [];

    loading = true;

    async ngOnInit(): Promise<void> {
        await this.loadResources();
    }

    async loadResources(ionRefresher?: HTMLIonRefresherElement): Promise<void> {

        this.loading = true;

        try {
            this.resources =
                await CustomMoyleWS.getResources();

        } finally {
            this.loading = false;
            await ionRefresher?.complete();
        }
    }

    async downloadResource(resource: CustomMoyleResource): Promise<void> {
        const file: CoreWSExternalFile = {
            filename: resource.filename,
            fileurl: resource.url,
            mimetype: resource.mimetype,
        };

        try {
            await CoreFileHelper.downloadAndOpenFile(file, 'local_custommoyle', resource.id);
        } catch (error) {
            CoreAlerts.showError(error, { default: Translate.instant('core.errordownloading') });
        }
    }

}
